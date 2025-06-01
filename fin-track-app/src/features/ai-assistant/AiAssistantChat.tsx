import { useState } from 'react'
import { useAppSelector } from '../../shared/lib/hooks/redux/reduxTypes';
import { SelectAllTransactions } from '../../entities/transactions/model/transactionsSelectors';
import { Input, Spin, Button } from 'antd';
import { askAssistant } from '../../shared/api/aiAssistant';
import styled from 'styled-components';

const StyledContainer = styled.div`
  width: 90%;
  height: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-self: center;
  justify-content: space-between;
`

const ChatContainer = styled.div`
  padding: 16px;
  border-radius: 12px;
  min-height: 75%;
  max-height: 75%;
  overflow: scroll;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-self: center;

  &::-webkit-scrollbar {
    width: 8px;
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: #444;
    border-radius: 8px;
    border: none;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
    border: none;
  }

  &::-webkit-scrollbar-corner {
    background: none;
  }
`;

const MessageRow = styled.div<{ isUser: boolean }>`
  display: flex;
  justify-content: ${props => (props.isUser ? 'flex-end' : 'flex-start')};
  margin-bottom: 8px;
`;

const MessageBubble = styled.span<{ isUser: boolean }>`
  background: ${props => (props.isUser ? '#0057b8' : '#222')};
  color: #fff;
  padding: 10px 16px;
  border-radius: 18px;
  max-width: 70%;
  word-break: break-word;
  font-size: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
`;

const ToolsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  textarea {
    width: 500px;
    height: 20px;
  }
`

type Message = { role: 'user' | 'assistant', content: string }

export default function AiAssistantChat() {
  const [messages, setMessage] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const transactions = useAppSelector(SelectAllTransactions);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage: Message = { role: 'user', content: input };
    setMessage(prev => [...prev, userMessage])
    setInput('');
    setLoading(true);

    try {
      const aiReply = await askAssistant(input, transactions)
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
  return (
    <StyledContainer>
    <ChatContainer>
      {messages.map((message, index) => (
        <MessageRow key={index} isUser={message.role === 'user'}>
          <MessageBubble isUser={message.role === 'user'}>
            {message.content}
          </MessageBubble>
        </MessageRow>
      ))}
      {loading && <Spin/>}
    </ChatContainer>
    <ToolsContainer>
    <Input.TextArea
    value={input}
    onChange={e => setInput(e.target.value)}
    onPressEnter={e => { e.preventDefault(); sendMessage(); }}
    placeholder='Задай вопрос'
    />
    <Button type="primary" onClick={sendMessage}>Отправить</Button>
    </ToolsContainer>
    </StyledContainer>
  )
}