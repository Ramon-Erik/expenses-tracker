import type {
  IRawTransaction,
  ITransaction,
} from "@/interfaces/ITransaction.interface";
import { currencyFormat } from "@/utils/currency";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useTransactions = defineStore("transactions", () => {
  const LOCAL_KEY = "ex-transactions";

  const storedTransactions: ITransaction[] = JSON.parse(
    localStorage.getItem(LOCAL_KEY) || "[ ]"
  );

  const transactionsList = ref(storedTransactions);
  transactionsList.value.push({
    description: "string",
    amount: 100,
    isIncoming: true,
    inicialDate: new Date(),
    finalDate: null,
    category: "0",
    paymentMethod: "1",
    tags: ["oo"],
    id: 123435678,
  });
  const monthBalance = computed(() => {
    const balance = {
      incomes: currencyFormat(0),
      outcomes: currencyFormat(0),
      balance: currencyFormat(0),
    };
    return balance;
  });

  const updateLocalList = (callbackFn: () => void) => {
    callbackFn();
    localStorage.setItem(LOCAL_KEY, JSON.stringify(transactionsList.value));
  };

  const addTransaction = (newTransaction: IRawTransaction) => {
    const transaction = {
      id: Date.now(),
      ...newTransaction,
    } as ITransaction;
    updateLocalList(() => {
      transactionsList.value.push(transaction);
    });
  };

  // const deleteTransaction = (id: number) => {
  //   updateLocalList(() => {
  //     transactionsList.value = transactionsList.value.filter(
  //       (tr) => tr.id != id
  //     );
  //   });
  // };
  return {
    transactionsList,
    monthBalance,
    addTransaction,
    // deleteTransaction,
  };
});
