'use client'

import React from 'react'
import { motion } from "framer-motion";
import { DollarSign, User, AlertCircle, TrendingDown } from 'lucide-react';
import StartsCard from '../overview/_components/StartsCard';
import DebtorsTable from './_components/DebtorsTable';

const DebtorsPage = () => {
  return (
    <div className='flex-1 overflow-auto relative z-10'>
      <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
        <motion.div
          className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StartsCard name="Total Debtors" icon={User} value={"1,245"} />
          <StartsCard name="Total Debt" icon={DollarSign} value={"$245,600"} />
          <StartsCard name="Overdue Accounts" icon={AlertCircle} value={"342"} />
          <StartsCard name="Debt Recovery Rate" icon={TrendingDown} value={"78%"} />
        </motion.div>

        <DebtorsTable />
      </main>
    </div>
  )
}

export default DebtorsPage