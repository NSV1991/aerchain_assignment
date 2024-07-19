'use client';

import { Box, Chip, Divider, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { PieChart } from '../PieChart';

const StyledTypoGraphy = styled(Typography)(({ theme }) => ({
    fontSize: '16px',
    margin: theme.spacing(2),
}));

export const Header = () => {
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
                        10,883
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
                        10,883
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
                    <PieChart />
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
                                10,883
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
                            10,883
                        </StyledTypoGraphy>
                        <Chip
                            label='72%'
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
                            10,883
                        </StyledTypoGraphy>
                        <Chip
                            label='72%'
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
