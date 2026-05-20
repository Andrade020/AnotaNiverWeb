import { MONTH_NAMES } from './colors';

export function daysUntilBirthday(day: number, month: number): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const year = today.getFullYear();
  let bday = new Date(year, month - 1, day);
  bday.setHours(0, 0, 0, 0);
  if (bday < today) bday = new Date(year + 1, month - 1, day);
  return Math.round((bday.getTime() - today.getTime()) / 86_400_000);
}

export function formatDate(day: number, month: number, year?: number): string {
  const m = MONTH_NAMES[month - 1];
  return year ? `${day} de ${m} de ${year}` : `${day} de ${m}`;
}

export function getNextAge(year: number, month: number, day: number): number {
  const today = new Date();
  let age = today.getFullYear() - year;
  const before =
    today.getMonth() + 1 < month ||
    (today.getMonth() + 1 === month && today.getDate() < day);
  if (before) age--;
  return age + 1;
}

export function getCurrentAge(year: number, month: number, day: number): number {
  const today = new Date();
  let age = today.getFullYear() - year;
  const notYet =
    today.getMonth() + 1 < month ||
    (today.getMonth() + 1 === month && today.getDate() < day);
  if (notYet) age--;
  return age;
}

export function getDaysInMonth(month: number): number {
  return new Date(2024, month, 0).getDate();
}

export function sortByUpcoming<T extends { day: number; month: number }>(a: T, b: T): number {
  return daysUntilBirthday(a.day, a.month) - daysUntilBirthday(b.day, b.month);
}
