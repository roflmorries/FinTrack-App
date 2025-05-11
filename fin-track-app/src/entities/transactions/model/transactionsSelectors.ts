import { RootState } from "../../../app/store/store"
import { transactionAdapter } from "./transactionSlice"

export const {
  selectAll: SelectAllTransactions,
  selectById: SelectTransactionById,
} = transactionAdapter.getSelectors((state: RootState) => state.transaction);