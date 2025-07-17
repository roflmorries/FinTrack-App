import { Goal } from '../../entities/fin-goals/types'
import { Button, Popover } from '@mui/material'
import { useState, useMemo } from 'react'
import { Edit, Delete, CalendarToday, AttachMoney } from '@mui/icons-material'
import dayjs from 'dayjs'
import { useAppSelector } from '../../shared/lib/hooks/redux/reduxTypes'
import { selectGoalProgress } from '../../entities/fin-goals/goalProgressSelector'
import { StyledCard, CardContent, CardHeader, GoalInfo, StatusBadge, GoalName, GoalDetails, DetailRow, ProgressSection, ProgressInfo, ProgressText, ProgressPercentage, ButtonsContainer, StyledIconButton, PopoverContent, StyledLinearProgress } from '../../shared/ui/Goals/GoalCard.styled'

type GoalCardProps = Goal & {
  onEdit: (id: string) => void,
  onDelete: (id: string) => void
}

type GoalStatus = 'active' | 'completed' | 'outdated';


export default function GoalCard({onEdit, onDelete, ...goal}: GoalCardProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const progress = useAppSelector(state => selectGoalProgress(state, goal.id));

  const { status, progressPercent, daysLeft } = useMemo(() => {
    const progressPercent = goal.amount > 0 ? Math.min((progress / goal.amount) * 100, 100) : 0;
    const isCompleted = progress >= goal.amount;
    const isExpired = dayjs().isAfter(dayjs(goal.deadline));
    const daysLeft = dayjs(goal.deadline).diff(dayjs(), 'day');
    
    let status: GoalStatus = 'active';
    if (isCompleted) {
      status = 'completed';
    } else if (isExpired) {
      status = 'outdated';
    }
    
    return { status, progressPercent, daysLeft };
  }, [progress, goal.amount, goal.deadline]);

  const getStatusText = () => {
    switch (status) {
      case 'completed':
        return '✅ Completed';
      case 'outdated':
        return '⏰ Outdated';
      default:
        return `🎯 Active (${daysLeft > 0 ? `${daysLeft} days left` : 'Due today'})`;
    }
  };

  const handleDeleteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    onDelete(goal.id);
    handleClose();
  };

  const open = Boolean(anchorEl);

  return (
    <StyledCard $status={status}>
      <CardContent>
        <CardHeader>
          <GoalInfo>
            <GoalName>{goal.name}</GoalName>
          </GoalInfo>
          <StatusBadge $status={status}>
            {getStatusText()}
          </StatusBadge>
        </CardHeader>

        <GoalDetails>
          <DetailRow>
            <AttachMoney />
            <span>Target: ${goal.amount.toLocaleString()}</span>
          </DetailRow>
          <DetailRow>
            <CalendarToday />
            <span>Deadline: {dayjs(goal.deadline).format('MMM DD, YYYY')}</span>
          </DetailRow>
        </GoalDetails>

        <ProgressSection>
          <ProgressInfo>
            <ProgressText>
              ${progress.toLocaleString()} / ${goal.amount.toLocaleString()}
            </ProgressText>
            <ProgressPercentage $status={status}>
              {Math.round(progressPercent)}%
            </ProgressPercentage>
          </ProgressInfo>
          
          <StyledLinearProgress 
            variant="determinate" 
            value={progressPercent}
            $status={status}
          />
        </ProgressSection>

        <ButtonsContainer>
          <StyledIconButton 
            $variant="edit"
            onClick={() => onEdit(goal.id)}
          >
            <Edit />
          </StyledIconButton>
          
          <StyledIconButton 
            $variant="delete"
            onClick={handleDeleteClick}
          >
            <Delete />
          </StyledIconButton>
          
          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
          >
            <PopoverContent>
              <div className="popover-text">
                Удаление цели не повлияет на ваши транзакции и баланс.
              </div>
              <div className="popover-buttons">
                <Button 
                  variant="contained" 
                  color="error"
                  size="small"
                  onClick={handleDelete}
                  sx={{
                    textTransform: 'none',
                    fontSize: '12px'
                  }}
                >
                  Delete
                </Button>
                <Button 
                  variant="outlined" 
                  size="small" 
                  onClick={handleClose}
                  sx={{
                    textTransform: 'none',
                    fontSize: '12px',
                    color: 'rgba(255, 255, 255, 0.8)',
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                    '&:hover': {
                      borderColor: 'rgba(255, 255, 255, 0.5)',
                      color: '#fff'
                    }
                  }}
                >
                  Cancel
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </ButtonsContainer>
      </CardContent>
    </StyledCard>
  );
}