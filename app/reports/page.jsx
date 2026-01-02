'use client'

import React, { useState, useEffect } from 'react'
import { motion } from "framer-motion";
import { BarChart3, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import StartsCard from '../overview/_components/StartsCard';

const ReportsPage = () => {
  const [metrics, setMetrics] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('data/data.json')
      .then((res) => res.json())
      .then((data) => {
        setMetrics(data.businessMetrics);
        setProducts(data.products || []);
        setLoading(false);
      })
  }, [])

  if (loading) return <div className='flex-1 overflow-auto relative z-10'><div className='text-center py-10'>Loading...</div></div>

  const lastDaily = metrics.dailyMetrics[metrics.dailyMetrics.length - 1];
  const lastMonthly = metrics.monthlyMetrics[metrics.monthlyMetrics.length - 1];
  
  // Calculate expected revenue from current inventory
  const expectedRevenue = products.reduce((total, product) => {
    return total + (product.stock * product.price);
  }, 0);

  return (
    <div className='flex-1 overflow-auto relative z-10'>
      <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
        <motion.div
          className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StartsCard name="Today's Sales" icon={DollarSign} value={`$${lastDaily?.totalSales || 0}`} />
          <StartsCard name="Monthly Revenue" icon={TrendingUp} value={`$${lastMonthly?.revenue || 0}`} />
          <StartsCard name="Monthly Profit" icon={BarChart3} value={`$${lastMonthly?.profit || 0}`} />
          <StartsCard name="Expected Revenue" icon={TrendingUp} value={`$${expectedRevenue.toLocaleString()}`} />
        </motion.div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          {/* Daily Sales Report */}
          <motion.div
            className='bg-[#1e1e1e] dark:bg-[#1e1e1e] bg-white rounded-xl p-6 shadow-lg'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className='text-xl font-bold text-white dark:text-white text-gray-900 mb-4'>Daily Sales Report</h2>
            <div className='space-y-3'>
              {metrics.dailyMetrics?.slice(-7).map((day, idx) => (
                <div key={idx} className='flex justify-between items-center border-b border-gray-700 pb-2'>
                  <span className='text-gray-400 text-sm'>{day.date}</span>
                  <div className='flex gap-4 text-sm'>
                    <span className='text-green-400'>Sales: ${day.totalSales}</span>
                    <span className='text-blue-400'>Profit: ${day.totalProfit}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Monthly Report */}
          <motion.div
            className='bg-[#1e1e1e] dark:bg-[#1e1e1e] bg-white rounded-xl p-6 shadow-lg'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className='text-xl font-bold text-white dark:text-white text-gray-900 mb-4'>Monthly Performance</h2>
            <div className='space-y-3'>
              {metrics.monthlyMetrics?.map((month, idx) => (
                <div key={idx} className='flex justify-between items-center border-b border-gray-700 pb-2'>
                  <span className='text-gray-400 text-sm'>{month.month}</span>
                  <div className='flex gap-4 text-sm'>
                    <span className='text-green-400'>Revenue: ${month.revenue}</span>
                    <span className='text-blue-400'>Profit: ${month.profit}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Inventory Report */}
          <motion.div
            className='bg-[#1e1e1e] dark:bg-[#1e1e1e] bg-white rounded-xl p-6 shadow-lg'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className='text-xl font-bold text-white dark:text-white text-gray-900 mb-4'>Inventory Status</h2>
            <div className='space-y-4'>
              <div className='flex justify-between'>
                <span className='text-gray-400'>Total Items:</span>
                <span className='text-white font-semibold'>{metrics.inventoryMetrics?.totalItems}</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-400'>Total Value:</span>
                <span className='text-green-400 font-semibold'>${metrics.inventoryMetrics?.totalValue}</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-400'>Low Stock Items:</span>
                <span className='text-yellow-400 font-semibold'>{metrics.inventoryMetrics?.lowStockItems}</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-400'>Out of Stock:</span>
                <span className='text-red-400 font-semibold'>{metrics.inventoryMetrics?.outOfStockItems}</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-400'>Turnover Rate:</span>
                <span className='text-blue-400 font-semibold'>{metrics.inventoryMetrics?.turnoverRate}x</span>
              </div>
            </div>
          </motion.div>

          {/* Customer Metrics */}
          <motion.div
            className='bg-[#1e1e1e] dark:bg-[#1e1e1e] bg-white rounded-xl p-6 shadow-lg'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className='text-xl font-bold text-white dark:text-white text-gray-900 mb-4'>Customer Metrics</h2>
            <div className='space-y-4'>
              <div className='flex justify-between'>
                <span className='text-gray-400'>Total Customers:</span>
                <span className='text-white font-semibold'>{metrics.customerMetrics?.totalCustomers}</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-400'>Active Customers:</span>
                <span className='text-green-400 font-semibold'>{metrics.customerMetrics?.activeCustomers}</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-400'>Total Received:</span>
                <span className='text-green-400 font-semibold'>${metrics.customerMetrics?.totalReceivedAmount}</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-400'>Avg Order Value:</span>
                <span className='text-blue-400 font-semibold'>${metrics.customerMetrics?.averageOrderValue}</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-400'>Repeat Customers:</span>
                <span className='text-purple-400 font-semibold'>{metrics.customerMetrics?.repeatCustomers}</span>
              </div>
            </div>
          </motion.div>

          {/* Supplier Metrics */}
          <motion.div
            className='bg-[#1e1e1e] dark:bg-[#1e1e1e] bg-white rounded-xl p-6 shadow-lg'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h2 className='text-xl font-bold text-white dark:text-white text-gray-900 mb-4'>Supplier Metrics</h2>
            <div className='space-y-4'>
              <div className='flex justify-between'>
                <span className='text-gray-400'>Total Suppliers:</span>
                <span className='text-white font-semibold'>{metrics.supplierMetrics?.totalSuppliers}</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-400'>Total Owed:</span>
                <span className='text-red-400 font-semibold'>${metrics.supplierMetrics?.totalOwed}</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-400'>Paid Suppliers:</span>
                <span className='text-green-400 font-semibold'>{metrics.supplierMetrics?.paidSuppliers}</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-400'>Pending Payments:</span>
                <span className='text-yellow-400 font-semibold'>{metrics.supplierMetrics?.pendingPayments}</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-400'>Avg Payment Terms:</span>
                <span className='text-blue-400 font-semibold'>{metrics.supplierMetrics?.averagePaymentTerms}</span>
              </div>
            </div>
          </motion.div>

          {/* Cash Flow Summary */}
          <motion.div
            className='bg-[#1e1e1e] dark:bg-[#1e1e1e] bg-white rounded-xl p-6 shadow-lg lg:col-span-2'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <h2 className='text-xl font-bold text-white dark:text-white text-gray-900 mb-4'>Cash Flow Summary</h2>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
              <div className='bg-[#2a2a2a] p-4 rounded-lg'>
                <p className='text-gray-400 text-sm mb-2'>Today's Profit</p>
                <p className='text-green-400 text-2xl font-bold'>${lastDaily?.totalProfit || 0}</p>
              </div>
              <div className='bg-[#2a2a2a] p-4 rounded-lg'>
                <p className='text-gray-400 text-sm mb-2'>Today's Expenses</p>
                <p className='text-red-400 text-2xl font-bold'>${lastDaily?.totalExpenses || 0}</p>
              </div>
              <div className='bg-[#2a2a2a] p-4 rounded-lg'>
                <p className='text-gray-400 text-sm mb-2'>Monthly Profit</p>
                <p className='text-green-400 text-2xl font-bold'>${lastMonthly?.profit || 0}</p>
              </div>
              <div className='bg-[#2a2a2a] p-4 rounded-lg'>
                <p className='text-gray-400 text-sm mb-2'>Net Cash Flow</p>
                <p className='text-blue-400 text-2xl font-bold'>${(lastMonthly?.profit - lastMonthly?.expenses) || 0}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}

export default ReportsPage
