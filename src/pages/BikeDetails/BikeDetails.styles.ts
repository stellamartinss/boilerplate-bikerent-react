import {
  Box,
  BoxProps,
  Button,
  ButtonProps,
  Card,
  CardProps,
  Dialog,
  DialogProps,
  IconButton,
  IconButtonProps,
  styled,
} from '@mui/material';
import FavoriteBorderOutlined from '@mui/icons-material/FavoriteBorderOutlined';
import ChevronRightOutlined from '@mui/icons-material/ChevronRightOutlined';
import HomeOutlined from '@mui/icons-material/HomeOutlined';
import InfoOutlined from '@mui/icons-material/InfoOutlined';

interface BikeImageProps extends BoxProps {
  isLoaded: boolean;
}

export const BreadcrumbContainer = styled(Box)<BoxProps>(({ theme }) => ({
  position: 'relative',
  margin: '32px 0 32px 100px',

  [theme.breakpoints.down('lg')]: {
    margin: '90px 0 32px 8vw',
  },
}));

export const BreadcrumbHome = styled(HomeOutlined)(({ theme }) => ({
  color: theme.palette.primary.light,
  fontSize: 24,
  fontWeight: 300,
}));

export const BreadcrumbSeparator = styled(ChevronRightOutlined)(
  ({ theme }) => ({
    color: theme.palette.primary.light,
    fontSize: 14,
    fontWeight: 300,
  })
);

export const Content = styled(Box)<BoxProps>(({ theme }) => ({
  padding: '0 100px 44px',
  position: 'relative',
  display: 'grid',
  gridTemplateColumns: '2fr 1fr',
  gap: 24,

  [theme.breakpoints.down('lg')]: {
    gridTemplateColumns: '1fr',
    padding: '0 20px 44px',
  },
}));

export const DetailsContainer = styled(Card)<CardProps>(({ theme }) => ({
  borderColor: theme.palette.grey[500],
  padding: 34,

  [theme.breakpoints.down('lg')]: {
    padding: 24,
  },
}));

export const LikeButton = styled(IconButton)<IconButtonProps>(({ theme }) => ({
  border: `1px solid ${theme.palette.grey[500]}`,
  borderRadius: 20,
  width: 60,
  height: 60,
}));

export const FavoriteIcon = styled(FavoriteBorderOutlined)(({ theme }) => ({
  color: theme.palette.common.black,
}));

export const InfoIcon = styled(InfoOutlined)(({ theme }) => ({
  color: theme.palette.grey[500],
}));

export const OverviewContainer = styled(Card)<CardProps>(({ theme }) => ({
  borderColor: theme.palette.grey[500],
  padding: 34,
  height: 'fit-content',
}));

export const BookingButton = styled(Button)<ButtonProps>(({ theme }) => ({
  borderRadius: 20,
  padding: '18px 0',
  marginTop: 30,
  textTransform: 'none',
  color: theme.palette.common.white,
  fontWeight: 800,
}));

export const PriceRow = styled(Box)<BoxProps>(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

export const BikeImage = styled('img', {
  shouldForwardProp: (prop) => prop !== 'isLoaded',
})<BikeImageProps>(({ isLoaded }) => ({
  display: isLoaded ? 'block' : 'none',
}));

export const BikeBookedBox = styled(Box)<BoxProps>(({ theme }) => ({
  margin: '40px',
  textAlign: 'center',
}));

export const GoToHomeButton = styled(Button)<ButtonProps>(({ theme }) => ({
  borderRadius: 20,
  padding: '18px 0',
  marginBottom: '30px',
  width: '100%',
  textTransform: 'none',
  color: theme.palette.common.white,
  backgroundColor: theme.palette.primary.main,
  fontWeight: 800,
}));

export const DivDesktopCalendar = styled('div')(({ theme }) => ({
  display: 'none',

  [theme.breakpoints.up('md')]: {
    display: 'block',
  },
}));

