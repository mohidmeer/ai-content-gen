'use client'
import { DashboardNavMenuItems, NavMenuItems } from '@/constants';
import Link from 'next/link'
import { usePathname, useRouter } from "next/navigation"
import React from 'react'
import { IconType } from 'react-icons/lib';
import { GiArtificialHive } from "react-icons/gi";
import Logo from './Logo';
import Divider from './Divider';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from './ui/button';

interface LinkProps {
  name: string;
  icon: IconType;
  href: string;
}

const SideBar = () => {

  const pathname = usePathname();
  return (
    <aside className='hover:w-[180px] w-[100px] transition-all duration-300  border h-full bg-secondary/30  p-2 flex-shrink-0'>
      <div className='ml-2'>
      <div className='flex flex-col items-center gap-2 p-2'>
        <GiArtificialHive size={24} className="text-primary flex-shrink-0"  />
        <Link className={` font-mono font-bold text-sm `} href='/'>Truffle.Ai</Link>
      </div>

      </div>

      <div className='mt-4 flex flex-col h-screen '>
        <div className='my-4' >
          <Divider text='Dashboard'/>
        </div>
        <ul className='flex gap-4 flex-col  '>

          {
            DashboardNavMenuItems.map(({ title, href, icon: Icon }) => {

              const isActive = pathname === href || pathname.startsWith(`${href}/`)



              return (
                <Link
                  className={` text-xs font-semibold flex flex-col items-center text-center  py-2 px-2  rounded-md ${isActive ? 'bg-primary text-primary-foreground ':'hover:bg-primary/10'}  `}
                  key={href}
                  href={href} >
                  <Icon size={24} />
                  {title}
                </Link>

              )
            })
          }

        </ul>
      </div>

    </aside>
  )
}

export default SideBar





