import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { addDays, format } from 'date-fns';
import { DateRange, DayPicker } from 'react-day-picker';
import {
  BookingCalendarMobile,
  BookingCalendarDesktop,
  MobileDateViewer,
  DividerSwipe,
  DividerSwipeDiv,
  CalendarIcon,
} from './BookingCalendar.styles';
import './calendar-style.css';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import moment from 'moment';

const pastMonth = new Date(2020, 10, 15);

const BookingCalendar = () => {
  const today = new Date();

  const defaultSelected: DateRange = {
    from: pastMonth,
    to: addDays(pastMonth, 4),
  };

  const [range, setRange] = useState<DateRange | undefined | any>(
    defaultSelected
  );

  let footer = '';
  const [selectedDay, setSelectedDay] = useState<Date | any>(today);
  const [displayMobileCalendar, setDisplayMobileCalendar] = useState(false);

  useEffect(() => {
    console.log(range);
  }, [range]);

  const toggleDrawer =
    (anchor: any, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setDisplayMobileCalendar(!displayMobileCalendar);
    };
  debugger;
  const mobileDateButton = (
    <MobileDateViewer onClick={() => setDisplayMobileCalendar(true)}>
      <CalendarIcon />
      <>
        From {moment(range.from).format('MMM/YYYY')} to { moment(range.to).format('MMM/YYYY')}
      </>
    </MobileDateViewer>
  );

  const mobile = (
    <>
      <SwipeableDrawer
        anchor={'bottom'}
        open={displayMobileCalendar}
        onClose={toggleDrawer('bottom', false) as any}
        onOpen={toggleDrawer('bottom', false) as any}
      >
        <DividerSwipeDiv
          onClick={() => {
            setDisplayMobileCalendar(false);
          }}
        >
          <DividerSwipe variant='middle' />
        </DividerSwipeDiv>
        <BookingCalendarMobile
          id='test'
          mode='range'
          className='mobile'
          defaultMonth={pastMonth}
          selected={range}
          footer={footer}
          onSelect={setRange}
        />
      </SwipeableDrawer>
    </>
  );

  const desktop = (
    <BookingCalendarDesktop
      id='test'
      mode='range'
      defaultMonth={pastMonth}
      selected={range}
      footer={footer}
      onSelect={setRange}
    />
  );

  return (
    <>
      <Typography variant='h1' fontSize={24} marginBottom={1.25}>
        Select date and time
      </Typography>

      {mobileDateButton}
      {mobile}
      {desktop}
    </>
  );
};

export default BookingCalendar;
