export type Movement = {
  id: number;
  date: Date;
  label: string;
  amount: number;
};

export type Balance = {
  amount: number;
  date: Date;
};

export type Reason = {
  message: string;
  type: 'AMOUNT_MISMATCH' | 'DUPLICATE_MOVEMENT';
  movements: Movement[];
};

export type ValidationResult = {
  isValid: boolean;
  reasons: Reason[];
};
