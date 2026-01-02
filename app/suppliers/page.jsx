'use client'

import React from 'react'
import { motion } from "framer-motion";
import { Truck, DollarSign, AlertCircle, Clock } from 'lucide-react';
import StartsCard from '../overview/_components/StartsCard';
import SuppliersTable from './_components/SuppliersTable';

const SuppliersPage = () => {
  return (
    <div className='flex-1 overflow-auto relative z-10'>
      <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
        <motion.div
          className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StartsCard name="Total Suppliers" icon={Truck} value={"5"} />
          <StartsCard name="Total Owed" icon={DollarSign} value={"$99,000"} />
          <StartsCard name="Pending Payments" icon={AlertCircle} value={"3"} />
          <StartsCard name="Avg Payment Terms" icon={Clock} value={"Net 41"} />
        </motion.div>

        <SuppliersTable />
      </main>
    </div>
  )
}

export default SuppliersPage
