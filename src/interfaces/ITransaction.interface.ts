export interface ITransaction {
  id: number;
  description: string;
  amount: number;
  isIncoming: boolean;
  inicialDate: Date;
  finalDate: null | Date;
  category: string;
  paymentMethod: string;
  tags: string[];
}
export interface IRawTransaction {
  description: string;
  amount: null | number;
  isIncoming: boolean;
  inicialDate: Date;
  finalDate: null | Date;
  category: null | string;
  paymentMethod: null | string;
  tags: string[];
}
