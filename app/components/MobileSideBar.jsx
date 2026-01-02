"use client"

import { Bell, DollarSign, House, Info, Mail, Menu, Settings, ShoppingBag, ShoppingCart, Users, Truck, FileText, BarChart3, TrendingDown, Layers, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const ICONS = {
    House,
    DollarSign,
    Settings,
    ShoppingBag,
    ShoppingCart,
    Mail,
    Users,
    Bell,
    Info,
    Truck,
    FileText,
    BarChart3,
    TrendingDown,
    Layers
}

const MobileSideBar = () => {
    const [sideBarItems, setSideBarItems] = useState([]);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        fetch("/data/data.json")
            .then((res) => res.json())
            .then((data) => setSideBarItems(data.sideBarItems));
    }, [])

    const handleNavigation = () => {
        setIsMobileMenuOpen(false);
    }

    return (
        <>
            {/* Mobile menu button - only visible on small screens */}
            <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className='md:hidden fixed top-4 left-4 z-40 p-2 rounded-lg dark:hover:bg-[#2f2f2f] hover:bg-gray-100 transition-colors dark:bg-[#1a1a1a] bg-white'
            >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Mobile sidebar overlay */}
            {isMobileMenuOpen && (
                <div className='md:hidden fixed inset-0 z-30 bg-black/50' onClick={() => setIsMobileMenuOpen(false)} />
            )}

            {/* Mobile sidebar */}
            <div className={`md:hidden fixed left-0 top-0 h-full z-40 transition-transform duration-300 ease-in-out ${
                isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
            } w-64`}>
                <div className='h-full dark:bg-[#1a1a1a] bg-white dark:backdrop-blur-md px-3 py-4 flex flex-col dark:border-[#2f2f2f] border-gray-200 border-r overflow-y-auto'>
                    <div className='flex items-center justify-between gap-2 mb-8'>
                        <h1 className='text-lg font-bold dark:text-white text-gray-900'>Hardware World</h1>
                        <button 
                            onClick={() => setIsMobileMenuOpen(false)}
                            className='p-2.5 rounded-lg dark:hover:bg-[#2f2f2f] hover:bg-gray-100 transition-colors'
                        >
                            <X size={20} />
                        </button>
                    </div>
                    
                    <nav className='flex-grow space-y-1'>
                        {sideBarItems.map((item) => {
                            const IconComponent = ICONS[item.item]
                            if (!IconComponent) return null
                            return (
                                <Link key={item.name} href={item.href} onClick={handleNavigation}>
                                    <div className={`flex items-center px-3.5 py-3 text-sm font-medium rounded-lg dark:hover:bg-[#2f2f2f] hover:bg-gray-100 transition-colors
                                    ${pathname === item.href ? "dark:bg-[#2f2f2f] bg-gray-100" : ""}`}>
                                        <IconComponent size={20} style={{minWidth: "20px"}} />
                                        <span className='ml-3'>{item.name}</span>
                                    </div>
                                </Link>
                            )
                        })}
                    </nav>
                </div>
            </div>
        </>
    )
}

export default MobileSideBar
