import { checkSynchronisation } from './checkSynchronisation';
import { Balance, Movement } from './types';

const movements: Movement[] = [
  { id: 1, date: new Date('2023-01-01'), label: 'Salaire', amount: 1000 },
  { id: 2, date: new Date('2023-01-05'), label: 'Loyer', amount: -500 },
  { id: 3, date: new Date('2023-01-10'), label: 'Courses', amount: -100 },
  { id: 3, date: new Date('2023-01-10'), label: 'Courses', amount: -100 },
  { id: 4, date: new Date('2023-02-01'), label: 'Salaire', amount: 1000 },
  { id: 5, date: new Date('2023-02-05'), label: 'Loyer', amount: -500 },
  { id: 6, date: new Date('2023-02-10'), label: 'Courses', amount: -100 },
];

const balances: Balance[] = [
  { amount: 400, date: new Date('2023-02-01') },
  { amount: 800, date: new Date('2023-03-01') },
];

const validationResult = checkSynchronisation(movements, balances);

console.log(validationResult);
