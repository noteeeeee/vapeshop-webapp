const flavors = [
  { value: 'dessert', label: 'Дессертный' },
  { value: 'gum', label: 'Жвачка' },
  { value: 'yogurt', label: 'Йогурт' },
  { value: 'mint', label: 'Мята/Ментол' },
  { value: 'iceCream', label: 'Мороженое' },
  { value: 'candy', label: 'Конфеты/мармелад' },
  { value: 'drinks', label: 'Напитки/лимонады' },
  { value: 'fruit', label: 'Фрукты/Ягоды' },
  { value: 'tobacco', label: 'Табачный' },
  { value: 'pine', label: 'Хвойный' },
  { value: 'citrus', label: 'Цитрус' },
  { value: 'tea', label: 'Чай' },
  { value: 'other', label: 'Другое' },
];

const nicotine = [
  { value: 'salty', label: 'Солевой' },
  { value: 'alkaline', label: 'Щелочный' },
  { value: 'hybrid', label: 'Гибридный' },
];

const strength = [
  { value: '0mg', label: '0 MG' },
  { value: '3mg', label: '3 MG' },
  { value: '6mg', label: '6 MG' },
  { value: '9mg', label: '9 MG' },
  { value: '12mg', label: '12 MG' },
  { value: '18mg', label: '18 MG' },
  { value: '20mg', label: '20 MG' },
  { value: '20mgStrong', label: '20 MG Strong' },
  { value: '20mgUltra', label: '20 MG Ultra' },
  { value: '20mgHard', label: '20 MG Hard' },
];

export function getFlavorLabel(value: string): string {
  const flavor = flavors.find(f => f.value === value);
  return flavor ? flavor.label : 'Unknown';
}

export function getNicotineLabel(value: string): string {
  const type = nicotine.find(n => n.value === value);
  return type ? type.label : 'Unknown';
}

export function getStrengthLabel(value: string): string {
  const str = strength.find(s => s.value === value);
  return str ? str.label : 'Unknown';
}

export function useFilters() {
  return {
    flavors,
    nicotine,
    strength,
    getFlavorLabel,
    getNicotineLabel,
    getStrengthLabel
  };
}
