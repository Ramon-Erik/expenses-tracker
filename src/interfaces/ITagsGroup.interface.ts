import { ITransaction } from "./ITransaction.interface";

export interface ITagGroup {
  tagName: string;
  incomingTotal: number;
  outgoingTotal: number;
  transactions: ITransaction[];
}
