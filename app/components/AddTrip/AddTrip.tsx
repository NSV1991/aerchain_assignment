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
import mockStates from '../../data/mockStates.json';
import { v4 } from 'uuid';
import { Trip } from '@/app/utils/types';
import { useAppContext } from '@/app/context/AppContext';

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
        value: 'Blue dart',
        label: 'Blue dart',
    },
    {
        value: 'DTDC',
        label: 'DTDC',
    },
    {
        value: 'Delhivery',
        label: 'Delhivery',
    },
    {
        value: 'Merks',
        label: 'Merks',
    },
];

export const AddTrip = () => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [isOpen, setIsOpen] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);

    const { addTrip } = useAppContext();

    const [formValues, setFormValues] = useState({
        tripId: '',
        source: '',
        phone: '',
        transporter: '',
        destination: '',
    });
    const [formErrors, setFormErrors] = useState({
        tripId: false,
        source: false,
        phone: false,
        transporter: false,
        destination: false,
    });

    const handleClose = () => {
        setIsOpen(false);
        setFormValues({
            tripId: '',
            source: '',
            phone: '',
            transporter: '',
            destination: '',
        });
        setFormErrors({
            tripId: false,
            source: false,
            phone: false,
            transporter: false,
            destination: false,
        });
    };

    const handleModalOpen = () => {
        setIsOpen(true);
    };

    const validatePhone = (phone: string) => {
        const phoneRegex = /^[0-9]{10}$/; // Simple regex for 10-digit phone numbers
        return phoneRegex.test(phone);
    };

    const handleAddTrip = () => {
        const errors = {
            tripId: !formValues.tripId,
            source: !formValues.source,
            phone: !formValues.phone,
            transporter: !formValues.transporter,
            destination: !formValues.destination,
        };
        setFormErrors(errors);

        if (isFormValid) {
            const newTrip = {
                _id: v4(),
                tripId: v4(),
                transporter: formValues.transporter,
                tripStartTime: new Date().toISOString(),
                currentStatusCode: 'BKD',
                currentStatus: 'Booked',
                phoneNumber: Number(formValues.phone),
                etaDays: 3,
                distanceRemaining: 321,
                tripEndTime: '',
                source: formValues.source,
                sourceLatitude: 12,
                sourceLongitude: 89.4,
                dest: formValues.destination,
                destLatitude: 11.7,
                destLongitude: 80.9,
                lastPingTime: new Date().toISOString(),
                createdAt: new Date().toISOString(),
            };
            addTrip(newTrip);
            handleClose();
            // Here you can add logic to handle form submission, such as sending data to a server
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        const errors = {
            tripId: !formValues.tripId,
            source: !formValues.source,
            phone: !formValues.phone,
            transporter: !formValues.transporter,
            destination: !formValues.destination,
        };
        const isValid = !Object.values(errors).some((error) => error);
        setIsFormValid(isValid);
        setFormValues({
            ...formValues,
            [name]: value,
        });

        if (name === 'phone') {
            if (!validatePhone(value)) {
                setFormErrors({
                    ...formErrors,
                    phone: true,
                });
            } else {
                setFormErrors({
                    ...formErrors,
                    phone: false,
                });
            }
        }
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
                                name='tripId'
                                onChange={handleChange}
                                error={formErrors.tripId}
                                helperText={
                                    formErrors.tripId
                                        ? 'Trip ID is required'
                                        : ''
                                }
                            />
                            <TextField
                                id='outlined-select-destination'
                                label='Source'
                                name='source'
                                value={formValues.source}
                                onChange={handleChange}
                                error={formErrors.source}
                                helperText={
                                    formErrors.source
                                        ? 'Source is required'
                                        : ''
                                }
                                select>
                                {mockStates.map((option) => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                required
                                id='outlined-required'
                                label='Phone'
                                name='phone'
                                onChange={handleChange}
                                error={formErrors.phone}
                                helperText={
                                    formErrors.phone
                                        ? 'Phone is required and must of 10 digit'
                                        : ''
                                }
                            />
                        </div>
                        <div>
                            <TextField
                                id='outlined-select-transporter'
                                label='Select Transporter'
                                name='transporter'
                                value={formValues.transporter}
                                onChange={handleChange}
                                error={formErrors.transporter}
                                helperText={
                                    formErrors.transporter
                                        ? 'Transporter is required'
                                        : ''
                                }
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
                                name='destination'
                                value={formValues.destination}
                                onChange={handleChange}
                                error={formErrors.destination}
                                helperText={
                                    formErrors.destination
                                        ? 'Destination is required'
                                        : ''
                                }
                                select>
                                {mockStates.map((option) => (
                                    <MenuItem key={option} value={option}>
                                        {option}
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
                        onClick={handleAddTrip}
                        disabled={!isFormValid}>
                        Add Trip
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </>
    );
};
