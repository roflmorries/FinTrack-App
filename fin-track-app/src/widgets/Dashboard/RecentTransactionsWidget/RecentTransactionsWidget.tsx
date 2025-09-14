import { memo, useMemo } from 'react';
import { useAppSelector } from '../../../shared/lib/hooks/redux/reduxTypes';
import { SelectAllTransactions } from '../../../entities/transactions/model/transactionsSelectors';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Transaction } from '../../../entities/transactions/model/types';
import { Button } from '@mui/material';

type Props = {}

const WidgetContainer = styled.div`
  width: 100%;
  min-height: 100%;
  /* height: 90%; */

  will-change: transform;
  contain: layout style paint;
  
  /* background: rgba(30, 30, 30, 0.95); */
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 24px;
  
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.3),
    0 4px 16px rgba(0, 0, 0, 0.15);
  
  padding: 20px;
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
  }

  .widget-content {
    position: relative;
    z-index: 1;
  }

  .widget-title {
    color: #ffffff !important;
    font-size: 18px !important;
    font-weight: 600 !important;
    margin-bottom: 20px !important;
    padding-bottom: 8px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .transactions-container {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .transaction-section {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 24px;
    padding: 16px;
    transition: all 0.3s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.06);
      border-color: rgba(255, 255, 255, 0.15);
    }
  }

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    padding-bottom: 8px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }

  .section-title {
    color: #ffffff !important;
    font-size: 16px !important;
    font-weight: 600 !important;
    margin: 0 !important;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .section-title.income {
    color: #4ade80 !important;
  }

  .section-title.expense {
    color: #f87171 !important;
  }

  .see-more-btn {
    font-size: 12px !important;
    font-weight: 500 !important;
    cursor: pointer;
    transition: all 0.3s ease !important;
    text-decoration: none;
    display: inline-block;

    &:hover {
      background: rgba(255, 255, 255, 0.2) !important;
      border-color: rgba(255, 255, 255, 0.3) !important;
      color: #fff !important;
      transform: translateY(-1px);
    }
  }

  .transaction-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .transaction-item {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 18px;
    padding: 12px 16px;
    transition: all 0.3s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.08);
      border-color: rgba(255, 255, 255, 0.2);
      transform: translateX(4px);
    }
  }

  .transaction-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 4px;
  }

  .transaction-category {
    color: rgba(255, 255, 255, 0.9) !important;
    font-size: 14px !important;
    font-weight: 500 !important;
    margin: 0;
  }

  .transaction-amount {
    font-size: 14px !important;
    font-weight: 600 !important;
    margin: 0;
  }

  .transaction-amount.income {
    color: #4ade80 !important;
  }

  .transaction-amount.expense {
    color: #f87171 !important;
  }

  .transaction-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 4px;
  }

  .transaction-date {
    color: rgba(255, 255, 255, 0.6) !important;
    font-size: 12px !important;
    margin: 0;
  }

  .transaction-comment {
    color: rgba(255, 255, 255, 0.7) !important;
    font-size: 12px !important;
    font-style: italic;
    max-width: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 0;
  }

  .empty-state {
    text-align: center;
    padding: 30px 20px;
    color: rgba(255, 255, 255, 0.6);
    
    .empty-icon {
      font-size: 36px;
      margin-bottom: 12px;
      opacity: 0.5;
    }
    
    .empty-text {
      font-size: 14px;
      margin-bottom: 6px;
      color: rgba(255, 255, 255, 0.8);
    }
    
    .empty-subtext {
      font-size: 12px;
      opacity: 0.7;
    }
  }
`;

// Компонент для отображения одной транзакции
const TransactionItem = memo(({ transaction }: { transaction: Transaction }) => (
  <div className="transaction-item">
    <div className="transaction-header">
      <p className="transaction-category">{transaction.category}</p>
      <p className={`transaction-amount ${transaction.type}`}>
        {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toLocaleString()}
      </p>
    </div>
    <div className="transaction-footer">
      <p className="transaction-date">{transaction.date}</p>
      {transaction.comment && (
        <p className="transaction-comment" title={transaction.comment}>
          {transaction.comment}
        </p>
      )}
    </div>
  </div>
));

TransactionItem.displayName = 'TransactionItem';

const TransactionSection = memo(({ 
  title, 
  type, 
  transactions, 
  icon,
  onSeeMore 
}: { 
  title: string;
  type: 'income' | 'expense';
  transactions: Transaction[];
  icon: string;
  onSeeMore: () => void;
}) => (
  <div className="transaction-section">
    <div className="section-header">
      <h4 className={`section-title ${type}`}>
        <span>{icon}</span>
        {title}
      </h4>
      <Button variant='text' className="see-more-btn" onClick={onSeeMore}>
        See more
      </Button>
    </div>
    
    {transactions.length > 0 ? (
      <div className="transaction-list">
        {transactions.map(transaction => (
          <TransactionItem key={transaction.id} transaction={transaction} />
        ))}
      </div>
    ) : (
      <div className="empty-state">
        <div className="empty-icon">{type === 'income' ? '💰' : '💸'}</div>
        <div className="empty-text">No {type} transactions</div>
        <div className="empty-subtext">
          {type === 'income' ? 'Add some income to see them here' : 'Add some expenses to see them here'}
        </div>
      </div>
    )}
  </div>
));

TransactionSection.displayName = 'TransactionSection';

const RecentTransactionsWidget = memo(({}: Props) => {
  const navigate = useNavigate();
  const allTransactions = useAppSelector(SelectAllTransactions);

  const { recentIncomes, recentExpenses } = useMemo(() => {
    const sortedTransactions = allTransactions
      .slice()
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const recentIncomes = sortedTransactions
      .filter(tx => tx.type === 'income')
      .slice(0, 3);
      
    const recentExpenses = sortedTransactions
      .filter(tx => tx.type === 'expense')
      .slice(0, 3);

    return { recentIncomes, recentExpenses };
  }, [allTransactions]);

  const handleSeeMore = () => {
    navigate('/dashboard/transactions');
  };

  return (
    <WidgetContainer>
      <div className="widget-content">
        <h3 className="widget-title">📋 Recent Transactions</h3>
        
        <div className="transactions-container">
          <TransactionSection
            title="Income"
            type="income"
            transactions={recentIncomes}
            icon="💰"
            onSeeMore={handleSeeMore}
          />
          
          <TransactionSection
            title="Expenses"
            type="expense"
            transactions={recentExpenses}
            icon="💸"
            onSeeMore={handleSeeMore}
          />
        </div>
      </div>
    </WidgetContainer>
  );
});

RecentTransactionsWidget.displayName = 'RecentTransactionsWidget';

export default RecentTransactionsWidget;