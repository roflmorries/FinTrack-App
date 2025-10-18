import { useMemo } from "react";
import { useFetchTransactionsQuery } from "../../../../app/store/api/transactionApi"

/**
 * @param userId
 * @returns object w/ balance, reserved funds  or free money 
 */


export const useBalanceCalculations = (userId: string | undefined) => {
  const { data: transactions = [] } = useFetchTransactionsQuery(userId || '', { skip: !userId });

  const balance = useMemo(() => 
    transactions.reduce((acc, tx) => {
      if (tx.type === 'income') return acc + tx.amount;
      if (tx.type === 'expense') return acc - tx.amount;
      return acc
    }, 0),
    [transactions]
  );

  const goalsReserved = useMemo(() => 
    transactions
      .filter(tx => !!tx.goalId)
      .reduce((acc, tx) => {
        if (tx.type === "income") return acc + tx.amount;
        if (tx.type === "expense") return acc - tx.amount;
        return acc;
      }, 0),
      [transactions]
  )

  const freeBalance = balance - goalsReserved;

  return { balance, goalsReserved, freeBalance };
};

