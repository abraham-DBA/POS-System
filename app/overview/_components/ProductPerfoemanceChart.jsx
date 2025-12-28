"use client"

import React from 'react'
import { motion } from "framer-motion";

const ProductPerfoemanceChart = () => {
    const [productPerformanceData, setProductPerformanceData] = useState(false);

    useEffect(() => {
        fetch('data/data.json')
            .then((res) => res.json())
            .then((data) => setProductPerformanceData(data.productPerformance))
    }, [])
    return (
        <motion.div
            className='bg-[#1e1e1e] backdrop-blur-lg shadow-lg rounded-xl p-4 md:p-6 border border-[#1f1f1f1] mx-2 md:mx-0'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
        >
            <h2 className='text-base md:text-xl font-semibold mb-4 text-gray-100 text-center md:text-left'>
                Product Performance</h2>

        </motion.div>
    )
}

export default ProductPerfoemanceChart