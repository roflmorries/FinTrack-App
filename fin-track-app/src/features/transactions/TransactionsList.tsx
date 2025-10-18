import { useMemo, useState } from 'react';
import TransactionCard from './TransactionCard';
import { FormControl, Select, MenuItem, InputLabel } from '@mui/material';
import { useFetchTransactionsQuery } from '../../app/store/api/transactionApi';
import { useAppSelector } from '../../shared/lib/hooks/redux/reduxTypes';
import Loader from '../../widgets/Loader/Loader';
import ErrorLoading from '../../widgets/Loader/ErrorLoading';
import { ContentWrapper, EmptyState, FilterContainer, Header, SectionTitle, SingleList, Title, TransactionList, TransactionsContainer, TransactionSection, TransactionsGrid } from './ui/transactionList.styled';

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


export default function TransactionsList({ onDelete, onEdit }: TransactionsListProps) {
  const [sortType, setSortType] = useState<SortType>(undefined);
  const user = useAppSelector(state => state.user.currentUser);
  const { data, error, isLoading } = useFetchTransactionsQuery(user?.uid ?? '', { skip: !user });

  const transactions = useMemo(() => {
    if (!data) return [];

    const items = [...data];

    if (sortType === 'date') {
      return items.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (sortType === 'category') {
      return items.sort((a,b) => a.category.localeCompare(b.category));
    } else if (sortType === 'type') {
      return items.sort((a,b) => a.type.localeCompare(b.type));
    }

    return items;
  }, [data, sortType])

  const incomes = transactions.filter(tx => tx.type === "income");
  const expenses = transactions.filter(tx => tx.type === "expense");

  if (isLoading) {
    return <Loader/>
  }

  if (error) {
    return <ErrorLoading/>
  }

  if (!transactions?.length) {
    return (
      <TransactionsContainer>
        <ContentWrapper>
          <Header>
          </Header>
          <EmptyState>
            <div className="empty-icon">💳</div>
            <div className="empty-text">No transactions yet</div>
            <div className="empty-subtext">Add your first transaction to get started</div>
          </EmptyState>
        </ContentWrapper>
      </TransactionsContainer>
    )
  }

  if (!sortType) {
    return (
      <TransactionsContainer>
        <ContentWrapper>
          <Header>
          </Header>
          
          <FilterContainer>
            <FormControl variant="outlined" size="small">
              <InputLabel>Сортировка</InputLabel>
              <Select
                value={sortType || ''}
                onChange={(e) => setSortType(e.target.value as SortType || undefined)}
                label="Сортировка"
                MenuProps={{
                  PaperProps: {
                    sx: {
                      backgroundColor: 'rgba(40, 40, 40, 0.95)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      '& .MuiMenuItem-root': {
                        color: '#fff',
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        },
                        '&.Mui-selected': {
                          backgroundColor: 'rgba(255, 255, 255, 0.2)',
                          '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.25)',
                          },
                        },
                      },
                    },
                  },
                }}
              >
                <MenuItem value="">
                  <em>Без сортировки</em>
                </MenuItem>
                {sortOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
          <FormControl variant="outlined" size="small">
            <InputLabel>Сортировка</InputLabel>
            <Select
              value={sortType || ''}
              onChange={(e) => setSortType(e.target.value as SortType || undefined)}
              label="Сортировка"
              MenuProps={{
                PaperProps: {
                  sx: {
                    backgroundColor: 'rgba(40, 40, 40, 0.95)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    '& .MuiMenuItem-root': {
                      color: '#fff',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      },
                      '&.Mui-selected': {
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.25)',
                        },
                      },
                    },
                  },
                },
              }}
            >
              <MenuItem value="">
                <em>Без сортировки</em>
              </MenuItem>
              {sortOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </FilterContainer>
        
        <SingleList>
          {transactions.map(item => (
            <TransactionCard key={item.id} onEdit={onEdit} onDelete={onDelete} {...item} />
          ))}
        </SingleList>
      </ContentWrapper>
    </TransactionsContainer>
  );
}