'use client'

import React from 'react'
import { motion } from "framer-motion";
import { TrendingDown, DollarSign, Calendar, CheckCircle } from 'lucide-react';
import StartsCard from '../overview/_components/StartsCard';
import ExpensesTable from './_components/ExpensesTable';

const ExpensesPage = () => {
  return (
    <div className='flex-1 overflow-auto relative z-10'>
      <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
        <motion.div
          className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StartsCard name="Total Expenses" icon={TrendingDown} value={"$8,050"} />
          <StartsCard name="This Month" icon={DollarSign} value={"$4,750"} />
          <StartsCard name="Total Records" icon={Calendar} value={"6"} />
          <StartsCard name="Paid Expenses" icon={CheckCircle} value={"5"} />
        </motion.div>

        <ExpensesTable />
      </main>
    </div>
  )
}

export default ExpensesPage
