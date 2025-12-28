"use client"

import React, { useState, useEffect } from 'react'
import { motion } from "framer-motion";
import { Edit, Search, Trash2 } from 'lucide-react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Image from 'next/image';

const ProductsTable = () => {

    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetch('data/data.json')
            .then((res) => res.json())
            .then((data) => setProducts(data.products || []))
    }, [])

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.id.toString().includes(searchTerm)
    );

    return (
        <motion.div
            className='bg-[#1e1e1e] backdrop-blur-md shadow-lg rounded-xl p-4 md:p-6'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
        >
            <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4'>
                <h2 className='text-xl md:text-2xl font-bold text-white'>
                    Product List
                </h2>

                <div className='relative w-full md:w-64'>
                    <input
                        type='text'
                        placeholder='search products...'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className='bg-[#2f2f2f] text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200 text-sm'
                    />
                    <Search className='absolute left-3 top-2.5 text-gray-400' size={18} />
                </div>
            </div>

            <div className='w-full overflow-x-auto'>
                <Table>
                    <TableHeader className='bg-[#2a2a2a] border-b border-gray-100'>
                        <TableRow className='hover:bg-transparent'>
                            <TableHead className="w-[120px] sm:w-[150px] text-white font-bold text-sm md:text-base">Name</TableHead>
                            <TableHead className="hidden sm:table-cell text-white font-bold text-sm md:text-base">Product ID</TableHead>
                            <TableHead className="hidden md:table-cell text-white font-bold text-sm md:text-base">Category</TableHead>
                            <TableHead className='text-white font-bold text-sm md:text-base'>Price</TableHead>
                            <TableHead className="hidden lg:table-cell text-white font-bold text-sm md:text-base">Stock</TableHead>
                            <TableHead className="hidden xl:table-cell text-white font-bold text-sm md:text-base">Status</TableHead>
                            <TableHead className="text-right text-white font-bold text-sm md:text-base">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => (
                            <TableRow key={product.id} className='hover:bg-[#2a2a2a] transition duration-200'>
                                <TableCell className="font-medium">
                                    <div className='flex items-center gap-2'>
                                        <Image
                                            src={product.image}
                                            alt={product.name}
                                            width={36}
                                            height={36}
                                            className='w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover'
                                        />
                                        <div className='min-w-0'>
                                            <div className='text-xs sm:text-sm font-medium text-gray-100 truncate'>
                                                {product.name}
                                            </div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="hidden sm:table-cell text-xs sm:text-sm">{product.id}</TableCell>
                                <TableCell className="hidden md:table-cell text-xs sm:text-sm">{product.category}</TableCell>
                                <TableCell className='text-xs sm:text-sm'>${product.price}</TableCell>
                                <TableCell className="hidden lg:table-cell text-xs sm:text-sm">{product.stock}</TableCell>
                                <TableCell className="hidden xl:table-cell text-xs sm:text-sm">
                                    <span className={`px-2 py-1 rounded text-xs ${
                                        product.status === 'In Stock' ? 'bg-green-900 text-green-200' :
                                        product.status === 'Low Stock' ? 'bg-yellow-900 text-yellow-200' :
                                        'bg-red-900 text-red-200'
                                    }`}>
                                        {product.status}
                                    </span>
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className='flex justify-end gap-2'>
                                        <button className='p-1 hover:bg-[#3a3a3a] rounded transition'>
                                            <Edit size={16} className='text-gray-400 hover:text-gray-200' />
                                        </button>
                                        <button className='p-1 hover:bg-[#3a3a3a] rounded transition'>
                                            <Trash2 size={16} className='text-gray-400 hover:text-red-400' />
                                        </button>
                                    </div>
                                </TableCell>
                            </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan="7" className='text-center py-8 text-gray-400'>
                                    No products found
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </motion.div>
    )
}

export default ProductsTable