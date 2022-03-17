/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useDispatch } from 'react-redux';
import { deleteLaptop, fetchLaptops } from '../store/actions/laptopActions';
import { Button } from '@mui/material';
import { MainLayout } from '../components/MainLayout';
import { useRouter } from 'next/router';

interface Column {
	id?:
		| 'productName'
		| 'ram'
		| 'storage'
		| 'brand'
		| 'price'
		| 'image'
		| 'cpu'
		| 'screen';
	label: string;
	minWidth?: number;
	align?: 'right' | 'center';
	format?: (value: number) => string;
}

const columns: Column[] = [
	{ id: 'productName', label: 'Name', minWidth: 50 },

	{
		id: 'image',
		label: 'Image',
		minWidth: 50,
		align: 'center',
	},
	{ id: 'ram', label: 'RAM', minWidth: 20, align: 'right' },
	{ id: 'cpu', label: 'CPU', minWidth: 20, align: 'right' },
	{
		id: 'screen',
		label: 'Screen',
		minWidth: 50,
		align: 'right',
		format: (value: number) => value.toLocaleString('en-US'),
	},
	{
		id: 'storage',
		label: 'Storage',
		minWidth: 50,
		align: 'right',
		format: (value: number) => value.toLocaleString('en-US'),
	},
	{
		id: 'brand',
		label: 'Brand',
		minWidth: 50,
		align: 'right',
		format: (value: number) => value.toLocaleString('en-US'),
	},
	{
		id: 'price',
		label: 'Price',
		minWidth: 50,
		align: 'right',
		format: (value: number) => value.toFixed(2),
	},
	{
		label: 'edit',
		align: 'center',
		minWidth: 50,
	},
	{
		label: 'del',
		align: 'center',
		minWidth: 50,
	},
];

export default function ColumnGroupingTable() {
	const router = useRouter();
	const {
		laptop: { laptops },
		auth: { user },
	} = useTypedSelector((state) => state);
	useEffect(() => {
		if (user && user.email !== 'kadyrkulov.980@gmail.com') {
			router.push('/');
		}
	}, [user]);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchLaptops(1, 1000));
	}, []);
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	const handleDeleteLaptop = (id) => {
		deleteLaptop(id);
		// setTimeout(() => {
		dispatch(fetchLaptops(1, 1000));
		// }, 500);
	};

	return (
		<MainLayout>
			<Paper sx={{ width: '100%' }}>
				<TableContainer sx={{ maxHeight: 440 }}>
					<Table stickyHeader aria-label='sticky table'>
						<TableHead>
							{/* <TableRow>
              <TableCell align="center" colSpan={2}>
                Admin
              </TableCell>
              <TableCell align="center" colSpan={3}>
                Panel
              </TableCell>
            </TableRow> */}
							<TableRow>
								{columns.map((column) => (
									<TableCell
										key={column.id}
										align={column.align}
										style={{ top: 0, minWidth: column.minWidth }}
									>
										{column.label}
									</TableCell>
								))}
							</TableRow>
						</TableHead>
						<TableBody>
							{laptops &&
								laptops
									.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
									.map((row) => {
										return (
											<TableRow
												hover
												role='checkbox'
												tabIndex={-1}
												key={row.id}
											>
												{columns.map((column) => {
													const value = row[column.id];
													if (column.label === 'edit') {
														return (
															<TableCell key={column.id} align={column.align}>
																<Button
																	onClick={() =>
																		router.push(`/editlaptop/${row.id}`)
																	}
																	variant='outlined'
																	color='warning'
																>
																	edit
																</Button>
															</TableCell>
														);
													}
													if (column.label === 'del') {
														return (
															<TableCell key={column.id} align={column.align}>
																<Button
																	variant='outlined'
																	color='secondary'
																	onClick={() => {
																		handleDeleteLaptop(row.id);
																	}}
																>
																	del
																</Button>
															</TableCell>
														);
													}
													return (
														<TableCell key={column.id} align={column.align}>
															{column.format && typeof value === 'number' ? (
																column.format(value)
															) : column.id === 'image' ? (
																<img width={150} src={value} alt='pic' />
															) : (
																value
															)}
														</TableCell>
													);
												})}
											</TableRow>
										);
									})}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[10, 25, 100]}
					component='div'
					count={laptops?.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</Paper>
			<Button
				onClick={() => router.push('/addlaptop')}
				sx={{ margin: '0 auto' }}
			>
				Add
			</Button>
		</MainLayout>
	);
}
