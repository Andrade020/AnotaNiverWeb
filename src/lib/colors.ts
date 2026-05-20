export const CARD_COLORS = [
  '#FF6B6B',
  '#FF8E53',
  '#06D6A0',
  '#118AB2',
  '#9B5DE5',
  '#F15BB5',
  '#00BBF9',
  '#FFD166',
];

export const DARK_TEXT_COLORS = new Set(['#FFD166']);

export const MONTH_NAMES = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril',
  'Maio', 'Junho', 'Julho', 'Agosto',
  'Setembro', 'Outubro', 'Novembro', 'Dezembro',
];

export function pickColor(index: number): string {
  return CARD_COLORS[index % CARD_COLORS.length];
}
