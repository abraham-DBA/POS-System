"use client"

import React, { useState, useEffect } from 'react';
import StartsCard from './_components/StartsCard';
import { DollarSign, ShoppingBag, Users, TrendingUp } from 'lucide-react';
import { motion } from "framer-motion";
import { useTheme } from '../providers/ThemeProvider';
import SalesOverViewChart from './_components/SalesOverViewChart';
import CategoryDistributionChart from './_components/CategoryDistributionChart';
import OrderDistributionChart from './_components/OrderDistributionChart';
import ProductPerfoemanceChart from './_components/ProductPerfoemanceChart';

const OverviewPage = () => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('data/data.json')
            .then((res) => res.json())
            .then((data) => {
                setData(data);
                setLoading(false);
            })
    }, [])

    if (loading) return <div className='flex-1 overflow-auto relative z-10'><div className='text-center py-10'>Loading...</div></div>

    // Calculate metrics from data
    const totalSales = data.salesTransactions?.reduce((sum, trans) => sum + trans.totalPrice, 0) || 0;
    const totalProfit = data.salesTransactions?.reduce((sum, trans) => sum + trans.profit, 0) || 0;
    const totalClients = data.clients?.length || 0;
    const totalProducts = data.products?.length || 0;
    const totalStock = data.products?.reduce((sum, prod) => sum + prod.stock, 0) || 0;
    const totalCategories = data.categories?.length || 0;

    return (
        <div className='relative z-10'>
            <div className='w-full'>
                <motion.div
                    className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 mb-6 sm:mb-8'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <StartsCard name="Total Sales" icon={DollarSign} value={`$${totalSales.toLocaleString()}`} />
                    <StartsCard name="Total Profit" icon={TrendingUp} value={`$${totalProfit.toLocaleString()}`} />
                    <StartsCard name="Total Clients" icon={Users} value={totalClients} />
                    <StartsCard name="Total Products" icon={ShoppingBag} value={totalProducts} />
                </motion.div>

                <motion.div 
                    className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 mb-6 sm:mb-8'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 1 }}
                >
                    <StartsCard name="Total Stock" icon={ShoppingBag} value={totalStock} />
                    <StartsCard name="Categories" icon={ShoppingBag} value={totalCategories} />
                    <StartsCard name="Total Debtors" icon={Users} value={data.debtors?.length || 0} />
                    <StartsCard name="Total Suppliers" icon={Users} value={data.suppliers?.length || 0} />
                </motion.div>

                {/* Recent Orders & Low Stock Section */}
                <motion.div 
                    className='grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-8'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 1 }}
                >
                    {/* Recent Orders */}
                    <div className={`${isDark ? 'bg-[#1e1e1e] border-[#1f1f1f]' : 'bg-white border-gray-200'} rounded-lg p-6 border`}>
                        <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>Recent Orders (Last 3)</h3>
                        <div className='space-y-3 max-h-96 overflow-y-auto'>
                            {data.salesTransactions?.slice(0, 3).map((order, idx) => (
                                <div key={idx} className={`flex justify-between items-center p-3 rounded hover:opacity-70 transition ${isDark ? 'bg-gray-700 bg-opacity-50' : 'bg-gray-100'}`}>
                                    <div className='flex-1'>
                                        <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{order.clientName || 'Unknown'}</p>
                                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{order.date || 'N/A'}</p>
                                    </div>
                                    <span className={`text-sm font-semibold ${isDark ? 'text-green-400' : 'text-green-600'}`}>${order.totalPrice?.toLocaleString() || 0}</span>
                                </div>
                            ))}
                            {(!data.salesTransactions || data.salesTransactions.length === 0) && (
                                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>No orders yet</p>
                            )}
                        </div>
                    </div>

                    {/* Low Stock Products */}
                    <div className={`${isDark ? 'bg-[#1e1e1e] border-[#1f1f1f]' : 'bg-white border-gray-200'} rounded-lg p-6 border`}>
                        <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>Low Stock Products</h3>
                        <div className='space-y-3 max-h-96 overflow-y-auto'>
                            {data.products?.filter(prod => prod.stock < prod.minStock).map((product, idx) => (
                                <div key={idx} className={`flex justify-between items-center p-3 rounded hover:opacity-70 transition ${isDark ? 'bg-gray-700 bg-opacity-50' : 'bg-gray-100'}`}>
                                    <div className='flex-1'>
                                        <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{product.name}</p>
                                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Stock: {product.stock} / Min: {product.minStock}</p>
                                    </div>
                                    <span className={`text-xs font-semibold px-2 py-1 rounded ${isDark ? 'text-red-400 bg-red-900 bg-opacity-30' : 'text-red-600 bg-red-100'}`}>Low</span>
                                </div>
                            ))}
                            {(!data.products?.some(p => p.stock < p.minStock)) && (
                                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>All products in stock</p>
                            )}
                        </div>
                    </div>
                </motion.div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8'>
                    <SalesOverViewChart />
                    <CategoryDistributionChart />
                    <OrderDistributionChart />
                    <ProductPerfoemanceChart />
                </div>

            </div>

        </div>
    )
}

export default OverviewPage