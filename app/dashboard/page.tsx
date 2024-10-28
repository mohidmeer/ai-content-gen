import Header from "@/components/Header"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const Dashboard = () => {
  return (
    <div className="grid grid-cols-12 grid-rows-12 gap-6" >
      <div className="p-4 rounded-xl bg-primary text-primary-foreground col-span-full ">
        <div className="w-1/3 flex flex-col gap-2">
          <h1 className="text-4xl whitespace-nowrap ">Generate viral-ready content in seconds</h1>
          <p className="font-semibold" >Transform your videos effortlessly with AI-powered voiceovers, captivating subtitles, and streamlined editing for all your creative needs</p>
          <Button asChild className="w-1/2" variant={'secondary'}>
            <Link href={'/dashboard/content-generation'} className="text-lg flex items-center">
              <p>Start Creating</p>
            </Link>
          </Button>
        </div>
        

      </div>
      <div className="bg-primary p-2 col-span-6  rounded-xl row-span-1 " />
      <div className="bg-primary p-2 col-span-3  rounded-xl row-span-2 " />
      <div className="bg-primary p-2 col-span-3  rounded-xl row-span-2 " />
      <div className="bg-primary p-2 col-span-6  rounded-xl row-span-2 " />
      <div className="bg-primary p-2 col-span-6  rounded-xl row-span-2 " />
      <div className="bg-primary p-2 col-span-3  rounded-xl " />
      <div className="bg-primary p-2 col-span-3  rounded-xl " />
      

    </div>
  )
}

export default Dashboard
