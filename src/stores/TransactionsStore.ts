import type {
  IRawTransaction,
  ITransaction,
} from "@/interfaces/ITransaction.interface";
import { currencyFormat } from "@/utils/currency";
import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";

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
        if (tr.isIncoming) {
          acc.incomes += tr.amount;
          acc.balance += tr.amount;
        } else {
          acc.outcomes -= tr.amount;
          acc.balance -= tr.amount;
        }
        return acc;
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

  const addTransaction = (newTransaction: IRawTransaction) => {
    const transaction = {
      id: Date.now(),
      ...newTransaction,
    } as ITransaction;

    transactionsList.value.push(transaction);
  };

  const deleteTransaction = (id: number) => {
    transactionsList.value = transactionsList.value.filter((tr) => tr.id != id);
  };

  const addTag = (tagName: string) => {
    const tag = {
      text: tagName,
      value: Date.now(),
    };
    tagList.value.push(tag);
  };

  const deleteTag = (id: number) => {
    console.log(id);

    tagList.value = tagList.value.filter((tag) => tag.value != id);
  };

  watch(
    transactionsList,
    () => {
      localStorage.setItem(
        LOCAL_KEY_TRANSACTION,
        JSON.stringify(transactionsList.value)
      );
    },
    { deep: true }
  );

  watch(
    tagList,
    () => {
      localStorage.setItem(LOCAL_KEY_TAGS, JSON.stringify(tagList.value));
    },
    { deep: true }
  );

  return {
    transactionsList,
    tagList,
    monthBalance,
    addTag,
    deleteTag,
    addTransaction,
    deleteTransaction,
  };
});
