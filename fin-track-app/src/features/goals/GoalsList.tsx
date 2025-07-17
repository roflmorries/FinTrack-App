import { Goal } from '../../entities/fin-goals/types'
import GoalCard from './GoalCard'
import { GoalsContainer, ContentWrapper, Header, Title, EmptyState, CountBadge, GoalsGrid } from '../../shared/ui/Goals/GoalsList.styled';

type GoalsListProps = {
  items: Goal[],
  onEdit: (id: string) => void,
  onDelete: (id: string) => void,
}

export default function GoalsList({ items, onEdit, onDelete }: GoalsListProps) {
  if (items.length === 0) {
    return (
      <GoalsContainer>
        <ContentWrapper>
          <Header>
            <Title>Financial Goals</Title>
          </Header>
          <EmptyState>
            <div className="empty-icon">🎯</div>
            <div className="empty-text">No goals yet</div>
            <div className="empty-subtext">Create your first financial goal to start tracking progress</div>
          </EmptyState>
        </ContentWrapper>
      </GoalsContainer>
    );
  }

  return (
    <GoalsContainer>
      <ContentWrapper>
        <Header>
          <Title>Financial Goals</Title>
          <CountBadge>{items.length} goal{items.length === 1 ? '' : 's'}</CountBadge>
        </Header>
        
        <GoalsGrid>
          {items.map(item => (
            <GoalCard key={item.id} onEdit={onEdit} onDelete={onDelete} {...item}/>
          ))}
        </GoalsGrid>
      </ContentWrapper>
    </GoalsContainer>
  );
}