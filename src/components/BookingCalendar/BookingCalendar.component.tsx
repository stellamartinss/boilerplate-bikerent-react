import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import {
  BookingCalendarDesktop,
  MobileDateViewer,
  DividerSwipe,
  DividerSwipeDiv,
  CalendarIcon,
  SelectButton,
  DivDesktopCalendar,
  DivMobileCalendar,
} from './BookingCalendar.styles';
import './utils/daypicker.css';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import moment from 'moment';

const BookingCalendar = ({ dateRange, setDateRange, pastMonth, bike }: any) => {

  const today = new Date()

  let footer = (
    <DivMobileCalendar>
      <SelectButton
        fullWidth
        disableElevation
        variant='contained'
        data-testid='bike-select'
        color='secondary'
        onClick={() => setDisplayMobileCalendar(false)}
      >
        Select
      </SelectButton>
    </DivMobileCalendar>
  );
  const [displayMobileCalendar, setDisplayMobileCalendar] = useState(false);

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

  const calendar = (
    <BookingCalendarDesktop
      id='test'
      mode='range'
      defaultMonth={pastMonth}
      selected={dateRange}
      footer={footer}
      onSelect={(e: any) => {
        if(!e.to || !e.from) {
          return
        }

        setDateRange(e)
      }}
      captionLayout='dropdown-buttons'
      fromMonth={today}
      fromYear={today.getFullYear()}
      toYear={today.getFullYear() + 3}
    />
  );

  const mobileDateButton = (
    <MobileDateViewer onClick={() => setDisplayMobileCalendar(true)}>
      <CalendarIcon />
      <>
        From {moment(dateRange.from).format('MMM/YYYY')} to{' '}
        {moment(dateRange.to).format('MMM/YYYY')}
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
        {calendar}
      </SwipeableDrawer>
    </>
  );

  return (
    <>
      <Typography variant='h1' fontSize={24} marginBottom={1.25}>
        Select date and time
      </Typography>

      <DivMobileCalendar>
        {mobileDateButton}
        {mobile}
      </DivMobileCalendar>
      <DivDesktopCalendar>{calendar}</DivDesktopCalendar>
    </>
  );
};

export default BookingCalendar;
