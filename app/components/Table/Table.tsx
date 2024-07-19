'use client';

import React, { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import MUITable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import { Chip, Link } from '@mui/material';
import { Order, Trip, TripFormattedData } from '@/app/utils/types';
import {
    findTATStatus,
    formattedDate,
    getComparator,
    getTATColor,
    getTripStatusColor,
    stableSort,
} from '@/app/utils/dataUtils';
import { TableHead } from './TableHead';
import { Toolbar } from './Toolbar';
import { useAppContext } from '@/app/context/AppContext';

export const Table = (): JSX.Element => {
    const {
        state: { trips },
    } = useAppContext();

    const [order, setOrder] = useState<Order>('asc');
    const [orderBy, setOrderBy] = useState<keyof TripFormattedData>('tripId');
    const [selected, setSelected] = useState<readonly string[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const rows = trips.map((data) => ({
        tripId: data.tripId,
        transporter: data.transporter,
        source: data.source,
        destination: data.dest,
        phone: data.phoneNumber,
        eta: formattedDate(data.tripEndTime || data.lastPingTime) || '--',
        distanceRemaining: data.distanceRemaining || '--',
        tripStatus: data.currentStatus || '--',
        tatStatus: findTATStatus(data) || '--',
    }));

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof TripFormattedData
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n.tripId);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected: readonly string[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }
        setSelected(newSelected);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = (id: string) => selected.indexOf(id) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const visibleRows = useMemo(
        () =>
            stableSort(rows, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
            ),
        [rows, order, orderBy, page, rowsPerPage]
    );

    return (
        <>
            <Box sx={{ width: '100%' }}>
                <Paper sx={{ width: '100%', mb: 2 }}>
                    <Toolbar numSelected={selected.length} />
                    <TableContainer>
                        <MUITable
                            sx={{ minWidth: 750 }}
                            aria-labelledby='tableTitle'
                            size='medium'>
                            <TableHead
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                                rowCount={rows.length}
                            />
                            <TableBody>
                                {visibleRows.map((row, index) => {
                                    const isItemSelected = isSelected(
                                        row.tripId as string
                                    );
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) =>
                                                handleClick(
                                                    event,
                                                    row.tripId as string
                                                )
                                            }
                                            role='checkbox'
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.tripId}
                                            selected={isItemSelected}
                                            sx={{ cursor: 'pointer' }}>
                                            <TableCell padding='checkbox'>
                                                <Checkbox
                                                    color='primary'
                                                    checked={isItemSelected}
                                                    inputProps={{
                                                        'aria-labelledby':
                                                            labelId,
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell
                                                component='th'
                                                id={labelId}
                                                scope='row'
                                                padding='none'>
                                                <Link
                                                    sx={{
                                                        textDecoration: 'none',
                                                        textOverflow:
                                                            'ellipsis',
                                                        whiteSpace: 'nowrap',
                                                        overflow: 'hidden',
                                                        display: 'block',
                                                        width: '200px',
                                                    }}>
                                                    {row.tripId}
                                                </Link>
                                            </TableCell>
                                            <TableCell align='left'>
                                                {row.transporter}
                                            </TableCell>
                                            <TableCell align='left'>
                                                {row.source}
                                            </TableCell>
                                            <TableCell align='left'>
                                                {row.destination}
                                            </TableCell>
                                            <TableCell align='left'>
                                                {row.phone}
                                            </TableCell>
                                            <TableCell align='left'>
                                                {row.eta}
                                            </TableCell>
                                            <TableCell align='center'>
                                                {row.distanceRemaining}
                                            </TableCell>
                                            <TableCell align='center'>
                                                <Chip
                                                    label={row.tripStatus}
                                                    sx={{
                                                        marginLeft: '8px',
                                                        background:
                                                            getTripStatusColor(
                                                                row.tripStatus
                                                            ).backgroundColor,
                                                        color: getTripStatusColor(
                                                            row.tripStatus
                                                        ).color,
                                                        borderRadius: '4px',
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell align='center'>
                                                <Chip
                                                    label={row.tatStatus}
                                                    sx={{
                                                        marginLeft: '8px',
                                                        background: getTATColor(
                                                            row.tatStatus
                                                        ).color2,
                                                        color: getTATColor(
                                                            row.tatStatus
                                                        ).color1,
                                                        borderRadius: '4px',
                                                    }}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                                {emptyRows > 0 && (
                                    <TableRow
                                        style={{
                                            height: 53 * emptyRows,
                                        }}>
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>
                        </MUITable>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component='div'
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </Box>
        </>
    );
};
