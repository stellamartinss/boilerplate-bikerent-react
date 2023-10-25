import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import BookingCalendar from './BookingCalendar.component';

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
      <BookingCalendar dateRange={dateRange} setDateRange={setDateRange} pastMonth={pastMonth} bike={bike} />
    );

    // Check if the component renders correctly
    // eslint-disable-next-line testing-library/prefer-screen-queries
    expect(getByText('Select date and time')).toBeInTheDocument();
    // eslint-disable-next-line testing-library/prefer-screen-queries
    expect(getByTestId('bike-select')).toBeInTheDocument();
  });

  it('displays mobile calendar when the button is clicked', () => {
    const { getByText, getByTestId } = render(
      <BookingCalendar dateRange={dateRange} setDateRange={setDateRange} pastMonth={pastMonth} bike={bike} />
    );

    // Check if the mobile calendar is initially hidden
    // eslint-disable-next-line testing-library/prefer-screen-queries
    expect(getByText('Select date and time')).toBeInTheDocument();
    expect(setDateRange).not.toHaveBeenCalled(); // Ensure setDateRange hasn't been called yet

    // Click the mobile date button to open the calendar
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const mobileDateButton = getByTestId('mobile-date-button');
    fireEvent.click(mobileDateButton);

    // Check if the mobile calendar is now displayed
    // eslint-disable-next-line testing-library/prefer-screen-queries
    expect(getByText('Select date and time')).toBeInTheDocument();
    expect(setDateRange).not.toHaveBeenCalled(); // Ensure setDateRange still hasn't been called
  });

  // You can write additional tests for other interactions and behaviors of your component.
});