import { useState } from 'react';
import { MONTH_NAMES } from '../lib/colors';
import { getDaysInMonth } from '../lib/dateUtils';

interface FormValues {
  name: string;
  day: number;
  month: number;
  year: string;
}

interface Props {
  initial?: FormValues;
  onSubmit: (values: FormValues) => void;
  submitLabel: string;
  loading?: boolean;
}

export default function BirthdayForm({ initial, onSubmit, submitLabel, loading }: Props) {
  const [name, setName] = useState(initial?.name ?? '');
  const [day, setDay] = useState(initial?.day ?? 1);
  const [month, setMonth] = useState(initial?.month ?? 1);
  const [year, setYear] = useState(initial?.year ?? '');
  const [error, setError] = useState('');

  const maxDay = getDaysInMonth(month);
  const safeDay = day > maxDay ? maxDay : day;
  const days = Array.from({ length: maxDay }, (_, i) => i + 1);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) { setError('Informe o nome da pessoa.'); return; }
    if (year.trim()) {
      const y = parseInt(year, 10);
      if (isNaN(y) || y < 1900 || y > new Date().getFullYear()) {
        setError('Ano inválido. Use entre 1900 e hoje.');
        return;
      }
    }
    setError('');
    onSubmit({ name: name.trim(), day: safeDay, month, year: year.trim() });
  }

  const select =
    'w-full bg-white rounded-xl px-4 py-4 text-lg text-[#1A1A2E] appearance-none border-0 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]';
  const input =
    'w-full bg-white rounded-xl px-4 py-4 text-lg text-[#1A1A2E] border-0 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] placeholder-gray-400';

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div>
        <label className="block text-sm font-semibold text-[#1A1A2E] mb-2">Nome</label>
        <input
          className={input}
          placeholder="Ex: Maria, João, Mãe..."
          value={name}
          onChange={e => setName(e.target.value)}
          autoFocus
          autoCapitalize="words"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-[#1A1A2E] mb-2">
          Data de aniversário
        </label>
        <div className="flex gap-3">
          <div className="relative flex-1">
            <select
              className={select}
              value={safeDay}
              onChange={e => setDay(Number(e.target.value))}
            >
              {days.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">▾</span>
          </div>
          <div className="relative flex-[2]">
            <select
              className={select}
              value={month}
              onChange={e => setMonth(Number(e.target.value))}
            >
              {MONTH_NAMES.map((m, i) => (
                <option key={i} value={i + 1}>{m}</option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">▾</span>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-[#1A1A2E] mb-1">
          Ano de nascimento <span className="font-normal text-gray-400">(opcional)</span>
        </label>
        <input
          className={input}
          placeholder="Ex: 1990"
          value={year}
          onChange={e => setYear(e.target.value)}
          inputMode="numeric"
          maxLength={4}
        />
        <p className="text-xs text-gray-400 mt-1.5 ml-1">Se informado, o app mostrará a idade.</p>
      </div>

      {error && (
        <p className="text-sm text-red-500 font-medium -mt-2">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-5 rounded-2xl text-lg font-bold text-white bg-[#FF6B6B] active:opacity-80 transition-opacity disabled:opacity-60 mt-2"
        style={{ boxShadow: '0 6px 20px #FF6B6B55' }}
      >
        {loading ? 'Salvando...' : submitLabel}
      </button>
    </form>
  );
}
