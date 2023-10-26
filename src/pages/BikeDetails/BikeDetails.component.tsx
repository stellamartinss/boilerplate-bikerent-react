import {
  Box,
  Breadcrumbs,
  Dialog,
  Divider,
  Link,
  Typography,
} from '@mui/material';
import BikeImageSelector from 'components/BikeImageSelector';
import BikeSpecs from 'components/BikeSpecs';
import BikeType from 'components/BikeType';
import BookingAddressMap from 'components/BookingAddressMap';
import Header from 'components/Header';
import Bike from 'models/Bike';
import { getServicesFee } from './BikeDetails.utils';
import {
  BikeBookedBox,
  BikeImage,
  BookingButton,
  BreadcrumbContainer,
  BreadcrumbHome,
  BreadcrumbSeparator,
  Content,
  DetailsContainer,
  DivDesktopCalendar,
  FavoriteIcon,
  GoToHomeButton,
  InfoIcon,
  LikeButton,
  OverviewContainer,
  PriceRow,
} from './BikeDetails.styles';
import BookingCalendar from 'components/BookingCalendar/BookingCalendar.component';
import { DateRange } from 'react-day-picker';
import { useEffect, useState } from 'react';
import { addDays } from 'date-fns';
import apiClient from 'services/api';

const pastMonth = new Date();

interface BikeDetailsProps {
  bike?: Bike;
}

const BikeDetails = ({ bike }: BikeDetailsProps) => {
  const ratesByDay = bike?.rate || 0;
  
  const rateByWeek = ratesByDay * 7;
  const today = new Date();

  const servicesFee = getServicesFee(ratesByDay);

  const defaultSelected: DateRange = {
    from: pastMonth,
    to: addDays(pastMonth, 4),
  };

  const [dateRange, setDateRange] = useState<DateRange | undefined | any>(
    defaultSelected
  );
  const [rangeDaysCount, setRangeDaysCount] = useState<number>(4);
  const [subtotal, setSubTotal] = useState<number>(bike?.rate || 0);
  const [total, setTotal] = useState<number>(ratesByDay + servicesFee);
  const [isBikeBooked, setIsBikeBooked] = useState(false);
  const [openIsBookedDialog, setOpenoIsBookedDialog] = useState(false);
  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const totalDays = calculateHowManyBookingDays(dateRange);
    const sTotal = ratesByDay * totalDays;

    setRangeDaysCount(totalDays);
    setSubTotal(sTotal);
    setTotal(sTotal + servicesFee);
  }, [dateRange, ratesByDay, servicesFee]);

  const handleWindowWidth = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleWindowWidth);
    return () => {
      window.removeEventListener('resize', handleWindowWidth);
    };
  }, []);

  const handleBookingBike = () => {
    const saveBooking = async () => {
      const data = {
        userId: 1,
        bikeId: bike?.id,
        rate: bike?.rate,
        price: subtotal,
        to: dateRange.to,
        from: dateRange.from
      };
      const response = await apiClient.post('/bike/rent', data);

      if (response) {
        setOpenoIsBookedDialog(true);
        setIsBikeBooked(true);
      }
    };

    saveBooking();
  };

  const calculateHowManyBookingDays = (range: any) => {
    const fromDate: any = new Date(range.from);
    const toDate: any = new Date(range.to);

    const timeDifference = toDate - fromDate;

    const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

    return daysDifference;
  };

  const bikeBooked = (
    <BikeBookedBox>
      <Typography marginTop={1.5} fontSize={24} fontWeight={800}>
        Thank you!
      </Typography>
      <Typography marginTop={2} marginBottom={5} fontSize={16} fontWeight={400}>
        Your bike is booked
      </Typography>

      {bike && (
        <>
          <BikeImage
            src={bike.imageUrls[0]}
            width='100%'
            alt='Bike Image'
            data-testid='bike-image'
            isLoaded={true}
          />

          <Typography marginTop={5} fontSize={18} fontWeight={600}>
            {bike.name}
          </Typography>

          <BikeType type={bike.type} />
        </>
      )}
    </BikeBookedBox>
  );

  const desktopBooked = <DivDesktopCalendar>{bikeBooked}</DivDesktopCalendar>;

  const mobileBikeBooked = (
    <Dialog open={openIsBookedDialog}>
      {bikeBooked}

      <Link href='/' data-testid='go-to-home-btn'>
        <GoToHomeButton
          fullWidth
          disableElevation
          variant='contained'
          data-testid='bike-select'
          color='secondary'
        >
          Go to Home Page
        </GoToHomeButton>
      </Link>
    </Dialog>
  );

  return (
    <div data-testid='bike-details-page'>
      <Header />

      <BreadcrumbContainer data-testid='bike-details-breadcrumbs'>
        <Breadcrumbs separator={<BreadcrumbSeparator />}>
          <Link
            underline='hover'
            display='flex'
            alignItems='center'
            color='white'
            href='/'
          >
            <BreadcrumbHome />
          </Link>

          <Typography fontWeight={800} letterSpacing={1} color='white'>
            {bike?.name}
          </Typography>
        </Breadcrumbs>
      </BreadcrumbContainer>

      <Content>
        <DetailsContainer
          variant='outlined'
          data-testid='bike-details-container'
        >
          {!!bike?.imageUrls && (
            <BikeImageSelector imageUrls={bike.imageUrls} />
          )}

          <BikeSpecs
            bodySize={bike?.bodySize}
            maxLoad={bike?.maxLoad}
            ratings={bike?.ratings}
          />

          <Divider />

          <Box marginY={2.25}>
            <Box
              display='flex'
              alignItems='center'
              justifyContent='space-between'
            >
              <div>
                <Typography
                  variant='h1'
                  fontSize={38}
                  fontWeight={800}
                  marginBottom={0.5}
                  data-testid='bike-name-details'
                >
                  {bike?.name}
                </Typography>

                <BikeType type={bike?.type} />
              </div>

              <LikeButton>
                <FavoriteIcon />
              </LikeButton>
            </Box>

            <Typography marginTop={1.5} fontSize={14}>
              {bike?.description}
            </Typography>
          </Box>

          <Divider />

          <Box marginY={2.25} data-testid='bike-prices-details'>
            <PriceRow>
              <Typography>Day</Typography>
              <Typography fontWeight={800} fontSize={24} letterSpacing={1}>
                {ratesByDay} €
              </Typography>
            </PriceRow>

            <PriceRow>
              <Typography>Week</Typography>
              <Typography fontWeight={800} fontSize={24} letterSpacing={1}>
                {rateByWeek} €
              </Typography>
            </PriceRow>
          </Box>

          <Divider />

          <Box marginTop={3.25}>
            <Typography variant='h1' fontSize={24} fontWeight={800}>
              Full adress after booking
            </Typography>

            <BookingAddressMap />
          </Box>
        </DetailsContainer>

        <OverviewContainer
          variant='outlined'
          data-testid='bike-overview-container'
        >
          {screenWidth <= 899 && mobileBikeBooked}

          {isBikeBooked && desktopBooked}

          {!isBikeBooked && (
            <>
              <BookingCalendar
                dateRange={dateRange}
                setDateRange={setDateRange}
                pastMonth={pastMonth}
                selected={today}
                bike={bike}
              />

              <Typography variant='h2' fontSize={16} marginBottom={1.25}>
                Booking Overview
              </Typography>
              <Divider />
              <PriceRow
                marginTop={1.75}
                data-testid='bike-overview-single-price'
              >
                <Box display='flex' alignItems='center'>
                  <Typography marginRight={1}>Subtotal</Typography>
                  <InfoIcon fontSize='small' />
                </Box>

                <Typography>{subtotal} €</Typography>
              </PriceRow>
              <PriceRow
                marginTop={1.5}
                data-testid='bike-overview-single-price'
              >
                <Box display='flex' alignItems='center'>
                  <Typography marginRight={1}>Service Fee</Typography>
                  <InfoIcon fontSize='small' />
                </Box>

                <Typography>{servicesFee} €</Typography>
              </PriceRow>
              <PriceRow marginTop={1.75} data-testid='bike-overview-total'>
                <Typography fontWeight={800} fontSize={16}>
                  Total
                </Typography>
                <Typography variant='h2' fontSize={24} letterSpacing={1}>
                  {total} €
                </Typography>
              </PriceRow>
              <BookingButton
                fullWidth
                disableElevation
                variant='contained'
                data-testid='bike-booking-button'
                onClick={() => handleBookingBike()}
              >
                Add to booking
              </BookingButton>
            </>
          )}
        </OverviewContainer>
      </Content>
    </div>
  );
};

export default BikeDetails;
