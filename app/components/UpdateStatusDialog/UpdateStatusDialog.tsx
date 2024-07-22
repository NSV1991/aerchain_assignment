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
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useAppContext } from '@/app/context/AppContext';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { CONSTANTS } from '@/app/utils';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(2, 4),
        marginLeft: 0,
    },
    '& .MuiPaper-root': {
        maxWidth: '800px',
        borderRadius: '12px',
    },
    '& .error': {
        '> div': {
            border: '1px solid red',
        },
        '& .MuiFormHelperText-root': {
            color: 'red',
        },
    },
}));

const schema = Yup.object().shape({
    transporter: Yup.string().required('Transporter is required field'),
    dateTime: Yup.string().required('Time is required field'),
});

type UpdateStatusDialogProps = {
    selectedTripIDs: string[];
};
export const UpdateStatusDialog = ({
    selectedTripIDs,
}: UpdateStatusDialogProps) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [isOpen, setIsOpen] = useState(false);
    const {
        state: { currentFilter },
        updateStatus,
    } = useAppContext();

    const { DELIVERY_SERVICES } = CONSTANTS;

    const formik = useFormik({
        initialValues: {
            transporter: '',
            dateTime: '',
        },

        // Pass the Yup schema to validate the form
        validationSchema: schema,

        // Handle form submission
        onSubmit: async ({ dateTime, transporter }) => {
            selectedTripIDs.forEach((selectedTripId) => {
                updateStatus(selectedTripId, dateTime, transporter);
            });
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

    const selectedTripsCount = selectedTripIDs.length;

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
                disabled={selectedTripsCount === 0 || currentFilter === 'DEL'}
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
                <form onSubmit={handleSubmit}>
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
                            component='div'
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
                            }}>
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
                                    touched.transporter && errors.transporter
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
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateTimePicker
                                    name='dateTime'
                                    className={
                                        touched.dateTime &&
                                        Boolean(errors.dateTime)
                                            ? 'error'
                                            : ''
                                    }
                                    slotProps={{
                                        textField: {
                                            helperText:
                                                touched.dateTime &&
                                                errors.dateTime,
                                        },
                                    }}
                                    onClose={() =>
                                        formik.setFieldTouched('dateTime', true)
                                    }
                                    onChange={(value) => {
                                        formik.setFieldValue('dateTime', value);
                                    }}
                                    disablePast
                                />
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
                            disabled={!dirty || !isValid}
                            type='submit'
                            variant='contained'
                            sx={{
                                width: fullScreen ? '100%' : '150px',
                                borderRadius: '8px',
                                textTransform: 'none',
                                fontWeight: '400',
                                marginLeft: 0,
                            }}>
                            Update Status
                        </Button>
                    </DialogActions>
                </form>
            </BootstrapDialog>
        </>
    );
};
