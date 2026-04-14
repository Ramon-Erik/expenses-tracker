import type ITransaction from '@/interfaces/ITransaction.interface'
import { defineStore } from 'pinia'
import { readonly, ref } from 'vue'

export const useTransactionsStore = defineStore('transactions', () => {
  const LOCAL_KEY = 'exp-tracker'

  const storedTransactions: ITransaction[] = JSON.parse(localStorage.getItem(LOCAL_KEY) || '[]')

  const _transactionsList = ref(storedTransactions)
  const transactionsList = readonly(_transactionsList)

  const updateLocalList = (callbackFn: () => void) => {
    callbackFn()
    localStorage.setItem(LOCAL_KEY, JSON.stringify(_transactionsList.value))
  }

  const addTransaction = (newTransaction: ITransaction) => {
    updateLocalList(() => {
      _transactionsList.value.push(newTransaction)
    })
  }

  const deleteTransaction = (id: number) => {
    updateLocalList(() => {
      console.log(id)

      _transactionsList.value = transactionsList.value.filter((tr) => tr.id != id)
    })
  }
  return {
    transactionsList,
    addTransaction,
    deleteTransaction,
  }
})
