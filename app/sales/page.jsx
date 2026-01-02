'use client'

import React from 'react'
import { motion } from "framer-motion";
import StartsCard from '../overview/_components/StartsCard';
import SalesTable from './_components/SalesTable';
import { BarChart3, DollarSign, ShoppingBag, SquareActivity, TrendingUp } from 'lucide-react';

const SalesPage = () => {
  return (
    <div className='flex-1 overflow-auto relative z-10'>
            <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
                <motion.div
                    className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-8'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <StartsCard name="Total Sales" icon={ShoppingBag} value={"12,845"} />
                    <StartsCard name="New Orders" icon={SquareActivity} value={"1,240"} />
                    <StartsCard name="Total Revenue" icon={DollarSign} value={"$89,650"} />
                    <StartsCard name="Pending Orders" icon={BarChart3} value={"456"} />
                    <StartsCard name="Total Profit" icon={TrendingUp} value={"$34,280"} />

                </motion.div>

                <SalesTable />
            </main>
        </div>
  )
}

export default SalesPage