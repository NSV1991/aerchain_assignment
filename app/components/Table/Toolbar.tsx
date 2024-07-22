import {
    alpha,
    Box,
    IconButton,
    Toolbar as MUIToolbar,
    Tooltip,
    Typography,
} from '@mui/material';
import { UpdateStatusDialog } from '../UpdateStatusDialog';
import { AddTrip } from '../AddTrip';
import DeleteIcon from '@mui/icons-material/Delete';

interface ToolbarProps {
    numSelected: number;
}

export const Toolbar = ({ numSelected }: ToolbarProps) => {
    return (
        <MUIToolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(
                            theme.palette.primary.main,
                            theme.palette.action.activatedOpacity
                        ),
                }),
            }}>
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color='inherit'
                    variant='subtitle1'
                    component='div'>
                    {numSelected} selected
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
                <UpdateStatusDialog disabled={numSelected <= 0} />
                <AddTrip />
            </Box>
        </MUIToolbar>
    );
};
