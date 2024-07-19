'use client';

import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    MenuItem,
    TextField,
    useMediaQuery,
    useTheme,
} from '@mui/material';

import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2, 4),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(2, 4),
        'margin-left': 0,
    },
    '& .MuiPaper-root': {
        'max-width': '800px',
        'border-radius': '12px',
    },
}));

const deliveryServices = [
    {
        value: 'blue_dart',
        label: 'Blue dart',
    },
    {
        value: 'dtdc',
        label: 'DTDC',
    },
    {
        value: 'delhivery',
        label: 'Delhivery',
    },
    {
        value: 'merks',
        label: 'Merks',
    },
];

export const AddTrip = () => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [isOpen, setIsOpen] = useState(false);

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleModalOpen = () => {
        setIsOpen(true);
    };

    return (
        <>
            <Button
                variant='contained'
                sx={{
                    width: '150px',
                    borderRadius: '8px',
                    textTransform: 'none',
                    fontWeight: '400',
                }}
                onClick={handleModalOpen}
                disableRipple>
                Add Trip
            </Button>
            <BootstrapDialog
                fullScreen={fullScreen}
                open={isOpen}
                onClose={handleClose}
                aria-labelledby='add-trip-dialog'>
                <DialogTitle id='add-trip-dialog'>Add Trip</DialogTitle>
                <IconButton
                    aria-label='close'
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}>
                    <CloseIcon />
                </IconButton>
                <DialogContent sx={{ borderRadius: '8px' }}>
                    <Box
                        component='form'
                        sx={{
                            '& .MuiTextField-root': {
                                m: 1,
                                width: fullScreen ? '100%' : '350px',
                            },
                            display: 'flex',
                            flexDirection: fullScreen ? 'column' : 'row',
                            width: 'fit-content',
                        }}
                        noValidate
                        autoComplete='off'>
                        <div>
                            <TextField
                                required
                                id='outlined-required'
                                label='Trip ID'
                            />
                            <TextField
                                required
                                id='outlined-required'
                                label='Source'
                            />
                            <TextField
                                required
                                id='outlined-required'
                                label='Phone'
                            />
                        </div>
                        <div>
                            <TextField
                                id='outlined-select-transporter'
                                label='Select Transporter'
                                select>
                                {deliveryServices.map((option) => (
                                    <MenuItem
                                        key={option.value}
                                        value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                id='outlined-select-destination'
                                label='Select Destination'
                                select>
                                {deliveryServices.map((option) => (
                                    <MenuItem
                                        key={option.value}
                                        value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </div>
                    </Box>
                </DialogContent>
                <DialogActions
                    sx={{
                        flexDirection: fullScreen ? 'column' : 'row',
                        gap: '8px',
                        marginLeft: 0,
                    }}>
                    <Button
                        variant='outlined'
                        sx={{
                            width: fullScreen ? '100%' : '200px',
                            borderRadius: '8px',
                            textTransform: 'none',
                        }}>
                        Update Status
                    </Button>
                    <Button
                        variant='contained'
                        sx={{
                            width: fullScreen ? '100%' : '150px',
                            borderRadius: '8px',
                            textTransform: 'none',
                            fontWeight: '400',
                            marginLeft: 0,
                        }}
                        onClick={handleModalOpen}
                        disableRipple>
                        Add Trip
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </>
    );
};
