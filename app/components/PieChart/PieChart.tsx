import * as React from 'react';
import { PieChart as MUIPieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

const data = [
    { value: 80, label: 'On-time' },
    { value: 20, label: 'delay' },
];

const size = {
    width: 150,
    height: 150,
};

const StyledText = styled('text')(({ theme }) => ({
    fill: theme.palette.text.primary,
    textAnchor: 'middle',
    dominantBaseline: 'central',
    fontSize: 20,
}));

const PieCenterLabel = ({ children }: { children: React.ReactNode }) => {
    const { width, height, left, top } = useDrawingArea();
    return (
        <StyledText x={left + width / 2 - 13} y={top + height / 2 + 5}>
            {children}
        </StyledText>
    );
};

type PieChartProps = {
    onTimeTrips: number;
    totalTrips: number;
};

export const PieChart = ({ onTimeTrips, totalTrips }: PieChartProps) => {
    const onTimeTripsPercentage = Math.round((onTimeTrips / totalTrips) * 100);
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                marginLeft: '10px',
                justifyContent: 'center',
            }}>
            <MUIPieChart
                series={[{ data, innerRadius: 40, outerRadius: 50, cx: '50%' }]}
                colors={['#00c28b', 'white']}
                slotProps={{
                    legend: { hidden: true },
                }}
                viewBox={{ x: -50, y: 0, width: 150, height: 150 }}
                {...size}>
                <PieCenterLabel>{onTimeTripsPercentage}%</PieCenterLabel>
            </MUIPieChart>
            <Box>
                <Typography>
                    Ontime:{' '}
                    <Typography variant='caption' color='#0057D1'>
                        {onTimeTrips}
                    </Typography>
                </Typography>
            </Box>
        </Box>
    );
};
