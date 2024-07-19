export interface Trip {
    _id: string;
    tripId: string;
    transporter: string;
    tripStartTime: string;
    currentStatusCode: string;
    currentStatus: string;
    phoneNumber: number;
    etaDays: number;
    distanceRemaining: number;
    tripEndTime: string;
    source: string;
    sourceLatitude: number;
    sourceLongitude: number;
    dest: string;
    destLatitude: number;
    destLongitude: number;
    lastPingTime: string;
    createdAt: string;
}

export type Order = 'asc' | 'desc';

export interface HeadCell {
    disablePadding: boolean;
    id: string;
    label: string;
    align: 'left' | 'right' | 'center';
}

export interface TripFormattedData {
    tripId: string;
    transporter: string;
    source: string;
    destination: string;
    phone: number;
    eta: string;
    distanceRemaining: number;
    tripStatus: string;
    tatStatus: string;
}
