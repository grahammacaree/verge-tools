export const GATE_SALT = 'grahamwashere';
export const GATE_HASH = -1047751711;
export const GATE_STORAGE_KEY = 'vergetools';

/** Same hash function as the legacy site gate. */
export function stringToHash(value: string): number {
  return value.split('').reduce((hash, char) => {
    return char.charCodeAt(0) + (hash << 6) + (hash << 16) - hash;
  }, 0);
}

export function checkPassword(password: string): boolean {
  return stringToHash(password + GATE_SALT) === GATE_HASH;
}

export function isUnlocked(): boolean {
  return localStorage.getItem(GATE_STORAGE_KEY) === String(GATE_HASH);
}

export function persistUnlock(): void {
  localStorage.setItem(GATE_STORAGE_KEY, String(GATE_HASH));
}
