import { DayPicker, DayPickerProps } from 'react-day-picker';

import {
  Box,
  BoxProps,
  Button,
  ButtonProps,
  Chip,
  ChipProps,
  Divider,
  DividerProps,
  Icon,
  IconProps,
  SwipeableDrawer,
  SwipeableDrawerProps,
  styled,
} from '@mui/material';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';


export const BookingCalendarDesktop = styled(DayPicker)<DayPickerProps>(
  ({ theme }) => ({
    display: 'none', // Hide by default on all screens

    // Display block on screens larger than 'sm'
    [theme.breakpoints.up('md')]: {
      display: 'block',
    },
    // display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    padding: '10px 20px 20px 20px',
    borderRadius: '30px',
    marginBottom: '40px',
  })
);

export const BookingCalendarMobile = styled(DayPicker)<DayPickerProps>(
  ({ theme }) => ({
    display: 'none', // Hide by default on all screens

    // Display block on screens smaller than 'sm'
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#fff',
    padding: '10px 20px 20px 20px',
    borderRadius: '30px',
    marginBottom: '40px',
  })
);

export const BookingSwipeCalendarMobile = styled(
  SwipeableDrawer
)<SwipeableDrawerProps>(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
}));

export const MobileDateViewer = styled('div')<any>(({ theme }) => ({
  marginBottom: '20px',
  borderRadius: 16,
  textTransform: 'none',
  fontSize: 14,
  border: '1px solid #EDEDED',
  paddingRight: '10px',
  paddingLeft: '10px',
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  paddingTop: 20,
  paddingBottom: 20,
}));

export const DividerSwipe = styled(Divider)<DividerProps>(({ theme }) => ({
  backgroundColor: 'white',
  paddingTop: '5px',
  marginTop: '5px',
  borderRadius: '20px',
  width: '50px',
  display: 'inline-block',
}));

export const DividerSwipeDiv = styled(Box)<BoxProps>(({ theme }) => ({
  textAlign: 'center',
}));

export const CalendarIcon = styled(
  CalendarMonthOutlinedIcon
)<any>(({ theme }) => ({
    marginRight: 2,
    color: theme.palette.primary.main
}));
