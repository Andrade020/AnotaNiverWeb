import type { Birthday } from './types';
import { daysUntilBirthday } from './dateUtils';

export async function requestPermission(): Promise<boolean> {
  if (!('Notification' in window)) return false;
  if (Notification.permission === 'granted') return true;
  if (Notification.permission === 'denied') return false;
  const result = await Notification.requestPermission();
  return result === 'granted';
}

export function checkAndNotify(birthdays: Birthday[]): void {
  if (!('Notification' in window) || Notification.permission !== 'granted') return;

  for (const b of birthdays) {
    const days = daysUntilBirthday(b.day, b.month);
    if (days === 0) {
      new Notification(`🎉 Hoje é aniversário de ${b.name}!`, {
        body: 'Não esquece de parabenizar!',
        icon: '/pwa-192x192.png',
        tag: `birthday-today-${b.id}`,
      });
    } else if (days === 1) {
      new Notification(`🎂 Amanhã é aniversário de ${b.name}!`, {
        body: 'Que tal já ir pensando na mensagem?',
        icon: '/pwa-192x192.png',
        tag: `birthday-tomorrow-${b.id}`,
      });
    }
  }
}

export function getTodayAndTomorrow(birthdays: Birthday[]): {
  today: Birthday[];
  tomorrow: Birthday[];
} {
  const today: Birthday[] = [];
  const tomorrow: Birthday[] = [];
  for (const b of birthdays) {
    const days = daysUntilBirthday(b.day, b.month);
    if (days === 0) today.push(b);
    else if (days === 1) tomorrow.push(b);
  }
  return { today, tomorrow };
}
