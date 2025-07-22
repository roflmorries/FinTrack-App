import { Category } from '../../entities/categories/model/types';
import { Edit, Delete } from '@mui/icons-material';
import { StyledCard, CardContent, ColorIndicator, CategoryInfo, CategoryName, ButtonsContainer, ActionButton } from '../../shared/ui/Category/categoryCard.styled';

type CategoryCardProps = Category & {
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}


export default function CategoryCard({ onEdit, onDelete, ...category }: CategoryCardProps) {
  return (
    <StyledCard $color={category.color}>
      <CardContent>
        <CategoryInfo>
          <ColorIndicator $color={category.color} />
          <CategoryName $color={category.color}>
            {category.name}
          </CategoryName>
        </CategoryInfo>
        
        <ButtonsContainer>
          <ActionButton 
            $variant="edit"
            onClick={() => onEdit(category.id)}
          >
            <Edit />
          </ActionButton>
          <ActionButton 
            $variant="delete"
            onClick={() => onDelete(category.id)}
          >
            <Delete />
          </ActionButton>
        </ButtonsContainer>
      </CardContent>
    </StyledCard>
  );
}