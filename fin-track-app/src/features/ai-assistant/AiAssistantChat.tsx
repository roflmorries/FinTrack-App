import { useEffect, useRef, useState } from 'react'
import { useAppSelector } from '../../shared/lib/hooks/redux/reduxTypes';
import { SelectAllTransactions } from '../../entities/transactions/model/transactionsSelectors';
import { CircularProgress } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { askAssistant } from '../../shared/api/aiAssistant';
import { selectBalance, selectBalanceHistory, selectFreeBalance, selectGoalsReserved } from '../../entities/transactions/model/selectBalance';
import { ChatContainer, EmptyState, InputContainer, LoadingContainer, MessageBubble, MessageRow, SendButton, StyledContainer, StyledTextField } from '../../shared/ui/Assistant/AssistantChat.styled';
import { selectMonthlyBudget } from '../../entities/user/selectors/selectMonthlyBudget';


type Message = { role: 'user' | 'assistant', content: string }

export default function AiAssistantChat() {
  const [messages, setMessage] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const transactions = useAppSelector(SelectAllTransactions);
  const balance = useAppSelector(selectBalance);
  const freeBalance = useAppSelector(selectFreeBalance)
  const balanceGoalReserved = useAppSelector(selectGoalsReserved)
  const balanceHistory = useAppSelector(selectBalanceHistory)
  const user = useAppSelector(state => state.user.currentUser?.fullName) || ''
  const budget = useAppSelector(selectMonthlyBudget);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage: Message = { role: 'user', content: input };
    setMessage(prev => [...prev, userMessage])
    setInput('');
    setLoading(true);

    try {
      const aiReply = await askAssistant({
        question: input,
        transactions,
        balance,
        freeBalance,
        goalsReserved: balanceGoalReserved,
        balanceHistory,
        user,
        budget
      })
      setMessage((prev: Message[]) => [...prev, { role: "assistant", content: aiReply || "AI не ответил" }]);
    } catch (error: any) {
      if (error?.response?.status === 429) {
        setMessage(prev => [...prev, { role: "assistant", content: "Лимит запросов исчерпан, попробуйте позже" }]);
      } else {
        setMessage((prev: Message[]) => [...prev, { role: "assistant", content: "Ошибка соединения" }]);
      }
    }
    setLoading(false)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <StyledContainer>
      
      <ChatContainer>
        {messages.length === 0 ? (
          <EmptyState>
            <div className="emoji">💬</div>
            <div className="title">Hello there!</div>
            <div className="subtitle">
              Ask a question about your finances, transactions, or give budgeting tips.
            </div>
          </EmptyState>
        ) : (
          messages.map((message, index) => (
            <MessageRow key={index} $isUser={message.role === 'user'}>
              <MessageBubble $isUser={message.role === 'user'}>
                {message.content}
              </MessageBubble>
            </MessageRow>
          ))
        )}
        
        {loading && (
          <LoadingContainer>
            <CircularProgress size={20} />
            <span>Assistant thinking...</span>
          </LoadingContainer>
        )}
        
        <div ref={chatEndRef} />
      </ChatContainer>
      
      <InputContainer>
        <StyledTextField
          multiline
          maxRows={4}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Задайте вопрос о ваших финансах..."
          disabled={loading}
          variant="outlined"
        />
        <SendButton
          onClick={sendMessage}
          disabled={loading || !input.trim()}
        >
          <SendIcon />
        </SendButton>
      </InputContainer>
    </StyledContainer>
  )
}