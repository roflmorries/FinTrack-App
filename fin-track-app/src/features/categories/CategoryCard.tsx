import styled from 'styled-components';
import { Category } from '../../entities/categories/model/types';
import { Button } from 'antd';

type CategoryCardProps = Category & {
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}


const StyledCard = styled.div<{ $color: string }>`
  display: flex;
  justify-content: center;
  gap: 30px;
  align-items: center;
  background: ${({ $color }) => $color};
  p {
    color: white;
  }
  .buttons__container {
    display: flex;
    gap: 15px;
  }
`


export default function CategoryCard({ onEdit, onDelete, ...category }: CategoryCardProps) {
  return (
    <StyledCard $color={category.color}>
    <p>Category name: {category.name}</p>
    <div className='buttons__container'>
      <Button type='primary' onClick={() => onEdit(category.id)}>Edit</Button>
      <Button type='primary' onClick={() => onDelete(category.id)}>Delete</Button>
    </div>
    </StyledCard>
  )
}