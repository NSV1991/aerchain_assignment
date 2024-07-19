import dayjs from 'dayjs';
import { Order, Trip } from './types';

export const findTATStatus = (trip: Trip) => {
    if (trip.etaDays <= 0) return 'Others';

    const start = dayjs(trip.tripStartTime);
    const end = dayjs(trip.tripEndTime || trip.lastPingTime);

    const dayDifference = end.diff(start, 'day');

    if (trip.etaDays > dayDifference) return 'Delayed';
    return 'On time';
};

export function stableSort<T>(
    array: readonly T[],
    comparator: (a: T, b: T) => number
) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

export const descendingComparator = <T>(a: T, b: T, orderBy: keyof T) => {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
};

export function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key
): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string }
) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

export const getTATColor = (status: string) => {
    if (status == 'Others') return { color1: '#313131', color2: '#3131311A' };
    if (status == 'On time')
        return { color1: '#038700', color2: 'rgba(3, 135, 0, 0.1)' };
    return { color1: '#CC3333', color2: '#D7E3FE' };
};

export const getTripStatusColor = (status: string) => {
    if (status === 'Booked') {
        return { color: '#313131', backgroundColor: '#3131311A' };
    }
    if (status === 'Reached Destination') {
        return { color: '#038700', backgroundColor: 'rgba(3, 135, 0, 0.1)' };
    }
    if (status === 'Delivered') {
        return { color: '#004085', backgroundColor: 'rgba(0, 64, 133, 0.1)' };
    }
    return { color: '#6c757d', backgroundColor: 'rgba(108, 117, 125, 0.1)' }; // Default colors
};

export const formattedDate = (inputDate: string) =>
    dayjs(inputDate).format('MM/DD/YY, h:mmA');
