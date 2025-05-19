import { Category } from '../../entities/categories/model/types';
import CategoryCard from './CategoryCard';

type CategoriesListProps = {
    items: Category[];
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}

export default function CategoriesList({items, onEdit, onDelete}: CategoriesListProps) {
  return (
    <>
      {items.map(item => (
        <CategoryCard key={item.id} onEdit={onEdit} onDelete={onDelete} {...item}/>
      ))}
    </>
  )
}