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
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAppContext } from '@/app/context/AppContext';
import { CONSTANTS } from '@/app/utils';

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

const schema = Yup.object().shape({
    tripId: Yup.string().required('Trip Id is required field'),
    source: Yup.string().required('Source is required field'),
    phone: Yup.string()
        .matches(/^[6-9]\d{9}$/, 'Invalid phone number')
        .required('Phone number is required field'),
    transporter: Yup.string().required('Transporter is required field'),
    destination: Yup.string().required('Destination is required field'),
});

export const AddTrip = () => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [isOpen, setIsOpen] = useState(false);
    const { DELIVERY_SERVICES } = CONSTANTS;

    const { addTrip } = useAppContext();

    const formik = useFormik({
        initialValues: {
            tripId: '',
            source: '',
            phone: '',
            transporter: '',
            destination: '',
        },

        // Pass the Yup schema to validate the form
        validationSchema: schema,

        // Handle form submission
        onSubmit: async ({
            tripId,
            source,
            phone,
            transporter,
            destination,
        }) => {
            const newTrip = {
                _id: v4(),
                tripId: v4(),
                transporter: transporter,
                tripStartTime: new Date().toISOString(),
                currentStatusCode: 'BKD',
                currentStatus: 'Booked',
                phoneNumber: Number(phone),
                etaDays: 0,
                distanceRemaining: 321,
                tripEndTime: '',
                source: source,
                sourceLatitude: 12,
                sourceLongitude: 89.4,
                dest: destination,
                destLatitude: 11.7,
                destLongitude: 80.9,
                lastPingTime: new Date().toISOString(),
                createdAt: new Date().toISOString(),
            };
            addTrip(newTrip);
            handleClose();
        },
    });

    const {
        errors,
        touched,
        values,
        handleChange,
        handleBlur,
        handleSubmit,
        handleReset,
        isValid,
        dirty,
    } = formik;

    const handleClose = (event?: unknown) => {
        setIsOpen(false);
        handleReset(event);
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
                <form onSubmit={handleSubmit}>
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
                            sx={{
                                '& .MuiTextField-root': {
                                    m: 1,
                                    width: fullScreen ? '100%' : '350px',
                                },
                                display: 'flex',
                                flexDirection: fullScreen ? 'column' : 'row',
                                width: 'fit-content',
                            }}>
                            <div>
                                <TextField
                                    required
                                    id='tripId'
                                    label='Trip ID'
                                    name='tripId'
                                    value={values.tripId}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={
                                        touched.tripId && Boolean(errors.tripId)
                                    }
                                    helperText={touched.tripId && errors.tripId}
                                />
                                <TextField
                                    id='source'
                                    label='Source'
                                    name='source'
                                    value={values.source}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={
                                        touched.source && Boolean(errors.source)
                                    }
                                    helperText={touched.source && errors.source}
                                    select>
                                    {mockStates.map((option) => (
                                        <MenuItem key={option} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TextField
                                    required
                                    id='phone'
                                    label='Phone'
                                    name='phone'
                                    value={values.phone}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={
                                        touched.phone && Boolean(errors.phone)
                                    }
                                    helperText={touched.phone && errors.phone}
                                />
                            </div>
                            <div>
                                <TextField
                                    id='transporter'
                                    label='Select Transporter'
                                    name='transporter'
                                    value={values.transporter}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={
                                        touched.transporter &&
                                        Boolean(errors.transporter)
                                    }
                                    helperText={
                                        touched.transporter &&
                                        errors.transporter
                                    }
                                    select>
                                    {DELIVERY_SERVICES.map((option) => (
                                        <MenuItem
                                            key={option.value}
                                            value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TextField
                                    id='destination'
                                    label='Select Destination'
                                    name='destination'
                                    value={values.destination}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={
                                        touched.destination &&
                                        Boolean(errors.destination)
                                    }
                                    helperText={
                                        touched.destination &&
                                        errors.destination
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
                            type='submit'
                            disabled={!dirty || !isValid}>
                            Add Trip
                        </Button>
                    </DialogActions>
                </form>
            </BootstrapDialog>
        </>
    );
};
