import { useMemo } from "react";
import { useFetchTransactionsQuery } from "../../../../../app/store/api/transactionApi"
import dayjs from "dayjs";


export const useGetMonthlyExpenses = (userId: string | undefined): number => {
  const { data: transactions = [] } = useFetchTransactionsQuery(userId || '', { skip: !userId });

  return useMemo(() => {
    const now = dayjs();
    const month = now.month();
    const year = now.year();

    return transactions
      .filter(tx =>
        tx.type === 'expense' &&
        dayjs(tx.date).month() === month &&
        dayjs(tx.date).year() === year
      )
      .reduce((sum, tx) => sum + tx.amount, 0)
  }, [transactions])
}