"use client";
import React, { ReactNode } from 'react'
import {
    Dialog,
    DialogContent
  } from "@/components/ui/dialog"
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'
  
type ModalProps = {
    isOpen: boolean,
    onClose: () => void,
    buttonText?: string,
    className?: string,
    handleClick?: () => void,
    title: string,
    children?: ReactNode,
    buttonIcon?: string,
    image?: string
}
const MeetingModal = ({ isOpen, onClose, buttonText, handleClick, title, children, buttonIcon, image, className }: ModalProps) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
  <DialogContent className='w-full flex max-w-[520px] flex-col gap-6 bg-dark-1 border-none px-6 py-9 text-white'>
  <div className='flex flex-colgap-6'>
    {image && (
        <div className='flex justify-center'>
            <Image src={image} alt='image' width={72} height={72}/> 
        </div>
    )}
  </div>
  <h1 className={cn('text-3xl  font-bold leading-[42px] text-white',className)}>{title}</h1>
  {children }
  <Button className='bg-blue-1 focus-visible:ring-0 focus-visible:ring-offset-0' onClick={handleClick}>
    {buttonIcon && (
        <Image src={buttonIcon} alt='icon' width={13} height={13}/>
    )} &nbsp; 
    {buttonText || 'Schedule Meeting'}
  </Button>
  </DialogContent>
</Dialog>

    )
}

export default MeetingModal