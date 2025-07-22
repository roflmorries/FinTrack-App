import dayjs from 'dayjs';
import Button from '@mui/material/Button';
import CalendarTodayRoundedIcon from '@mui/icons-material/CalendarTodayRounded';

export default function CustomDatePicker() {
  const today = dayjs();

  return (
    <Button
      variant="outlined"
      size="small"
      startIcon={<CalendarTodayRoundedIcon fontSize="small" />}
      sx={{ minWidth: 'fit-content', borderRadius: '24px' }}
    >
      {today.format('MMM DD, YYYY')}
    </Button>
  );
}