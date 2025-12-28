"use client"

import React from 'react'
import { motion } from "framer-motion";
import { ShoppingBag, SquareActivity, DollarSign, BarChart3 } from 'lucide-react';
import StartsCard from '../overview/_components/StartsCard';
import ClientsTable from './_components/ClientsTable';

const ClientsPage = () => {
  return (
    <div className='flex-1 overflow-auto relative z-10'>
            <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
                <motion.div
                    className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <StartsCard name="Total Clients" icon={ShoppingBag} value={"7,456"} />
                    <StartsCard name="New Clients" icon={SquareActivity} value={"860"} />
                    <StartsCard name="Active Clients" icon={DollarSign} value={"4080"} />
                    <StartsCard name="Returning Clients" icon={BarChart3} value={"2760"} />

                </motion.div>

                <ClientsTable />
            </main>
        </div>
  )
}

export default ClientsPage