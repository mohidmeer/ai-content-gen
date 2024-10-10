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
    <aside className='w-[300px] border h-screen bg-secondary/30  p-2 flex-shrink-0'>
      <div className='ml-2'>
        <Logo />

      </div>

      <div className='mt-8 flex flex-col h-screen '>
        <div className='my-4' >
          <Divider text='Dashboard'/>
        </div>
        <ul className='flex gap-1 flex-col  '>

          {
            DashboardNavMenuItems.map(({ title, href, icon: Icon }) => {

              const isActive = pathname === href || pathname.startsWith(`${href}/`)



              return (
                <Link
                  className={` text-xs font-semibold flex items-center gap-2 py-2 px-2  rounded-md ${isActive ? 'bg-primary text-primary-foreground ':'hover:bg-primary/10'}  `}
                  key={href}
                  href={href} >
                  <Icon size={18} />
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





