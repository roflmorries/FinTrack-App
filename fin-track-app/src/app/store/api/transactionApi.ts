import { api } from "./api";


export const transactionApi = api.injectEndpoints({
  endpoints: builder => ({
    fetchTransactions: builder.query
  })
})