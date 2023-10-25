import { render, fireEvent, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { mockedBike } from 'mocks/Bike'
import { SERVICE_FEE_PERCENTAGE } from './BikeDetails.contants'
import { getServicesFee } from './BikeDetails.utils'
import BikeDetails from './BikeDetails.component'

describe('BikeDetails page', () => {

  const mockBike = {
    id: 1,
    name: 'Sample Bike',
    // Add other properties as needed for testing
  };


  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(
      <BrowserRouter>
        <BikeDetails bike={mockedBike} />
      </BrowserRouter>,
    )
  })

  it('renders the BikeDetails component with a bike', () => {
    // Ensure that important elements are present
    expect(screen.getByText('Sample Bike')).toBeInTheDocument();
    expect(screen.getByTestId('bike-name-details')).toBeInTheDocument();
  });

  
  it('displays the booking calendar and handles booking', () => {

    // Check if the Booking Calendar is present
    expect(screen.getByTestId('bike-details-page')).toBeInTheDocument();

    // Check if the Add to Booking button is initially present
    expect(screen.getByTestId('bike-booking-button')).toBeInTheDocument();

    // Simulate a click on the Add to Booking button
    fireEvent.click(screen.getByTestId('bike-booking-button'));

    // Check if the dialog opens upon clicking the button
    expect(screen.getByText('Thank you!')).toBeInTheDocument();

    // Simulate closing the dialog
    fireEvent.click(screen.getByTestId('go-to-home-btn'));

    // Check if the dialog closes
    expect(screen.queryByText('Thank you!')).toBeNull();
  });

  it('should has a header', () => {
    const headerElement = screen.getByTestId('header')
    expect(headerElement).toBeInTheDocument()
  })

  it('should has breadcrumbs', () => {
    const breadcrumbsElement = screen.getByTestId('bike-details-breadcrumbs')
    expect(breadcrumbsElement).toBeInTheDocument()
  })

  it('should has the details container with the image selector, bike name, prices and a map', () => {
    const detailsContainerElement = screen.getByTestId('bike-details-container')
    expect(detailsContainerElement).toBeInTheDocument()

    const imageSelectorElement = screen.getByTestId('bike-image-selector')
    expect(imageSelectorElement).toBeInTheDocument()

    const nameElement = screen.getByTestId('bike-name-details')
    expect(nameElement).toBeInTheDocument()

    const pricesElement = screen.getByTestId('bike-prices-details')
    expect(pricesElement).toBeInTheDocument()

    const mapElement = screen.getByTestId('booking-address-map')
    expect(mapElement).toBeInTheDocument()
  })

  it('should has the overview container with the prices, total and booking button', () => {
    const overviewContainerElement = screen.getByTestId('bike-overview-container')
    expect(overviewContainerElement).toBeInTheDocument()

    const pricesElements = screen.getAllByTestId('bike-overview-single-price')
    expect(pricesElements).not.toBeNull()
    expect(pricesElements.length).toBe(2)

    const totalElement = screen.getByTestId('bike-overview-total')
    expect(totalElement).toBeInTheDocument()

    const bookingButtonElement = screen.getByTestId('bike-booking-button')
    expect(bookingButtonElement).toBeInTheDocument()
  })
})

describe('BikeDetails utils', () => {
  it('should gets the services fee properly', () => {
    const amount = 100
    const expectedAmount = amount * SERVICE_FEE_PERCENTAGE

    const result = getServicesFee(amount)
    expect(result).toEqual(expectedAmount)
  })
})
