import { ITransaction } from "./ITransaction.interface";

export interface IDayGroup {
  dateString: string; // Ex: "28/05/2026" (usado como chave e título)
  rawDate: Date;
  incomingTotal: number; // Soma das entradas do dia
  outgoingTotal: number; // Soma das saídas do dia
  transactions: ITransaction[]; // Transações que pertencem a esse dia
}
