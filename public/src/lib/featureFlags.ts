export type Flags = { [key: string]: boolean };
export const flags: Flags = { demoFlag: false };
export function isOn(name: keyof typeof flags) {
  return (import.meta.env[`VITE_FLAG_${String(name).toUpperCase()}`] === 'true') || flags[name];
}
