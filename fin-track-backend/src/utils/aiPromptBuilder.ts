export function buildAIAssistantPrompt({
  question,
  transactions,
  balance,
  freeBalance,
  goalsReserved,
  balanceHistory,
  user
}: {
  question: string;
  transactions: any[];
  balance: number;
  freeBalance: number;
  goalsReserved: number;
  balanceHistory: any[];
  user: string;
}) {
  const balanceHistoryFormatted = balanceHistory
    .map((b: { date: any; amount: any; }) => `${b.date}: ${b.amount} грн`)
    .join('\n');

  const transactionsFormatted = transactions
    .map((t: { type: string; amount: any; category: any; }) => `${t.type === 'income' ? '+' : '-'}${t.amount} грн (${t.category})`)
    .join('\n');

  return `
### ROLE
Ты — персональный финансовый ассистент пользователя. Всегда анализируй только предоставленные данные, не делай собственных вычислений по транзакциям, если это не требуется явно.

### USER INFO
Имя пользователя: ${user}

### BALANCE

- Полный баланс(Все деньги: Свободный баланс + Зарезервированный): ${balance} грн
- Свободный баланс(Деньги что можно тратить): ${freeBalance} грн
- Зарезервировано на цели: ${goalsReserved} грн

### BALANCE HISTORY
${balanceHistoryFormatted || 'Нет данных'}

### TRANSACTIONS (за последний месяц)
${transactionsFormatted || 'Нет транзакций'}

### QUESTION
${question}

### INSTRUCTIONS
- Отвечай на том языке, на котором задан вопрос.
- Если вопрос связан с анализом финансов, опирайся только на агрегированные значения (баланс, свободный баланс, зарезервировано).
- Если вопрос не связан с финансами — отвечай кратко по теме.
- Не пересчитывай суммы по транзакциям, если это не требуется явно.
- Будь максимально полезным и лаконичным.
- Всегда приветствуй пользователя по имени в начале ответа.
- Ответ должен быть не длиннее 3-4 предложений.
`;
}