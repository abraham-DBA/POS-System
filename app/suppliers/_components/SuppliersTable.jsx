"use client"

import React, { useState, useEffect } from 'react'
import { motion } from "framer-motion";
import { Edit, Search, Trash2 } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useTheme } from '../../providers/ThemeProvider';

const SuppliersTable = () => {

    const [suppliers, setSuppliers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const { theme } = useTheme();

    useEffect(() => {
        fetch('data/data.json')
            .then((res) => res.json())
            .then((data) => setSuppliers(data.suppliers || []))
    }, [])

    const filteredSuppliers = suppliers.filter((supplier) =>
        supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supplier.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supplier.contact.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const isDark = theme === 'dark';

    return (
        <motion.div
            className={`${isDark ? 'bg-[#1e1e1e]' : 'bg-white'} backdrop-blur-md shadow-lg rounded-xl p-4 md:p-6`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
        >
            <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4'>
                <h2 className={`text-xl md:text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Suppliers
                </h2>

                <div className={`relative w-full md:w-64`}>
                    <input
                        type='text'
                        placeholder='search suppliers...'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={`${isDark ? 'bg-[#2f2f2f] text-white placeholder-gray-400' : 'bg-gray-100 text-gray-900 placeholder-gray-500'} rounded-lg pl-10 pr-4 py-2 w-full focus:outline-none focus:ring-2 ${isDark ? 'focus:ring-gray-500' : 'focus:ring-gray-400'} transition duration-200 text-sm`}
                    />
                    <Search className={`absolute left-3 top-2.5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} size={18} />
                </div>
            </div>

            <div className='w-full overflow-x-auto'>
                <Table>
                    <TableHeader className={`${isDark ? 'bg-[#2a2a2a] border-gray-700' : 'bg-gray-100 border-gray-300'} border-b`}>
                        <TableRow className='hover:bg-transparent'>
                            <TableHead className={`w-[120px] sm:w-[150px] ${isDark ? 'text-white' : 'text-gray-900'} font-bold text-sm md:text-base`}>Name</TableHead>
                            <TableHead className={`hidden sm:table-cell ${isDark ? 'text-white' : 'text-gray-900'} font-bold text-sm md:text-base`}>Contact</TableHead>
                            <TableHead className={`hidden md:table-cell ${isDark ? 'text-white' : 'text-gray-900'} font-bold text-sm md:text-base`}>Phone</TableHead>
                            <TableHead className={`${isDark ? 'text-white' : 'text-gray-900'} font-bold text-sm md:text-base`}>Amount Owed</TableHead>
                            <TableHead className={`hidden lg:table-cell ${isDark ? 'text-white' : 'text-gray-900'} font-bold text-sm md:text-base`}>Payment Terms</TableHead>
                            <TableHead className={`hidden xl:table-cell ${isDark ? 'text-white' : 'text-gray-900'} font-bold text-sm md:text-base`}>Status</TableHead>
                            <TableHead className={`text-right ${isDark ? 'text-white' : 'text-gray-900'} font-bold text-sm md:text-base`}>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredSuppliers.length > 0 ? (
                            filteredSuppliers.map((supplier) => (
                            <TableRow key={supplier.id} className={`${isDark ? 'hover:bg-[#2a2a2a]' : 'hover:bg-gray-50'} transition duration-200`}>
                                <TableCell className="font-medium">
                                    <div className='min-w-0'>
                                        <div className={`text-xs sm:text-sm font-medium ${isDark ? 'text-gray-100' : 'text-gray-900'} truncate`}>
                                            {supplier.name}
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className={`hidden sm:table-cell text-xs sm:text-sm ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>{supplier.contact}</TableCell>
                                <TableCell className={`hidden md:table-cell text-xs sm:text-sm ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>{supplier.phone}</TableCell>
                                <TableCell className={`text-xs sm:text-sm font-semibold ${isDark ? 'text-orange-400' : 'text-orange-600'}`}>${supplier.totalOwed.toLocaleString()}</TableCell>
                                <TableCell className={`hidden lg:table-cell text-xs sm:text-sm ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>{supplier.paymentTerms}</TableCell>
                                <TableCell className={`hidden xl:table-cell text-xs sm:text-sm`}>
                                    <span className={`px-2 py-1 rounded text-xs ${
                                        supplier.paymentStatus === 'Paid' ? (isDark ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800') :
                                        (isDark ? 'bg-yellow-900 text-yellow-200' : 'bg-yellow-100 text-yellow-800')
                                    }`}>
                                        {supplier.paymentStatus}
                                    </span>
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className='flex justify-end gap-2'>
                                        <button className={`p-1 ${isDark ? 'hover:bg-[#3a3a3a]' : 'hover:bg-gray-200'} rounded transition`}>
                                            <Edit size={16} className={isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'} />
                                        </button>
                                        <button className={`p-1 ${isDark ? 'hover:bg-[#3a3a3a]' : 'hover:bg-gray-200'} rounded transition`}>
                                            <Trash2 size={16} className={isDark ? 'text-gray-400 hover:text-red-400' : 'text-gray-500 hover:text-red-600'} />
                                        </button>
                                    </div>
                                </TableCell>
                            </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan="7" className={`text-center py-8 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                    No suppliers found
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </motion.div>
    )
}

export default SuppliersTable
