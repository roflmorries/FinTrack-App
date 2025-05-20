import { RootState } from "../../../app/store/store";
import { SelectAllTransactions } from "./transactionsSelectors";


export const selectBalance = (state: RootState) => {
  const transactions = SelectAllTransactions(state);
  return transactions.reduce((acc, tx) => {
    if (tx.type === 'income') return acc + tx.amount;
    if (tx.type === 'expense') return acc - tx.amount;
    return acc;
  }, 0)
}