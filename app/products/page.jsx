'use client'

import React from 'react'
import { motion } from "framer-motion";
import StartsCard from '../overview/_components/StartsCard';
import { ChartBarStackedIcon, DollarSign, ShoppingBag, SquareActivity } from 'lucide-react';
import ProductsTable from './_components/ProductsTable';

const ProductsPage = () => {
    return (
        <div className='flex-1 overflow-auto relative z-10'>
            <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
                <motion.div
                    className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <StartsCard name="Total Products" icon={ShoppingBag} value={"4,532"} />
                    <StartsCard name="Total Stock" icon={SquareActivity} value={"18,450"} />
                    <StartsCard name="Total Sold" icon={DollarSign} value={"10,600"} />
                    <StartsCard name="Low Stock" icon={ChartBarStackedIcon} value={"8"} />

                </motion.div>

                <ProductsTable />
            </main>
        </div>
    )
}

export default ProductsPage