import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import BirthdayForm from '../components/BirthdayForm';
import { loadBirthdays, saveBirthdays } from '../lib/storage';
import type { Birthday } from '../lib/types';

export default function Edit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [birthday, setBirthday] = useState<Birthday | null>(null);

  useEffect(() => {
    const found = loadBirthdays().find(b => b.id === id) ?? null;
    setBirthday(found);
  }, [id]);

  function handleSubmit(values: { name: string; day: number; month: number; year: string }) {
    const all = loadBirthdays();
    saveBirthdays(
      all.map(b =>
        b.id === id
          ? { ...b, name: values.name, day: values.day, month: values.month, year: values.year ? parseInt(values.year, 10) : undefined }
          : b
      )
    );
    navigate('/');
  }

  function handleDelete() {
    if (!confirm(`Remover o aniversário de ${birthday?.name}?`)) return;
    saveBirthdays(loadBirthdays().filter(b => b.id !== id));
    navigate('/');
  }

  if (!birthday) {
    return (
      <div className="flex items-center justify-center min-h-dvh text-gray-400">
        Aniversário não encontrado.
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-[#FFFBF7]">
      <div className="flex items-center gap-3 px-6 pt-14 pb-6">
        <button
          onClick={() => navigate(-1)}
          className="text-2xl text-[#FF6B6B] font-semibold leading-none"
        >
          ←
        </button>
        <h2 className="text-2xl font-extrabold text-[#1A1A2E] tracking-tight">
          Editar aniversário
        </h2>
      </div>
      <div className="px-6 pb-12">
        <BirthdayForm
          initial={{
            name: birthday.name,
            day: birthday.day,
            month: birthday.month,
            year: birthday.year ? String(birthday.year) : '',
          }}
          submitLabel="Salvar alterações"
          onSubmit={handleSubmit}
        />
        <button
          onClick={handleDelete}
          className="w-full py-5 mt-4 text-base font-semibold text-red-500 active:opacity-70 transition-opacity"
        >
          Remover aniversário
        </button>
      </div>
    </div>
  );
}
