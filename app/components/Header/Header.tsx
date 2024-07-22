'use client';

import { Box, Chip, Divider, Typography, useMediaQuery } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { PieChart } from '../PieChart';
import {
    filterDataByStatus,
    filterDataByTATStatus,
    findTATStatus,
} from '@/app/utils/dataUtils';
import { useAppContext } from '@/app/context/AppContext';
import { Filter } from '@/app/utils';

const StyledTypoGraphy = styled(Typography)(({ theme }) => ({
    fontSize: '16px',
    margin: theme.spacing(2),
}));

export const Header = () => {
    const {
        state: { currentFilter, totalTrips },
        updateFilter,
    } = useAppContext();

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('lg'));

    const tripsCount = totalTrips.length;

    const formattedData = totalTrips.map((data) => ({
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

    const totalDelivered = filterDataByStatus('DEL', totalTrips).length;

    const totalDeliveredPercentage = Math.round(
        (totalDelivered / tripsCount) * 100
    );

    const delayCount = filterDataByTATStatus('DELAYED', formattedData).length;

    const onTimeCount = filterDataByTATStatus('ON_TIME', formattedData).length;

    const inTransitCount = filterDataByStatus('INT', totalTrips).length;
    const inTransitPercentage = Math.round((inTransitCount / tripsCount) * 100);

    const handleFilterChange = (filter: Filter) => {
        updateFilter(filter);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                width: '100%',
                margin: '40px 0',
                flexDirection: fullScreen ? 'column' : 'row',
            }}
            component='section'>
            <Box
                sx={{
                    display: 'flex',
                    width: fullScreen ? '100%' : '40%',
                    justifyContent: 'space-between',
                    margin: '12px 30px 12px 6px',
                    alignItems: 'center',
                }}>
                <Box
                    component='div'
                    onClick={() => handleFilterChange('ALL')}
                    sx={{
                        cursor: 'pointer',
                        borderRadius: '10px',
                        ':hover': {
                            background: '#B3D1CF',
                        },
                        background:
                            currentFilter === 'ALL' ? '#B3D1CF' : 'inherit',
                    }}>
                    <StyledTypoGraphy
                        variant='subtitle1'
                        sx={{
                            color: '#666666',
                        }}>
                        Total Trips
                    </StyledTypoGraphy>
                    <StyledTypoGraphy
                        variant='body1'
                        sx={{ fontSize: '24px', fontWeight: '800' }}>
                        {tripsCount}
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
            {!fullScreen && (
                <Divider
                    orientation='vertical'
                    variant='middle'
                    flexItem
                    color='#E0E0E0'
                    sx={{
                        width: '1px',
                        margin: '35px 10px',
                    }}
                />
            )}
            <Box
                sx={{
                    display: 'flex',
                    width: fullScreen ? '100%' : '60%',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: '40%',
                        justifyContent: 'space-between',
                    }}>
                    <PieChart
                        onTimeTrips={onTimeCount}
                        delayedTrips={delayCount}
                        totalTrips={tripsCount}
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
                    sx={{ width: '1px', margin: '10px' }}
                />
                <Box
                    component='div'
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        width: '30%',
                        cursor: 'pointer',
                        borderTopLeftRadius: '10px',
                        borderBottomLeftRadius: '10px',
                        background:
                            currentFilter === 'INT' ? '#B3D1CF' : 'inherit',
                        ':hover': {
                            background: '#B3D1CF',
                        },
                    }}
                    onClick={() => handleFilterChange('INT')}>
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
                    sx={{ width: '1px', margin: '10px' }}
                />
                <Box
                    component='div'
                    onClick={() => handleFilterChange('DEL')}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        width: '30%',
                        cursor: 'pointer',
                        background:
                            currentFilter === 'DEL' ? '#B3D1CF' : 'inherit',
                        borderTopRightRadius: '10px',
                        borderBottomRightRadius: '10px',
                        ':hover': {
                            background: '#B3D1CF',
                        },
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
