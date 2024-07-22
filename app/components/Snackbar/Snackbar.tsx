'use client';

import { useEffect, useState } from 'react';
import MUISnackbar from '@mui/material/Snackbar';
import { useAppContext } from '@/app/context/AppContext';

export const Snackbar = () => {
    const [open, setOpen] = useState(false);
    const {
        state: { actionMsg },
    } = useAppContext();

    useEffect(() => {
        if (actionMsg) {
            setOpen(true);
        }
    }, [actionMsg]);

    const handleClose = (
        event: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <MUISnackbar
            sx={{ padding: '10px' }}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            message={actionMsg}
        />
    );
};
