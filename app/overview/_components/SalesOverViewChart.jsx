"use client"

import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useTheme } from '../../providers/ThemeProvider';

const SalesOverViewChart = () => {
    const [salesData, setSalesData] = useState([]);
    const { theme } = useTheme();

    useEffect(() => {
        fetch('data/data.json')
            .then((res) => res.json())
            .then((data) => setSalesData(data.sales))
    }, [])

    const isDark = theme === 'dark';

    return (
        <motion.div
            className={`${isDark ? 'bg-[#1e1e1e] border-[#1f1f1f]' : 'bg-white border-gray-200'} backdrop-blur-md shadow-lg rounded-xl p-4 md:p-6 border mx-2 md:mx-0`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
        >
            <h2 className={`text-base md:text-lg font-medium mb-4 ${isDark ? 'text-gray-100' : 'text-gray-900'} text-center md:text-left`}>
                Sales Overview
            </h2>

            <div className='h-64 md:h-80'>
                <ResponsiveContainer width='100%' height='100%'>
                    <LineChart data={salesData}>
                        <CartesianGrid strokeDasharray='3 3' stroke={isDark ? '#4b5563' : '#e5e7eb'} />
                        <XAxis
                            dataKey='name'
                            stroke={isDark ? '#9ca3af' : '#6b7280'}
                            tick={{ fontSize: 12 }}
                            interval='preserveStartEnd'
                        />

                        <YAxis stroke={isDark ? '#9ca3af' : '#6b7280'} tick={{ fontSize: 12 }} width={40} />
                        <Tooltip contentStyle={{
                            backgroundColor: isDark ? "rgba(31, 41, 51, 0.8)" : "rgba(249, 250, 251, 0.9)",
                            borderColor: isDark ? '#4b5563' : '#e5e7eb',
                            fontSize: '12px'
                        }}
                            itemStyle={{ color: isDark ? "#e5e7eb" : "#1f2937" }}
                        />
                        <Line type="monotone" dataKey="sales" stroke='#9c27b0' strokeWidth={3}
                            dot={{ fill: '#9c27b0', strokeWidth: 2, r: 4 }}
                            activeDot={{ r: 6, strokeWidth: 2 }}
                        />

                    </LineChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    )
}

export default SalesOverViewChart