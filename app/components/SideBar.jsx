"use client"

import { Bell, DollarSign, House, Info, Mail, Menu, Settings, ShoppingBag, ShoppingCart, Users, Truck, FileText, BarChart3, TrendingDown, Layers } from 'lucide-react'
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

const SideBar = () => {
    const [sideBarItems, setSideBarItems] = useState([]);
    const [isSideBarOpen, setIsSideBarOpen] = useState(true);
    const pathname = usePathname();

    useEffect(() => {
        fetch("/data/data.json")
            .then((res) => res.json())
            .then((data) => setSideBarItems(data.sideBarItems));
    }, [])
    return (
        <div className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 hidden md:block
        ${isSideBarOpen ? 'w-64' : 'w-20'}`}>
            <div className='h-full dark:bg-[#1a1a1a] bg-white dark:backdrop-blur-md px-2 sm:px-3 py-4 flex flex-col dark:border-[#2f2f2f] border-gray-200 border-r'>
                <div className='flex items-center justify-between gap-2 mb-8'>
                    {isSideBarOpen && (
                        <h1 className='text-lg font-bold dark:text-white text-gray-900'>Hardware World</h1>
                    )}
                    <button onClick={() => setIsSideBarOpen(!isSideBarOpen)} className='p-2.5 rounded-lg dark:hover:bg-[#2f2f2f] hover:bg-gray-100 transition-colors cursor-pointer'>
                        <Menu size={22} />
                    </button>
                </div>
                <nav className='flex-grow space-y-1'>
                    {sideBarItems.map((item) => {
                        const IconComponent = ICONS[item.item]
                        if (!IconComponent) return null
                        return (
                            <Link key={item.name} href={item.href}>
                                <div className={`flex items-center px-3.5 py-3 text-sm font-medium rounded-lg dark:hover:bg-[#2f2f2f] hover:bg-gray-100 transition-colors
                                ${pathname === item.href ? "dark:bg-[#2f2f2f] bg-gray-100" : ""}`}>
                                    <IconComponent size={20} style={{minWidth: "20px"}} />
                                    {isSideBarOpen &&(
                                        <span className='ml-3 whitespace-nowrap'>{item.name}</span>
                                        )}
                                </div>
                            </Link>
                        )
                    })}
                </nav>
            </div>
        </div>
    )
}

export default SideBar