import { useNavigate } from 'react-router-dom';
import BirthdayForm from '../components/BirthdayForm';
import { loadBirthdays, saveBirthdays } from '../lib/storage';
import { pickColor } from '../lib/colors';

export default function Add() {
  const navigate = useNavigate();

  function handleSubmit(values: { name: string; day: number; month: number; year: string }) {
    const existing = loadBirthdays();
    saveBirthdays([
      ...existing,
      {
        id: Date.now().toString(),
        name: values.name,
        day: values.day,
        month: values.month,
        year: values.year ? parseInt(values.year, 10) : undefined,
        color: pickColor(existing.length),
      },
    ]);
    navigate('/');
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
          Adicionar aniversário
        </h2>
      </div>
      <div className="px-6 pb-12">
        <BirthdayForm submitLabel="Salvar aniversário 🎉" onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
