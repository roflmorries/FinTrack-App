import { useState } from 'react';
import TransactionCard from './TransactionCard';
import { selectSortedTransactions } from '../../entities/transactions/model/sortTypeSelector';
import { Select } from 'antd';
import { useSelector } from 'react-redux';

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
  const items = useSelector(state => selectSortedTransactions(state, sortType));

  if (!sortType) {
    const incomes = items.filter(tx => tx.type === "income");
    const expenses = items.filter(tx => tx.type === "expense");
    return (
      <>
        <div style={{ marginBottom: 16, width: 220 }}>
          <Select
            options={sortOptions}
            value={sortType}
            onChange={value => setSortType(value as SortType)}
            allowClear
            placeholder="Сортировка"
            style={{ width: '100%' }}
          />
        </div>
        <div style={{ display: "flex", gap: 24 }}>
          <div style={{ flex: 1 }}>
            <h3>Доходы</h3>
            {incomes.map(item => (
              <TransactionCard key={item.id} onEdit={onEdit} onDelete={onDelete} {...item} />
            ))}
          </div>
          <div style={{ flex: 1 }}>
            <h3>Расходы</h3>
            {expenses.map(item => (
              <TransactionCard key={item.id} onEdit={onEdit} onDelete={onDelete} {...item} />
            ))}
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <div style={{ marginBottom: 16, width: 220 }}>
        <Select
          options={sortOptions}
          value={sortType}
          onChange={value => setSortType(value as SortType)}
          allowClear
          placeholder="Сортировка"
          style={{ width: '100%' }}
        />
      </div>
      <div>
        {items.map(item => (
          <TransactionCard key={item.id} onEdit={onEdit} onDelete={onDelete} {...item} />
        ))}
      </div>
    </>
  )
}