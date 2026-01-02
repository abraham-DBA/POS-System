'use client'

import React, { useState, useEffect } from 'react'
import { motion } from "framer-motion";
import { Edit, Search, Trash2, X } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useTheme } from '../../providers/ThemeProvider';

const CategoriesTable = () => {

    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [formData, setFormData] = useState({ name: '', description: '' });
    const { theme } = useTheme();

    useEffect(() => {
        fetch('data/data.json')
            .then((res) => res.json())
            .then((data) => setCategories(data.categories || []))
    }, [])

    const filteredCategories = categories.filter((category) =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const isDark = theme === 'dark';

    const handleEditClick = (category) => {
        setEditingCategory(category);
        setFormData({
            name: category.name,
            description: category.description
        });
        setIsDialogOpen(true);
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSaveEdit = () => {
        const updatedCategories = categories.map(category =>
            category.id === editingCategory.id
                ? { ...category, ...formData }
                : category
        );
        setCategories(updatedCategories);
        setIsDialogOpen(false);
        setEditingCategory(null);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setEditingCategory(null);
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
                    Categories
                </h2>

                <div className={`relative w-full md:w-64`}>
                    <input
                        type='text'
                        placeholder='search categories...'
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
                            <TableHead className={`w-[150px] sm:w-[200px] ${isDark ? 'text-white' : 'text-gray-900'} font-bold text-sm md:text-base`}>Name</TableHead>
                            <TableHead className={`${isDark ? 'text-white' : 'text-gray-900'} font-bold text-sm md:text-base`}>Description</TableHead>
                            <TableHead className={`text-right ${isDark ? 'text-white' : 'text-gray-900'} font-bold text-sm md:text-base`}>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredCategories.length > 0 ? (
                            filteredCategories.map((category) => (
                                <TableRow key={category.id} className={`${isDark ? 'hover:bg-[#2a2a2a]' : 'hover:bg-gray-50'} transition duration-200`}>
                                    <TableCell className="font-medium">
                                        <div className={`text-xs sm:text-sm font-medium ${isDark ? 'text-gray-100' : 'text-gray-900'} truncate`}>
                                            {category.name}
                                        </div>
                                    </TableCell>
                                    <TableCell className={`text-xs sm:text-sm ${isDark ? 'text-gray-200' : 'text-gray-700'} max-w-xs truncate`}>{category.description}</TableCell>
                                    <TableCell className="text-right">
                                        <div className='flex justify-end gap-2'>
                                            <button onClick={() => handleEditClick(category)} className={`p-1 ${isDark ? 'hover:bg-[#3a3a3a]' : 'hover:bg-gray-200'} rounded transition`}>
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
                                <TableCell colSpan="5" className={`text-center py-8 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                    No categories found
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Edit Dialog */}
            {isDialogOpen && (
                <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
                    <motion.div
                        className={`${isDark ? 'bg-[#1e1e1e]' : 'bg-white'} rounded-lg shadow-lg p-8 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto`}
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className='flex justify-between items-center mb-8'>
                            <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                Edit Category
                            </h3>
                            <button
                                onClick={handleCloseDialog}
                                className={`p-2 rounded transition ${isDark ? 'hover:bg-[#2a2a2a]' : 'hover:bg-gray-100'}`}
                            >
                                <X size={24} className={isDark ? 'text-gray-400' : 'text-gray-600'} />
                            </button>
                        </div>

                        <div className='grid grid-cols-1 gap-6'>
                            <div>
                                <label className={`block text-sm font-medium mb-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                    Category Name
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
                                    Description
                                </label>
                                <textarea
                                    name='description'
                                    value={formData.description}
                                    onChange={handleFormChange}
                                    rows='4'
                                    className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-[#2f2f2f] border-gray-700 text-white placeholder-gray-500' : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400'} focus:outline-none focus:ring-2 ${isDark ? 'focus:ring-gray-600' : 'focus:ring-gray-400'} transition text-base`}
                                />
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

export default CategoriesTable
