import SideBar from "@/components/SideBar";
import { ThemeSwitch } from "@/components/ThemeSwitch";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

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
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="bg-primary text-primary-foreground" >
          M
        </Button>
      </PopoverTrigger>
      <PopoverContent>Place content for the popover here.</PopoverContent>
    </Popover>
  )

}
