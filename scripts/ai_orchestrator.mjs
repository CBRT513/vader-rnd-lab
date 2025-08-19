// scripts/ai_orchestrator.mjs
// Orchestrates the flow: read issue → ask AI for a spec → create branch → apply AI patch → open PR

import fs from 'node:fs';
import { execSync } from 'node:child_process';
import { callAI } from './ai_apply_patch.mjs';

const mode = process.argv[2];
const issueNumber = process.argv[3];

if (mode !== 'intake') {
  throw new Error('Usage: node scripts/ai_orchestrator.mjs intake <issueNumber>');
}
if (!issueNumber) throw new Error('Issue number required');

const GH_REPO = process.env.GITHUB_REPOSITORY;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

function run(cmd, opts = {}) {
  return execSync(cmd, { stdio: 'pipe', ...opts }).toString().trim();
}

// Ensure gh CLI uses our token
function gh(cmd) {
  return run(`env GH_TOKEN=${GITHUB_TOKEN} gh ${cmd}`);
}

// Configure git user (in Actions this may be blank)
try {
  run('git config user.email "actions@github.com"');
  run('git config user.name "github-actions[bot]"');
} catch {}

// 1) Pull issue title/body
const issue = JSON.parse(gh(`api repos/${GH_REPO}/issues/${issueNumber}`));
const title = issue.title || `Issue ${issueNumber}`;
const body = issue.body || '';

// 2) NL → Spec (short, testable)
const specPrompt = `Convert this plain-English request into a short spec with numbered acceptance criteria and minimal test notes. Keep it concise.

TITLE: ${title}

BODY:
${body}
`;
const spec = await callAI(specPrompt);
fs.writeFileSync('AI_SPEC.md', spec);

// 3) Create a working branch
const branch = `auto/${issueNumber}-${Date.now()}`;
run(`git checkout -b ${branch}`);
run('git add AI_SPEC.md');
run(`git commit -m "chore(ai): spec for #${issueNumber}"`);
run('git push -u origin HEAD');

// 4) Ask AI for a single unified git patch implementing the spec
const codePrompt = `You are a code generator. Produce a single unified git patch (diff) that implements this spec in this repository. Only output the patch (no backticks, no commentary). If files don't exist, include them in the patch. Keep changes minimal and self-contained.

SPEC:
${spec}
`;
const patch = await callAI(codePrompt);
fs.writeFileSync('change.patch', patch);

// 5) Apply the patch; if it fails, we still open a PR with just the spec
let applied = true;
try {
  run('git apply --whitespace=fix change.patch', { stdio: 'inherit' });
  run('git add -A');
  run('git commit -m "feat(ai): implement spec"');
  run('git push');
} catch (e) {
  applied = false;
  console.error('Patch failed to apply; opening PR with spec only.');
}

// 6) Open PR
// --fill will use commit messages; fall back to basic title if needed
let prUrl = '';
try {
  prUrl = gh(`pr create --fill --base main --head ${branch}`);
} catch {
  const safeTitle = title.replace(/"/g, '\\"');
  const bodyText = `Auto-generated PR for issue #${issueNumber}.
  
Acceptance Criteria (from AI):
${spec}`;
  prUrl = gh(`pr create --title "${safeTitle}" --body "${bodyText}" --base main --head ${branch}`);
}

console.log('PR:', prUrl);

// 7) Comment back on the issue with the PR link
try {
  const prNum = prUrl.split('/').pop();
  gh(`api repos/${GH_REPO}/issues/${issueNumber}/comments -f body='Opened PR #${prNum}. ${applied ? 'Patch applied.' : 'Spec only; patch failed to apply.'}'`);
} catch {}
