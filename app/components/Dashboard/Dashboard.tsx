'use client';

import { AppProvider } from '@/app/context/AppContext';
import { Header } from '../Header';
import { Table } from '../Table';

export const Dashboard = () => {
    return (
        <AppProvider>
            <Header />
            <Table />
        </AppProvider>
    );
};
