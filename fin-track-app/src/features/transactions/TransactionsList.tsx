import { Transaction } from '../../entities/transactions/model/types';
import TransactionCard from './TransactionCard';

type TransactionsListProps = {
  items: Transaction[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TransactionsList({ items, onDelete, onEdit }: TransactionsListProps) {
  return (
    <>
    {items.map(item => (
      <TransactionCard key={item.id} onEdit={onEdit} onDelete={onDelete} {...item}/>
    ))}
    </>
  )
}