'use client';

import { Box, Chip, Divider, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { PieChart } from '../PieChart';
import { findTATStatus } from '@/app/utils/dataUtils';
import { useAppContext } from '@/app/context/AppContext';

const StyledTypoGraphy = styled(Typography)(({ theme }) => ({
    fontSize: '16px',
    margin: theme.spacing(2),
}));

export const Header = () => {
    const {
        state: { trips },
    } = useAppContext();

    const totalTrips = trips.length;

    const totalDelivered = trips.filter(
        (trip) => trip.currentStatus === 'Delivered'
    ).length;

    const totalDeliveredPercentage = Math.round(
        (totalDelivered / totalTrips) * 100
    );

    const formattedData = trips.map((data) => ({
        tripId: data.tripId,
        transporter: data.transporter,
        source: data.source,
        destination: data.dest,
        phone: data.phoneNumber,
        eta: data.tripEndTime,
        distanceRemaining: data.distanceRemaining,
        tripStatus: data.currentStatus,
        tatStatus: findTATStatus(data),
    }));

    const delayCount = formattedData.filter(
        (trip) => trip.tatStatus === 'Delayed'
    ).length;

    const onTimeCount = formattedData.filter(
        (trip) => trip.tatStatus === 'On time'
    ).length;

    const inTransitCount = onTimeCount + delayCount;
    const inTransitPercentage = Math.round((inTransitCount / totalTrips) * 100);
    return (
        <Box
            sx={{
                display: 'flex',
                width: '100%',
                margin: '40px 0',
            }}
            component='section'>
            <Box
                sx={{
                    display: 'flex',
                    width: '40%',
                    justifyContent: 'space-between',
                    margin: '12px 30px 12px 6px',
                    alignItems: 'center',
                }}>
                <Box>
                    <StyledTypoGraphy
                        variant='subtitle1'
                        sx={{ color: '#666666' }}>
                        Total Trips
                    </StyledTypoGraphy>
                    <StyledTypoGraphy
                        variant='body1'
                        sx={{ fontSize: '24px', fontWeight: '800' }}>
                        {totalTrips}
                    </StyledTypoGraphy>
                </Box>
                <Box>
                    <StyledTypoGraphy
                        variant='subtitle1'
                        sx={{ color: '#666666' }}>
                        Delivered
                    </StyledTypoGraphy>
                    <StyledTypoGraphy
                        variant='body1'
                        sx={{ fontSize: '24px', fontWeight: '800' }}>
                        {totalDelivered}
                    </StyledTypoGraphy>
                </Box>
            </Box>
            <Divider
                orientation='vertical'
                variant='middle'
                flexItem
                color='#E0E0E0'
                sx={{ width: '1px', marginTop: '35px', marginBottom: '35px' }}
            />
            <Box
                sx={{
                    display: 'flex',
                    width: '60%',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: '40%',
                        margin: '0 20px',
                        justifyContent: 'space-between',
                    }}>
                    <PieChart
                        onTimeTrips={onTimeCount}
                        totalTrips={totalTrips}
                    />
                    <Box>
                        <StyledTypoGraphy
                            variant='subtitle1'
                            sx={{ color: '#CC3333' }}>
                            Delayed
                        </StyledTypoGraphy>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <StyledTypoGraphy
                                variant='body1'
                                sx={{ fontWeight: '800' }}>
                                {delayCount}
                            </StyledTypoGraphy>
                        </Box>
                    </Box>
                </Box>
                <Divider
                    orientation='vertical'
                    variant='middle'
                    flexItem
                    color='#CC3333'
                    sx={{ width: '1px' }}
                />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        width: '30%',
                    }}>
                    <StyledTypoGraphy
                        variant='subtitle1'
                        sx={{ color: '#666666' }}>
                        In-transit
                    </StyledTypoGraphy>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <StyledTypoGraphy
                            variant='body1'
                            sx={{ fontWeight: '800' }}>
                            {inTransitCount}
                        </StyledTypoGraphy>
                        <Chip
                            label={`${inTransitPercentage}%`}
                            sx={{
                                marginLeft: '8px',
                                background: '#D7E3FE',
                                color: '#24428A',
                                borderRadius: '4px',
                            }}
                        />
                    </Box>
                </Box>
                <Divider
                    orientation='vertical'
                    variant='middle'
                    flexItem
                    color='#E0E0E0'
                    sx={{ width: '1px' }}
                />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        width: '30%',
                    }}>
                    <StyledTypoGraphy
                        variant='subtitle1'
                        sx={{ color: '#666666', width: '40%' }}>
                        Delivered
                    </StyledTypoGraphy>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <StyledTypoGraphy
                            variant='body1'
                            sx={{ fontWeight: '800' }}>
                            {totalDelivered}
                        </StyledTypoGraphy>
                        <Chip
                            label={`${totalDeliveredPercentage}%`}
                            sx={{
                                marginLeft: '8px',
                                background: '#D7E3FE',
                                color: '#24428A',
                                borderRadius: '4px',
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};
