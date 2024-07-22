'use client';

import { AppProvider } from '@/app/context/AppContext';
import { Header } from '../Header';
import { Table } from '../Table';
import { Snackbar } from '../Snackbar';

export const Dashboard = () => {
    return (
        <AppProvider>
            <Snackbar />
            <Header />
            <Table />
        </AppProvider>
    );
};
