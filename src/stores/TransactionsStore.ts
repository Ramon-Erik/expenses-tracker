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

  const monthBalance = computed(() => {
    const data = transactionsList.value.reduce(
      (acc, tr) => {
        return {
          balance: (tr.isIncoming ? tr.amount : tr.amount * -1) + acc.balance,
          outcomes: (tr.isIncoming ? 0 : tr.amount * -1) + acc.outcomes,
          incomes: (tr.isIncoming ? tr.amount : 0) + acc.incomes,
        };
      },
      {
        incomes: 0,
        outcomes: 0,
        balance: 0,
      }
    );
    const balance = {
      incomes: currencyFormat(data.incomes),
      outcomes: currencyFormat(data.outcomes),
      balance: currencyFormat(data.balance),
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

  const deleteTransaction = (id: number) => {
    updateLocalList(() => {
      transactionsList.value = transactionsList.value.filter(
        (tr) => tr.id != id
      );
    });
  };
  return {
    transactionsList,
    monthBalance,
    addTransaction,
    deleteTransaction,
  };
});
