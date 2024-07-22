'use client';

import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
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
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
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

type UpdateStatusDialogProps = {
    disabled?: boolean;
};
export const UpdateStatusDialog = ({ disabled }: UpdateStatusDialogProps) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [isOpen, setIsOpen] = useState(false);

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleModalOpen = () => {
        setIsOpen(true);
    };

    const handleUpdateStatus = () => {
        handleClose();
    };

    return (
        <>
            <Button
                disabled={disabled}
                variant='outlined'
                sx={{
                    width: '200px',
                    borderRadius: '8px',
                    textTransform: 'none',
                }}
                onClick={handleModalOpen}>
                Update Status
            </Button>
            <BootstrapDialog
                fullScreen={fullScreen}
                open={isOpen}
                onClose={handleClose}
                aria-labelledby='update-status-dialog'>
                <DialogTitle id='update-status-dialog'>
                    Update Status
                </DialogTitle>
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
                                m: 2,
                                width: fullScreen ? '100%' : '400px',
                            },
                            '& .MuiSelect-select': {
                                padding: '14px',
                            },
                            '& .MuiOutlinedInput-input': {
                                padding: '14px',
                            },
                            display: 'flex',
                            flexDirection: 'column',
                            width: 'fit-content',
                        }}
                        noValidate
                        autoComplete='off'>
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
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker />
                        </LocalizationProvider>
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
                            width: fullScreen ? '100%' : '100px',
                            borderRadius: '8px',
                            textTransform: 'none',
                        }}
                        onClick={handleClose}>
                        Cancel
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
                        onClick={handleUpdateStatus}>
                        Update Status
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </>
    );
};
