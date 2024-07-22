// context/AppContext.tsx

import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Filter, Trip } from '../utils/types';
import mock from '../data/mockData.json';
import { CONSTANTS, filterDataByStatus } from '../utils';

interface AppState {
    trips: Trip[];
    totalTrips: Trip[];
    currentFilter: Filter;
}

interface AppContextType {
    state: AppState;
    addTrip: (trip: Trip) => void;
    updateFilter: (filter: Filter) => void;
    updateStatus: (
        tripId: string,
        dateTime: string,
        transporter: string
    ) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
    children: ReactNode;
}

// Create a provider component
export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    const { STATUS } = CONSTANTS;
    const [state, setState] = useState<AppState>({
        trips: filterDataByStatus('DEL', mock.data),
        totalTrips: mock.data,
        currentFilter: 'DEL',
    });

    const addTrip = (trip: Trip): void => {
        setState((prevState) => ({
            ...prevState,
            totalTrips: [trip, ...prevState.totalTrips],
        }));
    };

    const updateFilter = (filter: Filter): void => {
        const filteredData = filterDataByStatus(filter, mock.data);
        setState((prevState) => ({
            ...prevState,
            currentFilter: filter,
            trips: filteredData,
        }));
    };

    const updateStatus = (
        tripId: string,
        dateTime: string,
        transporter: string
    ) => {
        const updatedTrips = state.totalTrips.map((trip) => {
            if (trip.tripId === tripId) {
                trip.lastPingTime = dateTime;
                trip.transporter = transporter;
                trip.lastPingTime = dateTime;

                if (trip.currentStatusCode === 'DEL') {
                    trip.currentStatus = 'DEL';
                    trip.currentStatus = STATUS.DEL;
                    trip.tripEndTime = dateTime;
                } else if (trip.currentStatusCode === 'INT') {
                    trip.currentStatus = 'RD';
                    trip.currentStatus = STATUS.RD;
                } else if (trip.currentStatusCode === 'BKD') {
                    trip.currentStatus = 'INT';
                    trip.currentStatus = STATUS.INT;
                }
            }
            return trip;
        });

        setState((prevState) => ({
            ...prevState,
            trips: filterDataByStatus(prevState.currentFilter, updatedTrips),
            totalTrips: updatedTrips,
        }));
    };

    return (
        <AppContext.Provider
            value={{ state, addTrip, updateFilter, updateStatus }}>
            {children}
        </AppContext.Provider>
    );
};

// Custom hook for using the context
export const useAppContext = (): AppContextType => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};
