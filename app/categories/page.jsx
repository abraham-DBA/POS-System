'use client'

import React, { useState, useEffect } from 'react'
import { motion } from "framer-motion";
import { Layers, TrendingUp, Package, AlertCircle } from 'lucide-react';
import StartsCard from '../overview/_components/StartsCard';
import CategoriesTable from './_components/CategoriesTable';

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('data/data.json')
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.categories || []);
        setLoading(false);
      })
  }, [])

  if (loading) return <div className='flex-1 overflow-auto relative z-10'><div className='text-center py-10'>Loading...</div></div>

  const totalCategories = categories.length;

  return (
    <div className='flex-1 overflow-auto relative z-10'>
      <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
        <motion.div
          className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StartsCard name="Total Categories" icon={Layers} value={totalCategories} />
          <StartsCard name="Smartphones" icon={Package} value="4" />
          <StartsCard name="Tablets" icon={Package} value="0" />
          <StartsCard name="Accessories" icon={Package} value="2" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <CategoriesTable />
        </motion.div>
      </main>
    </div>
  )
}

export default CategoriesPage
