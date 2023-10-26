import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import BookingCalendar from './BookingCalendar.component';
import { BrowserRouter } from 'react-router-dom';

describe('BookingCalendar', () => {
  const dateRange = {
    from: new Date('2023-10-01'),
    to: new Date('2023-10-10'),
  };
  const setDateRange = jest.fn();
  const pastMonth = false;
  const bike = 'Some Bike';

  it('renders the component with provided props', () => {
    const { getByText, getByTestId } = render(
      <BrowserRouter>
        <BookingCalendar
          dateRange={dateRange}
          setDateRange={setDateRange}
          pastMonth={pastMonth}
          bike={bike}
        />
      </BrowserRouter>
    );

    expect(getByText('Select date and time')).toBeInTheDocument();

    expect(getByTestId('bike-select')).toBeInTheDocument();
  });

  it('displays mobile calendar when the button is clicked', () => {
    const originalInnerWidth = window.innerWidth;

    window.innerWidth = 320;

    const { getByText, getByTestId } = render(
      <BrowserRouter>
        <BookingCalendar
          dateRange={dateRange}
          setDateRange={setDateRange}
          pastMonth={pastMonth}
          bike={bike}
        />
      </BrowserRouter>
    );

    expect(getByText('Select date and time')).toBeInTheDocument();
    expect(setDateRange).not.toHaveBeenCalled();

    const mobileDateButton = getByTestId('mobile-date-button');
    fireEvent.click(mobileDateButton);

    expect(getByText('Select date and time')).toBeInTheDocument();
    expect(setDateRange).not.toHaveBeenCalled();

    window.innerWidth = originalInnerWidth;
  });
});
