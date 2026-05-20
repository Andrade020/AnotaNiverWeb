import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BirthdayCard from '../components/BirthdayCard';
import { loadBirthdays } from '../lib/storage';
import { sortByUpcoming } from '../lib/dateUtils';
import type { Birthday } from '../lib/types';
import { checkAndNotify, getTodayAndTomorrow, requestPermission } from '../lib/notifications';

export default function Home() {
  const navigate = useNavigate();
  const [birthdays, setBirthdays] = useState<Birthday[]>([]);
  const [banner, setBanner] = useState<string | null>(null);

  useEffect(() => {
    const all = [...loadBirthdays()].sort(sortByUpcoming);
    setBirthdays(all);

    requestPermission().then(granted => {
      if (granted) {
        checkAndNotify(all);
      } else {
        // show in-app banner as fallback
        const { today, tomorrow } = getTodayAndTomorrow(all);
        if (today.length > 0) {
          setBanner(`🎉 Hoje é aniversário de ${today.map(b => b.name).join(', ')}!`);
        } else if (tomorrow.length > 0) {
          setBanner(`🎂 Amanhã é aniversário de ${tomorrow.map(b => b.name).join(', ')}!`);
        }
      }
    });
  }, []);

  // also show banner even if notifications are granted (belt and suspenders)
  useEffect(() => {
    const { today, tomorrow } = getTodayAndTomorrow(birthdays);
    if (today.length > 0) {
      setBanner(`🎉 Hoje é aniversário de ${today.map(b => b.name).join(', ')}!`);
    } else if (tomorrow.length > 0) {
      setBanner(`🎂 Amanhã é aniversário de ${tomorrow.map(b => b.name).join(', ')}!`);
    }
  }, [birthdays]);

  const next = birthdays[0];
  const rest = birthdays.slice(1);

  return (
    <div className="flex flex-col min-h-dvh bg-[#FFFBF7] pb-28">
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-14 pb-4">
        <div>
          <h1 className="text-4xl font-extrabold text-[#1A1A2E] tracking-tight leading-none">
            AnotaNiver
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            {birthdays.length === 0
              ? 'seus aniversários'
              : `${birthdays.length} aniversário${birthdays.length !== 1 ? 's' : ''}`}
          </p>
        </div>
        <span className="text-4xl">🎂</span>
      </div>

      {/* Banner */}
      {banner && (
        <div className="mx-6 mb-2 rounded-2xl bg-[#FF6B6B] px-4 py-3 flex items-start gap-2">
          <p className="text-white font-semibold text-sm leading-snug flex-1">{banner}</p>
          <button
            onClick={() => setBanner(null)}
            className="text-white opacity-70 text-lg leading-none shrink-0 mt-0.5"
          >
            ×
          </button>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 px-6">
        {birthdays.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <span className="text-7xl mb-5">🎂</span>
            <p className="text-xl font-bold text-[#1A1A2E] mb-2">Nenhum aniversário ainda</p>
            <p className="text-sm text-gray-400 leading-relaxed">
              Toque no botão + para adicionar<br />o primeiro aniversário!
            </p>
          </div>
        ) : (
          <>
            {next && (
              <div className="mb-4">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
                  Próximo
                </p>
                <BirthdayCard birthday={next} onClick={() => navigate(`/editar/${next.id}`)} />
              </div>
            )}
            {rest.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
                  Todos
                </p>
                {rest.map(b => (
                  <BirthdayCard key={b.id} birthday={b} onClick={() => navigate(`/editar/${b.id}`)} />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* FAB */}
      <button
        onClick={() => navigate('/adicionar')}
        className="fixed bottom-9 right-7 w-16 h-16 rounded-full bg-[#FF6B6B] text-white text-4xl font-light flex items-center justify-center active:opacity-80 transition-opacity"
        style={{ boxShadow: '0 6px 24px #FF6B6B66', lineHeight: 1 }}
        aria-label="Adicionar aniversário"
      >
        +
      </button>
    </div>
  );
}
