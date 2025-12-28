"use client"

import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { useTheme } from '../../providers/ThemeProvider';

const COLORS = ["#fbc02d", "#03a9f4", "#ef4444", "#8bc34a"]

const OrderDistributionChart = () => {
    const [orderStatusData, setOrderStatusData] = useState([]);
    const { theme } = useTheme();

    useEffect(() => {
        fetch('data/data.json')
            .then((res) => res.json())
            .then((data) => setOrderStatusData(data.orderStatus))
    }, [])

    const isDark = theme === 'dark';

    return (
        <motion.div
            className={`${isDark ? 'bg-[#1e1e1e] border-[#1f1f1f]' : 'bg-white border-gray-200'} backdrop-blur-md shadow-lg rounded-xl p-4 md:p-6 border mx-2 md:mx-0 w-full`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
        >
            <h2 className={`text-base md:text-lg font-semibold mb-4 ${isDark ? 'text-gray-100' : 'text-gray-900'} text-center md:text-left`}>
                Order Status Distribution
            </h2>

            <div className='w-full h-64 md:h-80' style={{ minWidth: 0 }}>
                <ResponsiveContainer width='100%' height='100%'>
                    <PieChart>
                        <Pie
                            data={orderStatusData}
                            cx='50%'
                            cy='50%'
                            labelLine={false}
                            outerRadius={70}
                            dataKey='value'
                            label={({ name, percent }) =>
                                `${name} ${(percent * 100).toFixed(0)}%`
                            }
                        >
                            {orderStatusData.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'rgba(31 41 55 0.8)',
                                borderBlock: '4b5563',
                                borderRadius: "8px",
                                padding: '8px',
                                fontSize: "12px"
                            }}
                            itemStyle={{ color: '#e5e7eb' }}
                            cursor={{fill: 'rgba(255, 255, 255, 0.1)'}}
                        />
                        <Legend 
                        iconType='circle' 
                        layout='horizontal' 
                        align='center'
                        wrapperStyle={{ fontSize: 12 }} />
                    </PieChart>

                </ResponsiveContainer>

            </div>
        </motion.div>
    )
}

export default OrderDistributionChart