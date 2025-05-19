import { Category } from '../../entities/categories/model/types';
import { Button } from 'antd';

type CategoryCardProps = Category & {
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function CategoryCard({ onEdit, onDelete, ...category }: CategoryCardProps) {
  return (
    <>
    <p>Category name: {category.name}</p>
    <div>
      <Button type='primary' onClick={() => onEdit(category.id)}>Edit</Button>
      <Button type='primary' onClick={() => onDelete(category.id)}>Delete</Button>
    </div>
    </>
  )
}