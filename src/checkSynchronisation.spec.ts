import { checkSynchronisation } from './checkSynchronisation';

describe('la fonction checkSynchronisation', () => {
  it('doit pouvour retourner isValid = true si tout est ok', () => {
    const result = checkSynchronisation(
      [
        { id: 1, date: new Date('2023-01-01'), label: 'Salaire', amount: 1000 },
        { id: 2, date: new Date('2023-01-05'), label: 'Loyer', amount: -500 },
        { id: 3, date: new Date('2023-01-05'), label: 'Courses', amount: -120 },
        { id: 4, date: new Date('2023-02-01'), label: 'Salaire', amount: 1000 },
        { id: 5, date: new Date('2023-02-05'), label: 'Loyer', amount: -500 },
        { id: 6, date: new Date('2023-02-05'), label: 'Courses', amount: -130 },
      ],
      [
        { amount: 380, date: new Date('2023-02-01') },
        { amount: 750, date: new Date('2023-03-01') },
      ],
    );

    expect(result.isValid).toBe(true);
  });

  it('doit pouvour retourner isValid = false si il y a un doublon', () => {
    const result = checkSynchronisation(
      [
        { id: 1, date: new Date('2023-01-01'), label: 'Salaire', amount: 1000 },
        { id: 1, date: new Date('2023-01-01'), label: 'Salaire', amount: 1000 },
      ],
      [{ amount: 2000, date: new Date('2023-02-01') }],
    );

    expect(result.isValid).toBe(false);
    expect(result.reasons).toEqual([
      {
        message: 'Balance 01/02/2023 is not synchronised',
        type: 'DUPLICATE_MOVEMENT',

        movements: [
          { id: 1, date: new Date('2023-01-01'), label: 'Salaire', amount: 1000 },
        ],
      },
    ]);
  });

  it('doit pouvour retourner isValid = false si il y a une différence au niveau des montants', () => {
    const movements = [
      { id: 1, date: new Date('2023-01-01'), label: 'Salaire', amount: 1000 },
      { id: 2, date: new Date('2023-01-01'), label: 'Prime', amount: 300 },
    ];

    const result = checkSynchronisation(movements, [
      { amount: 1250, date: new Date('2023-02-01') },
    ]);

    expect(result.isValid).toBe(false);
    expect(result.reasons).toEqual([
      {
        message: 'Balance 01/02/2023 is not synchronised',
        type: 'AMOUNT_MISMATCH',
        movements,
      },
    ]);
  });
});
