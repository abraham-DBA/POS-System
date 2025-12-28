'use client'

import { Bell, Moon, Sun } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { useTheme } from '../providers/ThemeProvider'

const Header = () => {
    const { theme, toggleTheme, mounted } = useTheme()

    if (!mounted) return null

    return (
        <header className="dark:bg-[#1e1e1e] bg-gray-50 shadow-lg dark:border-[#1f1f1f] border-gray-200 border-b mx-4 sm:mx-6 lg:mx-8 mt-4 mb-2 rounded-lg">
            <div className='max-w-7xl mx-auto py-4 px-4 sm:px-6 flex items-center justify-between'>
                <h1 className='text-lg sm:text-xl lg:text-2xl font-semibold dark:text-gray-100 text-gray-900'>
                    Dashboard
                </h1>

                <div className='flex items-center space-x-3 sm:space-x-6'>
                    <button
                        onClick={toggleTheme}
                        className='p-2 hover:bg-gray-200 dark:hover:bg-[#2a2a2a] rounded-lg transition'
                        aria-label="Toggle theme"
                    >
                        {theme === 'dark' ? (
                            <Sun size={20} className='text-yellow-400' />
                        ) : (
                            <Moon size={20} className='text-gray-600' />
                        )}
                    </button>

                    <Image
                        src="/uganda.png"
                        alt='country flag'
                        width={25}
                        height={18}
                        className='rounded-full shadow-md cursor-pointer'
                    />

                    <div className='relative'>
                        <Bell className='w-5 sm:w-6 sm:h-6 dark:text-gray-300 text-gray-600 cursor-pointer hover:dark:text-white hover:text-gray-900' />
                    </div>

                    <div className='flex items-center space-x-2 sm:space-x-3'>
                        <Image src="/profile.png" alt='admin' width={35} height={35} className='rounded-full dark:border-gray-600 border-gray-300 border' />
                        <span className='hidden sm:block dark:text-gray-100 text-gray-900 font-medium'>
                            Moko Sam
                        </span>
                    </div>

                </div>

            </div>
        </header>
    )
}

export default Header