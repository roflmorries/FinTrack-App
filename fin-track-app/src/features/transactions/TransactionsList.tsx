import { useState } from 'react';
import TransactionCard from './TransactionCard';
import { selectSortedTransactions } from '../../entities/transactions/model/sortTypeSelector';
import { Select } from 'antd';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

type TransactionsListProps = {
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const sortOptions = [
  { value: 'date', label: 'По дате' },
  { value: 'category', label: 'По категории' },
  { value: 'type', label: 'По типу' },
];

type SortType = 'date' | 'category' | 'type' | undefined;

const TransactionsContainer = styled.div`
  background: rgba(30, 30, 30, 0.95);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 24px;
  
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.3),
    0 4px 16px rgba(0, 0, 0, 0.15);
  
  padding: 24px;
  position: relative;
  overflow: hidden;
  
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 
      0 12px 40px rgba(0, 0, 0, 0.4),
      0 8px 20px rgba(0, 0, 0, 0.2);
    border-color: rgba(255, 255, 255, 0.25);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, 
      rgba(255, 255, 255, 0.05) 0%, 
      rgba(255, 255, 255, 0.02) 50%, 
      rgba(255, 255, 255, 0.01) 100%
    );
    border-radius: 24px;
    pointer-events: none;
    z-index: 0;
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const Title = styled.h2`
  color: #ffffff !important;
  font-size: 20px !important;
  font-weight: 600 !important;
  margin: 0 !important;
  display: flex;
  align-items: center;
  gap: 12px;

  &::before {
    content: '💳';
    font-size: 24px;
  }
`;

const FilterContainer = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 24px;
  
  .ant-select {
    width: 220px;
    
    .ant-select-selector {
      background: rgba(255, 255, 255, 0.08) !important;
      border: 1px solid rgba(255, 255, 255, 0.2) !important;
      border-radius: 8px !important;
      color: #fff !important;
      
      &:hover {
        background: rgba(255, 255, 255, 0.12) !important;
        border-color: rgba(255, 255, 255, 0.3) !important;
      }
    }
    
    .ant-select-selection-placeholder {
      color: rgba(255, 255, 255, 0.6) !important;
    }
    
    .ant-select-arrow {
      color: rgba(255, 255, 255, 0.7) !important;
    }
  }
`;

const TransactionsGrid = styled.div`
  display: flex;
  gap: 24px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
  }
`;

const TransactionSection = styled.div`
  flex: 1;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 20px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.06);
    border-color: rgba(255, 255, 255, 0.15);
  }
`;

const SectionTitle = styled.h3`
  color: #ffffff !important;
  font-size: 18px !important;
  font-weight: 600 !important;
  margin: 0 0 16px 0 !important;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  gap: 8px;
  
  &.income {
    color: #4ade80 !important;
    
    &::before {
      content: '📈';
      font-size: 20px;
    }
  }
  
  &.expense {
    color: #f87171 !important;
    
    &::before {
      content: '📉';
      font-size: 20px;
    }
  }
`;

const TransactionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SingleList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: rgba(255, 255, 255, 0.6);
  
  .empty-icon {
    font-size: 48px;
    margin-bottom: 16px;
    opacity: 0.5;
  }
  
  .empty-text {
    font-size: 16px;
    margin-bottom: 8px;
    color: rgba(255, 255, 255, 0.8);
  }
  
  .empty-subtext {
    font-size: 14px;
    opacity: 0.7;
  }
`;

export default function TransactionsList({ onDelete, onEdit }: TransactionsListProps) {
  const [sortType, setSortType] = useState<SortType>(undefined);
  const items = useSelector(state => selectSortedTransactions(state, sortType));

  if (items.length === 0) {
    return (
      <TransactionsContainer>
        <ContentWrapper>
          <Header>
            <Title>Transactions</Title>
          </Header>
          <EmptyState>
            <div className="empty-icon">💳</div>
            <div className="empty-text">No transactions yet</div>
            <div className="empty-subtext">Add your first transaction to get started</div>
          </EmptyState>
        </ContentWrapper>
      </TransactionsContainer>
    );
  }

  if (!sortType) {
    const incomes = items.filter(tx => tx.type === "income");
    const expenses = items.filter(tx => tx.type === "expense");
    
    return (
      <TransactionsContainer>
        <ContentWrapper>
          <Header>
            <Title>Transactions</Title>
          </Header>
          
          <FilterContainer>
            <Select
              options={sortOptions}
              value={sortType}
              onChange={value => setSortType(value as SortType)}
              allowClear
              placeholder="Сортировка"
              style={{ width: '100%' }}
            />
          </FilterContainer>
          
          <TransactionsGrid>
            <TransactionSection>
              <SectionTitle className="income">
                Доходы ({incomes.length})
              </SectionTitle>
              <TransactionList>
                {incomes.length > 0 ? (
                  incomes.map(item => (
                    <TransactionCard key={item.id} onEdit={onEdit} onDelete={onDelete} {...item} />
                  ))
                ) : (
                  <EmptyState>
                    <div className="empty-icon">💰</div>
                    <div className="empty-text">No income transactions</div>
                    <div className="empty-subtext">Add some income to see them here</div>
                  </EmptyState>
                )}
              </TransactionList>
            </TransactionSection>
            
            <TransactionSection>
              <SectionTitle className="expense">
                Расходы ({expenses.length})
              </SectionTitle>
              <TransactionList>
                {expenses.length > 0 ? (
                  expenses.map(item => (
                    <TransactionCard key={item.id} onEdit={onEdit} onDelete={onDelete} {...item} />
                  ))
                ) : (
                  <EmptyState>
                    <div className="empty-icon">💸</div>
                    <div className="empty-text">No expense transactions</div>
                    <div className="empty-subtext">Add some expenses to see them here</div>
                  </EmptyState>
                )}
              </TransactionList>
            </TransactionSection>
          </TransactionsGrid>
        </ContentWrapper>
      </TransactionsContainer>
    );
  }

  return (
    <TransactionsContainer>
      <ContentWrapper>
        <Header>
          <Title>Transactions</Title>
        </Header>
        
        <FilterContainer>
          <Select
            options={sortOptions}
            value={sortType}
            onChange={value => setSortType(value as SortType)}
            allowClear
            placeholder="Сортировка"
            style={{ width: '100%' }}
          />
        </FilterContainer>
        
        <SingleList>
          {items.map(item => (
            <TransactionCard key={item.id} onEdit={onEdit} onDelete={onDelete} {...item} />
          ))}
        </SingleList>
      </ContentWrapper>
    </TransactionsContainer>
  );
}