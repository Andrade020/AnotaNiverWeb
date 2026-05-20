import type { Birthday } from './types';

const KEY = 'anotaniver:birthdays';

export function loadBirthdays(): Birthday[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveBirthdays(birthdays: Birthday[]): void {
  localStorage.setItem(KEY, JSON.stringify(birthdays));
}
