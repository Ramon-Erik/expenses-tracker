// import type ITransaction from "@/interfaces/ITransaction.interface";
// import { useTransactionsStore } from "@/stores/TransactionsStore";
// import { createPinia, setActivePinia } from "pinia";

// describe("TransactionsStore", () => {
//   let transactions: ReturnType<typeof useTransactionsStore>;

//   const transactionsList = [
//     {
//       id: 1,
//       description: "teste 1",
//       amount: 10,
//       isIncome: true,
//     },
//     {
//       id: 2,
//       description: "teste 2",
//       amount: 10,
//       isIncome: true,
//     },
//     {
//       id: 3,
//       description: "teste 3",
//       amount: -5,
//       isIncome: false,
//     },
//   ];

//   beforeEach(() => {
//     setActivePinia(createPinia());
//     localStorage.clear();

//     transactions = useTransactionsStore();
//   });

//   it("Should start with an empty list", () => {
//     expect(transactions.transactionsList.length).toBe(0);
//   });

//   it("Should increment transactions length when a new item is added", () => {
//     const transaction = transactionsList[0] as ITransaction;

//     expect(transactions.transactionsList.length).toBe(0);

//     transactions.addTransaction(transaction);

//     expect(transactions.transactionsList.length).toBe(1);
//   });

//   it("The new transaction should be strictly equal to the added transaction", () => {
//     const transaction = transactionsList[0] as ITransaction;

//     expect(transactions.transactionsList.length).toBe(0);

//     transactions.addTransaction(transaction);

//     expect(transactions.transactionsList.length).toBe(1);

//     expect(transactions.transactionsList[0]).toStrictEqual(transaction);
//   });

//   it("should throw an error on adding same id", () => {
//     const transaction = transactionsList[0] as ITransaction;

//     transactions.addTransaction(transaction);

//     expect(() => transactions.addTransaction(transaction)).toThrow(
//       "Transação com mesmo ID!"
//     );
//   });

//   it("should throw an error on adding invalid transaction", () => {
//     const transaction = {} as ITransaction;

//     expect(() => transactions.addTransaction(transaction)).toThrow();
//   });

//   it("Should decrement transactions length when an item is removed", () => {
//     const transaction = transactionsList[0] as ITransaction;

//     expect(transactions.transactionsList.length).toBe(0);

//     transactions.addTransaction(transaction);

//     expect(transactions.transactionsList.length).toBe(1);

//     transactions.deleteTransaction(transaction.id);

//     expect(transactions.transactionsList.length).toBe(0);
//   });
// });
