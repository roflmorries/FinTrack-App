// import { OpenAI } from 'openai'
import { Transaction } from '../../entities/transactions/model/types';

// const openai = new OpenAI({ apiKey: import.meta.env.VITE_OPENAI_API_KEY, dangerouslyAllowBrowser: true });

// export const askAssistant = async (question: string, transactions: Transaction[]) => {
//   const prompt = `
//     Мои транзакции за последний месяц:
//     ${transactions.map(t => `${t.type === 'income' ? '+' : '-'}${t.amount} грн (${t.category})`).join('\n')}
    
//     Вопрос: ${question}
//   `

//   const response = await openai.chat.completions.create({
//     model: 'gpt-3.5-turbo',
//     messages: [{role: 'user', content: prompt}]
//   });

//   return response.choices[0]?.message.content;
// }

export const askAssistant = async (
  question: string,
  transactions: Transaction[],
  balance: number,
  freeBalance: number,
  goalsReserved: number,
  balanceHistory: any[],
  user: string
) => {
  const res = await fetch("http://localhost:3001/api/ai-assistant", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question, transactions, balance, freeBalance, goalsReserved, balanceHistory, user })
  });
  const data = await res.json();
  console.log(data)
  return data.answer;
};
