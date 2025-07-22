import { Category } from '../../entities/categories/model/types';
import { CategoriesContainer, ContentWrapper, Header, Title, EmptyState, CountBadge, CategoriesGrid } from '../../shared/ui/Category/categoryList.styled';
import CategoryCard from './CategoryCard';


type CategoriesListProps = {
  items: Category[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}


export default function CategoriesList({ items, onEdit, onDelete }: CategoriesListProps) {
  if (items.length === 0) {
    return (
      <CategoriesContainer>
        <ContentWrapper>
          <Header>
          </Header>
          <EmptyState>
            <div className="empty-icon">🏷️</div>
            <div className="empty-text">No categories yet</div>
            <div className="empty-subtext">Create your first category to organize transactions</div>
          </EmptyState>
        </ContentWrapper>
      </CategoriesContainer>
    );
  }

  return (
    <CategoriesContainer>
      <ContentWrapper>
        <Header>
          <CountBadge>{items.length} categor{items.length === 1 ? 'y' : 'ies'}</CountBadge>
        </Header>
        
        <CategoriesGrid>
          {items.map(item => (
            <CategoryCard key={item.id} onEdit={onEdit} onDelete={onDelete} {...item} />
          ))}
        </CategoriesGrid>
      </ContentWrapper>
    </CategoriesContainer>
  );
}