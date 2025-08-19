// scripts/ai_apply_patch.mjs
// Minimal helper that calls your chosen AI provider and returns plain text.

import https from 'node:https';

export async function callAI(prompt) {
  const provider = process.env.AI_PROVIDER || 'anthropic';
  const key = process.env.AI_API_KEY;
  if (!key) throw new Error('Missing AI_API_KEY');

  if (provider === 'openai') {
    const body = JSON.stringify({
      model: 'gpt-4.1-mini',
      messages: [{ role: 'user', content: prompt }]
    });
    return httpPost(
      'api.openai.com',
      '/v1/chat/completions',
      key,
      body,
      'application/json'
    );
  }

  if (provider === 'anthropic') {
    const body = JSON.stringify({
      model: 'claude-3-5-sonnet-latest',
      messages: [{ role: 'user', content: prompt }]
    });
    return httpPost(
      'api.anthropic.com',
      '/v1/messages',
      key,
      body,
      'application/json',
      { 'anthropic-version': '2023-06-01' }
    );
  }

  throw new Error('Unsupported provider: ' + provider);
}

function httpPost(host, path, key, body, contentType, extraHeaders = {}) {
  const headers = {
    Authorization: `Bearer ${key}`,
    'Content-Type': contentType,
    Accept: 'application/json',
    ...extraHeaders
  };
  const options = { host, path, method: 'POST', headers };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (c) => (data += c));
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const text =
            json.choices?.[0]?.message?.content ||
            json.content?.[0]?.text ||
            data;
          resolve(text);
        } catch {
          resolve(data);
        }
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}
