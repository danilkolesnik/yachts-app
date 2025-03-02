"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { Select, Option } from "@material-tailwind/react";
import { URL } from '@/utils/constants';
import { useAppSelector } from '@/lib/hooks';
import Header from '@/component/header';
import Loader from '@/ui/loader';
import { statusStyles } from '@/utils/statusStyles';

const OrderPage = () => {
    const [orders, setOrders] = useState([]);
    const [filters, setFilters] = useState({
        status: '',
        date: '',
        client: '',
        yacht: '',
        employee: ''
    });
    const [sortField, setSortField] = useState('urgencyLevel');
    const [sortOrder, setSortOrder] = useState('desc');
    const [loading, setLoading] = useState(true);
    const id = useAppSelector(state => state.userData?.id);

    const fetchOrders = async () => {
        if (!id) {
            console.error('User ID is not defined');
            setLoading(false);
            return;
        }
        try {
            const response = await axios.get(`${URL}/order/orders/${id}`);
            setOrders(response.data.data || []);
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (value, name) => {
        if (name) {
            setFilters({ ...filters, [name]: value });
        } else {
            console.error('Name is not provided');
        }
    };

    const handleSortChange = (field) => {
        setSortField(field);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    const filteredOrders = (orders || []).filter(order => {
        const orderDate = new Date(order.createdAt);
        const filterDate = filters.date ? new Date(filters.date) : null;

        return (
            (filters.status ? order.status === filters.status : true) &&
            (filters.client ? order.offer.customerFullName.includes(filters.client) : true) &&
            (filterDate ? orderDate.toDateString() === filterDate.toDateString() : true)
        );
    });

    const sortedOrders = filteredOrders.sort((a, b) => {
        if (sortField === 'status') {
            return sortOrder === 'asc' ? a[sortField].localeCompare(b[sortField]) : b[sortField].localeCompare(a[sortField]);
        }
        if (sortOrder === 'asc') {
            return a[sortField] - b[sortField];
        } else {
            return b[sortField] - a[sortField];
        }
    });

    const columns = [
        { name: 'Creation Date', selector: row => {
            return new Date(row.createdAt).toLocaleString();
        }, sortable: true },
        { name: 'Order Number', selector: row => row.id, sortable: true },
        { name: 'Client', selector: row => row.offer.customerFullName, sortable: true },
        { name: 'Yacht', selector: row => row.offer.yachtName, sortable: true },
        { name: 'Responsible', selector: row => row.assignedWorkers.map(worker => worker.fullName).join(', '), sortable: true },
        { name: 'Status', selector: row => row.status, sortable: true, cell: row => (
            <span style={{
                ...statusStyles[row.status],
                padding: '5px 10px',
                borderRadius: '5px'
            }}>
                {row.status}
            </span>
        ) },
        // Add more columns as needed
    ];

    useEffect(() => {
        fetchOrders();
    }, [id]);

    return (
        <div>
            <Header />
            <div className="min-h-screen bg-gray-100 p-8 font-sans">
                {loading ? (
                    <div className="flex justify-center items-center min-h-screen">
                        <Loader loading={loading} />
                    </div>
                ) : (
                    <div className="w-full space-y-6 bg-white rounded shadow-md">
                        <div className="relative flex justify-between mb-4 p-4">
                            <div className="filters flex">
                                <Select
                                    label="Status"
                                    name="status"
                                    onChange={(value) => handleFilterChange(value, 'status')}
                                    className="text-black border-black"
                                    labelProps={{ className: 'text-black' }}
                                >
                                    <Option className="text-black" value="">All</Option>
                                    <Option className="text-black" value="created">Created</Option>
                                    <Option className="text-black" value="confirmed">Confirmed</Option>
                                    <Option className="text-black" value="canceled">Canceled</Option>
                                    <Option className="text-black" value="in-progress">In Progress</Option>
                                    <Option className="text-black" value="waiting">Waiting</Option>
                                    <Option className="text-black" value="awaiting-approval">Awaiting Approval</Option>
                                    <Option className="text-black" value="completed">Completed</Option>
                                    <Option className="text-black" value="closed">Closed</Option>
                                </Select>
                                <input
                                    type="date"
                                    name="date"
                                    value={filters.date}
                                    onChange={(e) => handleFilterChange(e.target.value, 'date')}
                                    className="border p-2"
                                />
                            </div>
                        </div>
                        <DataTable
                            columns={columns}
                            data={sortedOrders}
                            pagination
                            highlightOnHover
                            pointerOnHover
                            onSort={handleSortChange}
                            className="min-w-full border-collapse"
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderPage;
