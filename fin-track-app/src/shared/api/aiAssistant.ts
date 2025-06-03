import { Transaction } from '../../entities/transactions/model/types';

interface AskAssistantParams {
  question: string;
  transactions: Transaction[];
  balance: number;
  freeBalance: number;
  goalsReserved: number;
  balanceHistory: any[];
  user: string;
}

interface AskAssistantResponse {
  answer: string;
}


export const askAssistant = async ({
  question,
  transactions,
  balance,
  freeBalance,
  goalsReserved,
  balanceHistory,
  user
}: AskAssistantParams) => {
  const res = await fetch("http://localhost:3001/api/ai-assistant", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question, transactions, balance, freeBalance, goalsReserved, balanceHistory, user })
  });
  const data: AskAssistantResponse = await res.json();
  console.log(data)
  return data.answer;
};
