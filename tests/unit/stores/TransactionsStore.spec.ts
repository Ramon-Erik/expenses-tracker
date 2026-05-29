import { createPinia, setActivePinia } from "pinia";
import type {
  IRawTransaction,
  ITransaction,
} from "@/interfaces/ITransaction.interface";
import { useTransactions } from "@/stores/TransactionsStore";

jest.mock("@/utils/currency", () => ({
  currencyFormat: (val: number) => `R$ ${val.toFixed(2)}`,
}));

describe("Transactions Pinia Store", () => {
  const LOCAL_KEY_TRANSACTION = "ex-transactions";
  const LOCAL_KEY_TAGS = "ex-tags";

  beforeEach(() => {
    setActivePinia(createPinia());
    localStorage.clear();
    jest.clearAllMocks();
  });

  it("should initialize with empty arrays if localStorage is empty", () => {
    const store = useTransactions();

    expect(store.transactionsList).toEqual([]);
    expect(store.tagList).toEqual([]);
    expect(store.visualization).toBe("transactions");
  });

  it("should initialize with values from localStorage if they exist", () => {
    const mockStoredTransactions = [
      { id: 123, description: "Test", amount: 10, isIncoming: true },
    ];
    const mockStoredTags = [{ text: "Trabalho", value: 456 }];

    localStorage.setItem(
      LOCAL_KEY_TRANSACTION,
      JSON.stringify(mockStoredTransactions)
    );
    localStorage.setItem(LOCAL_KEY_TAGS, JSON.stringify(mockStoredTags));

    const store = useTransactions();

    expect(store.transactionsList).toHaveLength(1);
    expect(store.transactionsList[0].description).toBe("Test");
    expect(store.tagList).toHaveLength(1);
    expect(store.tagList[0].text).toBe("Trabalho");
  });

  it("should add a new transaction and update localStorage via watch", async () => {
    const store = useTransactions();

    const setItemSpy = jest.spyOn(Storage.prototype, "setItem");

    const rawTransaction: IRawTransaction = {
      description: "Freelance Vue",
      amount: 1500,
      isIncoming: true,
      inicialDate: new Date(),
      finalDate: null,
      category: "Trabalho",
      paymentMethod: "Pix",
      tags: ["vue", "freelance"],
    };

    store.addTransaction(rawTransaction);

    expect(store.transactionsList).toHaveLength(1);
    expect(store.transactionsList[0].description).toBe("Freelance Vue");
    expect(store.transactionsList[0].id).toBeDefined();

    // Como o watch é assíncrono, aguardamos o próximo tick para validar o localStorage
    await Promise.resolve();
    expect(setItemSpy).toHaveBeenCalledWith(
      LOCAL_KEY_TRANSACTION,
      expect.any(String)
    );
  });

  it("should delete a transaction by id and sync with localStorage", async () => {
    const store = useTransactions();
    store.transactionsList = [
      { id: 111, description: "Conta de Luz", amount: 150 } as ITransaction,
      { id: 222, description: "Mercado", amount: 300 } as ITransaction,
    ];

    store.deleteTransaction(111);

    expect(store.transactionsList).toHaveLength(1);
    expect(store.transactionsList[0].id).toBe(222);
  });

  it("should add a new tag and update localStorage via watch", async () => {
    const store = useTransactions();
    const setItemSpy = jest.spyOn(Storage.prototype, "setItem");

    store.addTag("Investimentos");

    expect(store.tagList).toHaveLength(1);
    expect(store.tagList[0].text).toBe("Investimentos");
    expect(store.tagList[0].value).toBeDefined();

    await Promise.resolve();
    expect(setItemSpy).toHaveBeenCalledWith(LOCAL_KEY_TAGS, expect.any(String));
  });

  it("should delete a tag by value (id)", () => {
    const store = useTransactions();
    store.tagList = [
      { text: "Lazer", value: 999 },
      { text: "Fixa", value: 888 },
    ];

    store.deleteTag(999);

    expect(store.tagList).toHaveLength(1);
    expect(store.tagList[0].value).toBe(888);
  });

  it("should change visualization mode", () => {
    const store = useTransactions();

    store.changeVisualization("day");
    expect(store.visualization).toBe("day");

    store.changeVisualization("tags");
    expect(store.visualization).toBe("tags");
  });

  it("should calculate monthBalance correctly for incomes and outcomes", () => {
    const store = useTransactions();

    store.transactionsList = [
      {
        id: 1,
        description: "Salário",
        amount: 3000,
        isIncoming: true,
      } as ITransaction,
      {
        id: 2,
        description: "Aluguel",
        amount: 1200,
        isIncoming: false,
      } as ITransaction,
      {
        id: 3,
        description: "Internet",
        amount: 100,
        isIncoming: false,
      } as ITransaction,
    ];

    expect(store.monthBalance).toEqual({
      incomes: "R$ 3000.00",
      outcomes: "R$ -1300.00",
      balance: "R$ 1700.00",
    });
  });
});
