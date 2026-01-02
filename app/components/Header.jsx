'use client'

import { Bell, Moon, Sun, LogOut } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'
import { useTheme } from '../providers/ThemeProvider'
import { UserButton } from '@clerk/nextjs'

const Header = () => {
    const { theme, toggleTheme, mounted } = useTheme()
    const [showLogout, setShowLogout] = useState(false)

    if (!mounted) return null

    return (
        <header className="dark:bg-[#1e1e1e] bg-gray-50 shadow-lg dark:border-[#1f1f1f] border-gray-200 border-b mx-2 sm:mx-3 md:mx-4 lg:mx-6 mt-2 sm:mt-3 md:mt-4 mb-2 rounded-lg">
            <div className='max-w-7xl mx-auto py-3 sm:py-4 px-3 sm:px-4 md:px-6 flex items-center justify-between'>
                <h1 className='text-base sm:text-lg md:text-xl lg:text-2xl font-semibold dark:text-gray-100 text-gray-900'>
                    Dashboard
                </h1>

                <div className='flex items-center space-x-2 sm:space-x-3 md:space-x-4 lg:space-x-6'>
                    <button
                        onClick={toggleTheme}
                        className='p-1.5 sm:p-2 hover:bg-gray-200 dark:hover:bg-[#2a2a2a] rounded-lg transition'
                        aria-label="Toggle theme"
                    >
                        {theme === 'dark' ? (
                            <Sun size={18} className='text-yellow-400 sm:w-5' />
                        ) : (
                            <Moon size={18} className='text-gray-600 sm:w-5' />
                        )}
                    </button>

                    <Image
                        src="/uganda.png"
                        alt='country flag'
                        width={22}
                        height={16}
                        style={{ width: 'auto', height: 'auto' }}
                        className='rounded-full shadow-md cursor-pointer hidden sm:block'
                    />

                    <div className='relative hidden sm:block'>
                        <Bell className='w-5 h-5 dark:text-gray-300 text-gray-600 cursor-pointer hover:dark:text-white hover:text-gray-900' />
                    </div>

                    <div className='relative'>
                        <UserButton 
                            appearance={{
                                elements: {
                                    avatarBox: 'w-9 h-9 sm:w-10 sm:h-10'
                                }
                            }}
                            userProfileMode="modal"
                        />
                    </div>

                </div>

            </div>
        </header>
    )
}

export default Header