// context/AppContext.tsx

import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Filter, Trip } from '../utils/types';
import mock from '../data/mockData.json';
import { filterDataByStatus } from '../utils';

interface AppState {
    trips: Trip[];
    totalTrips: Trip[];
    currentFilter: Filter;
}

interface AppContextType {
    state: AppState;
    addTrip: (trip: Trip) => void;
    updateFilter: (filter: Filter) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
    children: ReactNode;
}

// Create a provider component
export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
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

    return (
        <AppContext.Provider value={{ state, addTrip, updateFilter }}>
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
