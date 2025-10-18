import { useMemo } from "react";
import { useFetchTransactionsQuery } from "../../../../app/store/api/transactionApi";
import dayjs from "dayjs";


export const useBalanceHistory = (userId: string | undefined) => {
    const { data: transactions = [], isLoading } = useFetchTransactionsQuery(userId || '', { skip: !userId });

    const history = useMemo(() => {
      if (isLoading || !transactions.length) return [];

      const sorted = [...transactions].sort((a, b) => dayjs(a.date).unix() - dayjs(b.date).unix());
      let balance = 0;
      const history: { date: string; balance: number }[] = [];
      sorted.forEach(tx => {
        if (tx.type === "income") balance += tx.amount;
        if (tx.type === "expense") balance -= tx.amount;
        history.push({ date: tx.date, balance });
      });
      return history;
    }, [transactions, isLoading]);

    return { history, isLoading };
}