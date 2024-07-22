import { alpha, Box, Toolbar as MUIToolbar, Typography } from '@mui/material';
import { UpdateStatusDialog } from '../UpdateStatusDialog';
import { AddTrip } from '../AddTrip';

interface ToolbarProps {
    selectedTripIDs: string[];
}

export const Toolbar = ({ selectedTripIDs }: ToolbarProps) => {
    const selectedTripsCount = selectedTripIDs.length;
    return (
        <MUIToolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(selectedTripsCount > 0 && {
                    bgcolor: (theme) =>
                        alpha(
                            theme.palette.primary.main,
                            theme.palette.action.activatedOpacity
                        ),
                }),
            }}>
            {selectedTripsCount > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color='inherit'
                    variant='subtitle1'
                    component='div'>
                    {selectedTripsCount} selected
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant='h6'
                    id='tableTitle'
                    component='div'>
                    Trip List
                </Typography>
            )}

            <Box display='flex' gap='12px'>
                <UpdateStatusDialog selectedTripIDs={selectedTripIDs} />
                <AddTrip />
            </Box>
        </MUIToolbar>
    );
};
