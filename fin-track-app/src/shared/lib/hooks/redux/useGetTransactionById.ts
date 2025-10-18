import { useMemo } from "react";
import { useFetchTransactionsQuery } from "../../../../app/store/api/transactionApi";

export const useGetTransactionById = (userId: string | undefined, transactionId: string | undefined) => {
  const { data: transactions = [] } = useFetchTransactionsQuery(userId || '', { skip: !userId });
  
  return useMemo(() => 
    transactionId ? transactions.find(tx => tx.id === transactionId) : undefined,
    [transactions, transactionId]
  );
};