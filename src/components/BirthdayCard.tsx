import type { Birthday } from '../lib/types';
import { DARK_TEXT_COLORS } from '../lib/colors';
import { daysUntilBirthday, formatDate, getCurrentAge, getNextAge } from '../lib/dateUtils';

interface Props {
  birthday: Birthday;
  onClick: () => void;
}

export default function BirthdayCard({ birthday, onClick }: Props) {
  const days = daysUntilBirthday(birthday.day, birthday.month);
  const darkText = DARK_TEXT_COLORS.has(birthday.color);
  const text = darkText ? '#1A1A2E' : '#ffffff';

  const countdown =
    days === 0 ? 'Hoje! 🎉' : days === 1 ? 'Amanhã! 🎂' : `${days} dias`;

  const ageLabel = (() => {
    if (!birthday.year) return null;
    if (days === 0) return `${getCurrentAge(birthday.year, birthday.month, birthday.day)} anos hoje!`;
    return `fará ${getNextAge(birthday.year, birthday.month, birthday.day)} anos`;
  })();

  return (
    <button
      onClick={onClick}
      className="w-full text-left rounded-2xl p-5 mb-3 flex items-center justify-between active:opacity-85 transition-opacity"
      style={{
        backgroundColor: birthday.color,
        boxShadow: `0 4px 16px ${birthday.color}55`,
      }}
    >
      <div className="flex-1 mr-3 min-w-0">
        <p className="text-xl font-bold truncate leading-tight" style={{ color: text }}>
          {birthday.name}
        </p>
        <p className="text-sm mt-1 opacity-85" style={{ color: text }}>
          {formatDate(birthday.day, birthday.month, birthday.year)}
        </p>
        {ageLabel && (
          <p className="text-xs mt-0.5 opacity-70" style={{ color: text }}>
            {ageLabel}
          </p>
        )}
      </div>
      <span className="text-base font-extrabold shrink-0" style={{ color: text }}>
        {countdown}
      </span>
    </button>
  );
}
