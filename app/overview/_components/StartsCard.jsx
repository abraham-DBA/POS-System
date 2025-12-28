"use client"

import React from 'react'
import { motion } from "framer-motion";
import { useTheme } from '../../providers/ThemeProvider';


const StartsCard = ({name, icon: Icon, value}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <motion.div 
    whileHover={{y: -5, boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)"}}
    className={`${isDark ? 'bg-[#1e1e1e] border-[#1f1f1f]' : 'bg-white border-gray-200'} backdrop-blur-md overflow-hidden shadow-lg rounded-xl border`}>
      <div className='px-4 py-5 sm:p-6'>
        <span className={`flex items-center text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          <Icon size={20} className="mr-2" />
          {name}
        </span>
        <p className={`mt-1 text-3xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{value}</p>
      </div>
    </motion.div>
  )
}

export default StartsCard;