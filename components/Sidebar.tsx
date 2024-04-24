"use client"
import { SidebarOptions } from '@/constants'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Sidebar = () => {
    const pathname = usePathname();
    return (
        <section className='sticky left-0 top-0 flex h-screen flex-col justify-between max-sm:hidden lg:w-[264px] bg-dark-1 p-6 pt-20 text-white w-fit'>

            <div className='flex flex-1 flex-col gap-6'>
                {SidebarOptions.map(link => {
                    const isActive = pathname === link.route || pathname.substring(1).startsWith(link.route);
                    return <Link href={link.route} key={link.label} className={cn('flex gap-4 items-center p-4 rounded-lg justify-start', { 'bg-blue-600': isActive })}><Image src={link.imageUrl} alt={link.label} width={24} height={24} />
                        <p className='font-semibold text-lg max-lg:hidden'>{link.label}</p>
                    </Link>
                })}
            </div>

        </section>
    )
}

export default Sidebar