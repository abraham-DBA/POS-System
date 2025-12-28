"use client"

import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useTheme } from '../../providers/ThemeProvider';

const ProductPerfoemanceChart = () => {
    const [productPerformanceData, setProductPerformanceData] = useState([]);
    const { theme } = useTheme();

    useEffect(() => {
        fetch('data/data.json')
            .then((res) => res.json())
            .then((data) => setProductPerformanceData(data.productPerformance || []))
    }, [])

    const isDark = theme === 'dark';

    return (
        <motion.div
            className={`${isDark ? 'bg-[#1e1e1e] border-[#1f1f1f]' : 'bg-white border-gray-200'} backdrop-blur-lg shadow-lg rounded-xl p-4 md:p-6 border mx-2 md:mx-0`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
        >
            <h2 className={`text-base md:text-xl font-semibold mb-4 ${isDark ? 'text-gray-100' : 'text-gray-900'} text-center md:text-left`}>
                Product Performance
            </h2>
            <div className='w-full h-64 md:h-72'>
                <ResponsiveContainer>
                    <BarChart data={productPerformanceData}>
                        <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#374151' : '#e5e7eb'} />
                        <XAxis
                        dataKey='name'
                        stroke={isDark ? '#9ca3af' : '#6b7280'}
                        tick={{fontSize: 12}}
                        interval='preserveStartEnd'
                        />
                        <YAxis 
                        stroke={isDark ? '#9ca3af' : '#6b7280'}
                        tick={{fontSize: 12}} 
                        width={40}
                        />
                        <Tooltip 
                        contentStyle={{
                            backgroundColor: isDark ? 'rgba(31, 41, 55, 0.8)' : 'rgba(249, 250, 251, 0.9)',
                            borderColor: isDark ? '#4b5563' : '#e5e7eb',
                            fontSize: '12px'
                        }}
                        itemStyle={{color: isDark ? '#e5e7eb' : '#1f2937'}}
                        />

                        <Legend wrapperStyle={{fontSize: 12}} />

                        <Bar 
                        dataKey='Retention'
                        fill='#ff7043'
                        radius={[4,4,0,0]}
                        barSize={20}
                        />
                        <Bar 
                        dataKey='Revenue'
                        fill='#29b6f6'
                        radius={[4,4,0,0]}
                        barSize={20}
                        />
                        <Bar 
                        dataKey='Profit'
                        fill='#66bb6a'
                        radius={[4,4,0,0]}
                        barSize={20}
                        />

                    </BarChart>
                </ResponsiveContainer>

            </div>

        </motion.div>
    )
}

export default ProductPerfoemanceChart