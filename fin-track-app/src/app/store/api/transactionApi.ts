import { Transaction } from "../../../entities/transactions/model/types";
import { API_URL } from "../../../shared/config/config";
import { api } from "./api";

const API_URL_TRANSACTIONS = `${API_URL}/transactions`;

export const transactionApi = api.injectEndpoints({
  endpoints: builder => ({
    fetchTransactions: builder.query<Transaction[], string>({
      query: (userId: string) => `${API_URL_TRANSACTIONS}?userId=${userId}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Transaction' as const, id })),
              { type: 'Transaction', id: 'LIST' },
            ]
          : [{ type: 'Transaction', id: 'LIST' }],
    }),
    createTransaction: builder.mutation<Transaction, Omit<Transaction, 'id'>>({
      query: (transaction) => ({
        url: API_URL_TRANSACTIONS,
        method: 'POST',
        body: transaction
      }),
      invalidatesTags: [{ type: 'Transaction', id: 'LIST' }]
    }),
    updateTransaction: builder.mutation<Transaction, { id: string, changes: Partial<Transaction> }>({
      query: ({ id, changes }) => ({
        url: `${API_URL_TRANSACTIONS}/${id}`,
        method: 'PUT',
        body: changes
      }),
      invalidatesTags: (result, error, {id}) => [{ type: 'Transaction', id }]
    }),
    deleteTransaction: builder.mutation<string, string>({
      query: id => ({
        url: `${API_URL_TRANSACTIONS}/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Transaction', id }]
    })
  })
})

export const {
  useFetchTransactionsQuery,
  useCreateTransactionMutation,
  useUpdateTransactionMutation,
  useDeleteTransactionMutation,
 } = transactionApi