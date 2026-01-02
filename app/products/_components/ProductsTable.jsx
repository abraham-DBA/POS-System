"use client"

import React, { useState, useEffect } from 'react'
import { motion } from "framer-motion";
import { Edit, Search, Trash2, X } from 'lucide-react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Image from 'next/image';
import { useTheme } from '../../providers/ThemeProvider';

const ProductsTable = () => {

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState({ name: '', price: 0, cost: 0, stock: 0, minStock: 0, category: '', supplier: '' });
    const { theme } = useTheme();

    useEffect(() => {
        fetch('data/data.json')
            .then((res) => res.json())
            .then((data) => {
                setProducts(data.products || []);
                setCategories(data.categories || []);
                setSuppliers(data.suppliers || []);
            })
    }, [])

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.id.toString().includes(searchTerm)
    );

    const isDark = theme === 'dark';

    const handleEditClick = (product) => {
        setEditingProduct(product);
        setFormData({
            name: product.name,
            price: product.price,
            cost: product.cost,
            stock: product.stock,
            minStock: product.minStock,
            category: product.category,
            supplier: product.supplier
        });
        setIsDialogOpen(true);
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'name' || name === 'category' || name === 'supplier' ? value : parseInt(value) || 0
        }));
    };

    const handleSaveEdit = () => {
        const updatedProducts = products.map(product =>
            product.id === editingProduct.id
                ? { ...product, ...formData }
                : product
        );
        setProducts(updatedProducts);
        setIsDialogOpen(false);
        setEditingProduct(null);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setEditingProduct(null);
    };

    return (
        <motion.div
            className={`${isDark ? 'bg-[#1e1e1e]' : 'bg-white'} backdrop-blur-md shadow-lg rounded-xl p-4 md:p-6`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
        >
            <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4'>
                <h2 className={`text-xl md:text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Product List
                </h2>

                <div className={`relative w-full md:w-64`}>
                    <input
                        type='text'
                        placeholder='search products...'
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
                            <TableHead className={`hidden sm:table-cell ${isDark ? 'text-white' : 'text-gray-900'} font-bold text-sm md:text-base`}>Product ID</TableHead>
                            <TableHead className={`hidden md:table-cell ${isDark ? 'text-white' : 'text-gray-900'} font-bold text-sm md:text-base`}>Category</TableHead>
                            <TableHead className={`${isDark ? 'text-white' : 'text-gray-900'} font-bold text-sm md:text-base`}>Price</TableHead>
                            <TableHead className={`hidden lg:table-cell ${isDark ? 'text-white' : 'text-gray-900'} font-bold text-sm md:text-base`}>Stock</TableHead>
                            <TableHead className={`hidden xl:table-cell ${isDark ? 'text-white' : 'text-gray-900'} font-bold text-sm md:text-base`}>Status</TableHead>
                            <TableHead className={`text-right ${isDark ? 'text-white' : 'text-gray-900'} font-bold text-sm md:text-base`}>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => (
                            <TableRow key={product.id} className={`${isDark ? 'hover:bg-[#2a2a2a]' : 'hover:bg-gray-50'} transition duration-200`}>
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
                                            <div className={`text-xs sm:text-sm font-medium ${isDark ? 'text-gray-100' : 'text-gray-900'} truncate`}>
                                                {product.name}
                                            </div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className={`hidden sm:table-cell text-xs sm:text-sm ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>{product.id}</TableCell>
                                <TableCell className={`hidden md:table-cell text-xs sm:text-sm ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>{product.category}</TableCell>
                                <TableCell className={`text-xs sm:text-sm font-semibold ${isDark ? 'text-green-400' : 'text-green-600'}`}>${product.price}</TableCell>
                                <TableCell className={`hidden lg:table-cell text-xs sm:text-sm ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>{product.stock}</TableCell>
                                <TableCell className={`hidden xl:table-cell text-xs sm:text-sm`}>
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
                                        <button onClick={() => handleEditClick(product)} className={`p-1 ${isDark ? 'hover:bg-[#3a3a3a]' : 'hover:bg-gray-200'} rounded transition`}>
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
                                    No products found
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Edit Dialog */}
            {isDialogOpen && (
                <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4'>
                    <motion.div
                        className={`${isDark ? 'bg-[#1e1e1e]' : 'bg-white'} rounded-lg shadow-lg p-8 w-full max-w-3xl h-full max-h-[95vh] overflow-y-auto`}
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className='flex justify-between items-center mb-8'>
                            <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                Edit Product
                            </h3>
                            <button
                                onClick={handleCloseDialog}
                                className={`p-2 rounded transition ${isDark ? 'hover:bg-[#2a2a2a]' : 'hover:bg-gray-100'}`}
                            >
                                <X size={24} className={isDark ? 'text-gray-400' : 'text-gray-600'} />
                            </button>
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                            <div>
                                <label className={`block text-sm font-medium mb-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                    Product Name
                                </label>
                                <input
                                    type='text'
                                    name='name'
                                    value={formData.name}
                                    onChange={handleFormChange}
                                    className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-[#2f2f2f] border-gray-700 text-white placeholder-gray-500' : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400'} focus:outline-none focus:ring-2 ${isDark ? 'focus:ring-gray-600' : 'focus:ring-gray-400'} transition text-base`}
                                />
                            </div>

                            <div>
                                <label className={`block text-sm font-medium mb-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                    Category
                                </label>
                                <select
                                    name='category'
                                    value={formData.category}
                                    onChange={handleFormChange}
                                    className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-[#2f2f2f] border-gray-700 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'} focus:outline-none focus:ring-2 ${isDark ? 'focus:ring-gray-600' : 'focus:ring-gray-400'} transition text-base`}
                                >
                                    <option value=''>Select a category</option>
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.name}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className={`block text-sm font-medium mb-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                    Price
                                </label>
                                <input
                                    type='number'
                                    name='price'
                                    value={formData.price}
                                    onChange={handleFormChange}
                                    className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-[#2f2f2f] border-gray-700 text-white placeholder-gray-500' : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400'} focus:outline-none focus:ring-2 ${isDark ? 'focus:ring-gray-600' : 'focus:ring-gray-400'} transition text-base`}
                                />
                            </div>

                            <div>
                                <label className={`block text-sm font-medium mb-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                    Cost
                                </label>
                                <input
                                    type='number'
                                    name='cost'
                                    value={formData.cost}
                                    onChange={handleFormChange}
                                    className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-[#2f2f2f] border-gray-700 text-white placeholder-gray-500' : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400'} focus:outline-none focus:ring-2 ${isDark ? 'focus:ring-gray-600' : 'focus:ring-gray-400'} transition text-base`}
                                />
                            </div>

                            <div>
                                <label className={`block text-sm font-medium mb-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                    Stock
                                </label>
                                <input
                                    type='number'
                                    name='stock'
                                    value={formData.stock}
                                    onChange={handleFormChange}
                                    className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-[#2f2f2f] border-gray-700 text-white placeholder-gray-500' : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400'} focus:outline-none focus:ring-2 ${isDark ? 'focus:ring-gray-600' : 'focus:ring-gray-400'} transition text-base`}
                                />
                            </div>

                            <div>
                                <label className={`block text-sm font-medium mb-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                    Min Stock
                                </label>
                                <input
                                    type='number'
                                    name='minStock'
                                    value={formData.minStock}
                                    onChange={handleFormChange}
                                    className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-[#2f2f2f] border-gray-700 text-white placeholder-gray-500' : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400'} focus:outline-none focus:ring-2 ${isDark ? 'focus:ring-gray-600' : 'focus:ring-gray-400'} transition text-base`}
                                />
                            </div>

                            <div className='md:col-span-2'>
                                <label className={`block text-sm font-medium mb-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                    Supplier
                                </label>
                                <select
                                    name='supplier'
                                    value={formData.supplier}
                                    onChange={handleFormChange}
                                    className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-[#2f2f2f] border-gray-700 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'} focus:outline-none focus:ring-2 ${isDark ? 'focus:ring-gray-600' : 'focus:ring-gray-400'} transition text-base`}
                                >
                                    <option value=''>Select a supplier</option>
                                    {suppliers.map(sup => (
                                        <option key={sup.id} value={sup.name}>{sup.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className='flex gap-4 mt-8'>
                            <button
                                onClick={handleCloseDialog}
                                className={`flex-1 px-6 py-3 rounded-lg font-medium text-base transition ${isDark ? 'bg-[#2a2a2a] text-gray-300 hover:bg-[#3a3a3a]' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSaveEdit}
                                className='flex-1 px-6 py-3 rounded-lg font-medium text-base text-white bg-blue-600 hover:bg-blue-700 transition'
                            >
                                Save Changes
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </motion.div>
    )
}

export default ProductsTable