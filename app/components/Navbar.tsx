'use client'

import React from 'react'
import Link from 'next/link'
import { FiShoppingBag } from 'react-icons/fi'
import { usePathname } from 'next/navigation'
import { clsx } from 'clsx'

const Navbar = () => {
    const pathname = usePathname()

    return (
        <div className="text-2xl fixed flex items-center justify-around bottom-0 left-0 w-full dark:bg-stone-900 bg-stone-200">
            <Link
                href="/"
                className={clsx(
                    'gap-2 h-full p-4 flex flex-col items-center justify-center',
                    {
                        'text-blue-500': pathname === '/',
                    },
                )}
            >
                <FiShoppingBag />
            </Link>
        </div>
    )
}

export default Navbar