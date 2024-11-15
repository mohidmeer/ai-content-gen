'use client'
import { handleSignOut } from "@/actions/auth.actions";
import { useSession } from "@/components/SessionProvider";
import SideBar from "@/components/SideBar";
import { ThemeSwitch } from "@/components/ThemeSwitch";
import { Button } from "@/components/ui/button";
import { FaUserAlt } from "react-icons/fa";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import Image from "next/image";
import Link from "next/link";
import { MdSettings } from "react-icons/md";
import { ReactNode } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  
  return (
    <div className="flex">
      <SideBar />

      <div className="w-full">

        <div className="border-b p-2 w-full flex items-center">
          <div className="ml-auto flex items-center gap-2">
            
            <Profile />
            <ThemeSwitch />
          </div>
        </div>

        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}


function Profile() {
  const session = useSession();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="bg-primary text-primary-foreground" >
          {session?.user?.name[0]}
        </Button>
      </PopoverTrigger>
      <PopoverContent  >

        <div className=" text-sm mb-4">
          <p className="text-xl">{session?.user?.name}</p>
          <p>{session?.user?.email}</p>
        </div>
        <div className="flex flex-col gap-2">
          <Button asChild className="justify-start gap-2" variant={'ghost'}>
            <Link href={'/profile'} className="text-lg flex items-center">
              <IconWrapper size={20}>
                <FaUserAlt size={12} />
              </IconWrapper>
              <p>Profile</p>
            </Link>
          </Button>
          <Button asChild className="justify-start gap-2" variant={'ghost'}>
            <Link href={'/settings'} className="text-lg flex items-center">
              <IconWrapper size={20}>
                <MdSettings />
              </IconWrapper>
              <p>Settings</p>
            </Link>
          </Button>

          <Button variant={'destructive'} className="w-full" onClick={() => { handleSignOut() }} >
            Logout
          </Button>
        </div>

      </PopoverContent>
    </Popover>
  )

}


interface IconWrapperProps {
  children: ReactNode;
  size?: number;
}

const IconWrapper: React.FC<IconWrapperProps> = ({ children, size = 20 }) => {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: size,
        height: size,
      }}
    >
      {children}
    </span>
  );
};