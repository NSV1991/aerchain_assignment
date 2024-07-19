import { Order, TripFormattedData } from '@/app/utils/types';
import { visuallyHidden } from '@mui/utils';
import {
    Checkbox,
    TableCell,
    TableHead as MUITableHead,
    TableRow,
    TableSortLabel,
    Box,
} from '@mui/material';

interface HeadCell {
    disablePadding: boolean;
    id: keyof TripFormattedData;
    label: string;
    align: 'left' | 'right' | 'center';
}

const headCells: readonly HeadCell[] = [
    {
        id: 'tripId',
        align: 'left',
        disablePadding: true,
        label: 'Trip id',
    },
    {
        id: 'transporter',
        align: 'left',
        disablePadding: false,
        label: 'Transporter',
    },
    {
        id: 'source',
        align: 'left',
        disablePadding: false,
        label: 'Source',
    },
    {
        id: 'destination',
        align: 'left',
        disablePadding: false,
        label: 'Destination',
    },
    {
        id: 'phone',
        align: 'left',
        disablePadding: false,
        label: 'Phone',
    },
    {
        id: 'eta',
        align: 'left',
        disablePadding: false,
        label: 'ETA',
    },
    {
        id: 'distanceRemaining',
        align: 'center',
        disablePadding: false,
        label: 'Distance remaining',
    },
    {
        id: 'tripStatus',
        align: 'center',
        disablePadding: false,
        label: 'Trip status',
    },
    {
        id: 'tatStatus',
        align: 'center',
        disablePadding: false,
        label: 'TAT status',
    },
];

interface EnhancedTableProps {
    numSelected: number;
    onRequestSort: (
        event: React.MouseEvent<unknown>,
        property: keyof TripFormattedData
    ) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}

export const TableHead = (props: EnhancedTableProps) => {
    const {
        onSelectAllClick,
        order,
        orderBy,
        numSelected,
        rowCount,
        onRequestSort,
    } = props;
    const createSortHandler =
        (property: keyof TripFormattedData) =>
        (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property);
        };

    return (
        <MUITableHead>
            <TableRow>
                <TableCell padding='checkbox'>
                    <Checkbox
                        color='primary'
                        indeterminate={
                            numSelected > 0 && numSelected < rowCount
                        }
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts',
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.align}
                        sx={{ minWidth: '225px' }}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}>
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}>
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component='span' sx={visuallyHidden}>
                                    {order === 'desc'
                                        ? 'sorted descending'
                                        : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </MUITableHead>
    );
};
