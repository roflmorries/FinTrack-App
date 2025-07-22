import { Transaction } from '../../entities/transactions/model/types';
import axios from 'axios';

interface AskAssistantParams {
  question: string;
  transactions: Transaction[];
  balance: number;
  freeBalance: number;
  goalsReserved: number;
  balanceHistory: any[];
  user: string;
  budget: number
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
  user,
  budget
}: AskAssistantParams) => {
  const res = await axios.post<AskAssistantResponse>("http://localhost:3001/ai-assistant",
    { question, transactions, balance, freeBalance, goalsReserved, balanceHistory, user, budget },
    { headers: { "Content-Type": "application/json" }}
  );
  console.log(res.data)
  return res.data.answer;
};
