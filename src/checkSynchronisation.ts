import { Balance, Movement, ValidationResult } from './types';

const getDuplicateMovements = (movements: Movement[]): Movement[] => {
  const duplicateMovements: Movement[] = [];
  const movementsMap = new Map<number, Movement>();

  for (const movement of movements) {
    if (movementsMap.has(movement.id)) {
      duplicateMovements.push(movement);
    } else {
      movementsMap.set(movement.id, movement);
    }
  }

  return duplicateMovements;
};

export function checkSynchronisation(
  movements: Movement[],
  balances: Balance[],
): ValidationResult {
  const result: ValidationResult = { isValid: true, reasons: [] };

  let previousBalance: Balance | undefined = undefined;

  for (const balance of balances) {
    const message = `Balance ${balance.date.toLocaleDateString()} is not synchronised`;

    const { currentAmount, currentMovements } = (() => {
      if (previousBalance) {
        return {
          currentAmount: balance.amount - previousBalance.amount,
          currentMovements: movements.filter(
            (movement) =>
              movement.date < balance.date && movement.date >= previousBalance!.date,
          ),
        };
      }

      return {
        currentAmount: balance.amount,
        currentMovements: movements.filter((movement) => movement.date < balance.date),
      };
    })();

    const sum = currentMovements.reduce((acc, movement) => acc + movement.amount, 0);
    if (sum !== currentAmount) {
      result.reasons.push({
        message,
        type: 'AMOUNT_MISMATCH',
        movements: currentMovements,
      });
    }

    const duplicateMovements = getDuplicateMovements(currentMovements);
    if (duplicateMovements.length) {
      result.reasons.push({
        message,
        type: 'DUPLICATE_MOVEMENT',
        movements: duplicateMovements,
      });
    }

    previousBalance = balance;
  }

  return { ...result, isValid: result.reasons.length === 0 };
}
