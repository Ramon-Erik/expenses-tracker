import type {
  IRawTransaction,
  ITransaction,
} from "@/interfaces/ITransaction.interface";
import { currencyFormat } from "@/utils/currency";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useTransactions = defineStore("transactions", () => {
  const LOCAL_KEY_TRANSACTION = "ex-transactions";
  const LOCAL_KEY_TAGS = "ex-tags";

  const storedTransactions: ITransaction[] = JSON.parse(
    localStorage.getItem(LOCAL_KEY_TRANSACTION) || "[ ]"
  );

  const storedTags: { text: string; value: number }[] = JSON.parse(
    localStorage.getItem(LOCAL_KEY_TAGS) || "[ ]"
  );

  const transactionsList = ref(storedTransactions);
  const tagList = ref(storedTags);

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

  const updateLocalList = (
    key: string,
    list: unknown[],
    callbackFn: () => void
  ) => {
    callbackFn();
    localStorage.setItem(key, JSON.stringify(list));
  };

  const addTransaction = (newTransaction: IRawTransaction) => {
    const transaction = {
      id: Date.now(),
      ...newTransaction,
    } as ITransaction;
    updateLocalList(LOCAL_KEY_TRANSACTION, transactionsList.value, () => {
      transactionsList.value.push(transaction);
    });
  };

  const deleteTransaction = (id: number) => {
    updateLocalList(LOCAL_KEY_TRANSACTION, transactionsList.value, () => {
      transactionsList.value = transactionsList.value.filter(
        (tr) => tr.id != id
      );
    });
  };

  const addTag = (tagName: string) => {
    const tag = {
      text: tagName,
      value: Date.now(),
    };
    updateLocalList(LOCAL_KEY_TAGS, tagList.value, () => {
      tagList.value.push(tag);
    });
  };

  return {
    transactionsList,
    tagList,
    monthBalance,
    addTag,
    addTransaction,
    deleteTransaction,
  };
});
