'use client'

import React from 'react'
import { motion } from "framer-motion";
import StartsCard from '../overview/_components/StartsCard';
import InvoicesTable from './_components/InvoicesTable';
import { FileText, DollarSign, Clock, AlertCircle } from 'lucide-react';

const InvoicesPage = () => {
  return (
    <div className='flex-1 overflow-auto relative z-10'>
      <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
        <motion.div
          className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StartsCard name="Total Invoices" icon={FileText} value={"245"} />
          <StartsCard name="Total Amount" icon={DollarSign} value={"$145,600"} />
          <StartsCard name="Pending" icon={Clock} value={"32"} />
          <StartsCard name="Overdue" icon={AlertCircle} value={"8"} />
        </motion.div>

        <InvoicesTable />
      </main>
    </div>
  )
}

export default InvoicesPage