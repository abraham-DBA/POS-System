"use client"

import React from 'react';
import StartsCard from './_components/StartsCard';
import { DollarSign, ShoppingBag, SquareActivity, Users } from 'lucide-react';
import { motion } from "framer-motion";
import SalesOverViewChart from './_components/SalesOverViewChart';
import CategoryDistributionChart from './_components/CategoryDistributionChart';
import OrderDistributionChart from './_components/OrderDistributionChart';
import ProductPerfoemanceChart from './_components/ProductPerfoemanceChart';

const OverviewPage = () => {
    return (
        <div className='flex-1 overflow-auto relative z-10'>
            <main className='max-w-7xl mx-auto py-4 lg:px-8'>
                <motion.div
                    className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <StartsCard name="Total Sales" icon={DollarSign} value="UGX 182,000" />
                    <StartsCard name="Total Clients" icon={Users} value="1472" />
                    <StartsCard name="Total Products" icon={ShoppingBag} value="674" />
                    <StartsCard name="Stock" icon={SquareActivity} value="1,453 " />
                </motion.div>

                <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                    <SalesOverViewChart />
                    <CategoryDistributionChart />
                    <OrderDistributionChart />
                    <ProductPerfoemanceChart />
                </div>

            </main>

        </div>
    )
}

export default OverviewPage