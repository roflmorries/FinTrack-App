import { Transaction } from "../../../entities/transactions/model/types";
import { API_URL } from "../../../shared/config/config";
import { api } from "./api";

const API_URL_TRANSACTIONS = `${API_URL}/transactions`;

export const transactionApi = api.injectEndpoints({
  endpoints: builder => ({
    fetchTransactions: builder.query<Transaction[], string>({
      query: (userId: string) => `${API_URL_TRANSACTIONS}?userId=${userId}`,
    })
  })
})

export const { useFetchTransactionsQuery } = transactionApi