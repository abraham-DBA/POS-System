"use client"

import { Bell, DollarSign, House, Info, Mail, Menu, Settings, ShoppingBag, ShoppingCart, Users } from 'lucide-react'
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
    Info
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
        <div className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 
        ${isSideBarOpen ? 'w-64' : 'w-20'}`}>
            <div className='h-full bg-[#1a1a1a] backdrop-blur-md p-4 flex flex-col border-r border-[#2f2f2f]'>
                <button onClick={() => setIsSideBarOpen(!isSideBarOpen)} className='p-2 rounded-full hover:bg-[#2f2f2f] transition-colors max-w-fit cursor-pointer'>
                    <Menu size={24} />
                </button>
                <nav className='mt-8 flex-grow'>
                    {sideBarItems.map((item) => {
                        const IconComponent = ICONS[item.item]
                        return (
                            <Link key={item.name} href={item.href}>
                                <div className={`flex items-center p-4 text-sm font-medium rounded-lg hover:bg-[#2f2f2f] transition-colors mb-2 
                                ${pathname === item.href ? "bg-[#2f2f2f]" : ""}`}>
                                    <IconComponent size={20} style={{minWidth: "20px"}} />
                                    {isSideBarOpen &&(
                                        <span className='ml-4 whitespace-nowrap'>{item.name}</span>
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