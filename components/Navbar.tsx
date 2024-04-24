import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import MobileNav from './MobileNav'
import { SignedIn, UserButton } from '@clerk/nextjs'

const Navbar = () => {
  return (
    <nav className='flex-between fixed z-50 bg-dark-1 px-6 py-4 lg:px-10 w-full'>
      <Link href={""} className='flex items-center gap-1'>
        <Image src="/icons/logo.svg" alt='Zoom logo' width={32} height={32} className='max-sm:size-10' />
        <p className='text-[26px] max-sm:hidden text-white'>Zoom</p>
      </Link>
      <div className='flex-between gap-5'>
        <SignedIn>
          <UserButton/>
        </SignedIn>
        <MobileNav />
      </div>
    </nav>
  )
}

export default Navbar