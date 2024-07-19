// context/AppContext.tsx

import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Trip } from '../utils/types';
import mock from '../data/mockData.json';

// Define the shape of the context data
interface AppState {
    trips: Trip[];
}

interface AppContextType {
    state: AppState;
    addTrip: (trip: Trip) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
    children: ReactNode;
}

// Create a provider component
export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    const [state, setState] = useState<AppState>({
        trips: mock.data,
    });

    const addTrip = (trip: Trip) => {
        setState((prevState) => ({
            ...prevState,
            trips: [trip, ...prevState.trips],
        }));
    };

    return (
        <AppContext.Provider value={{ state, addTrip }}>
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
