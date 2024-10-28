import Header from '@/components/Header'
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FaTiktok } from 'react-icons/fa'
import { SiYoutubeshorts } from "react-icons/si";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

const History = () => {
  return (
    <div>
      <Header title='Topic Research' />


      <Tabs defaultValue="tiktok" className="mt-10">
        <TabsList>
          <TabsTrigger value="tiktok" className='flex items-center gap-2'>Tik Tok <FaTiktok /> </TabsTrigger>
          <TabsTrigger value="youtube" className='flex items-center gap-2'>Youtube Shorts <SiYoutubeshorts /> </TabsTrigger>
        </TabsList>
        <TabsContent value="tiktok">
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input type="text" placeholder="viral tiktoks" />
            <Button type="submit">Search</Button>
          </div>
          <div className='h-full border w-full p-4 mt-4 rounded-md border-dashed'>
            <div className='grid grid-cols-5 gap-8'>
              <TikTokLoader/>
            </div>
          </div>

        </TabsContent>
        <TabsContent value="youtube" className=' '>
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input type="text" placeholder="viral shorts" />
            <Button type="submit">Search</Button>
          </div>
          <div className='h-full border w-full p-4 mt-4 rounded-md border-dashed'>
            <div className='grid grid-cols-5 gap-8'>
              <YoutubeLoader />

            </div>
          </div>
        </TabsContent>

      </Tabs>


    </div>
  )
}

export default History


function YoutubeLoader() {


  const Loader = []

  for (let i = 1; i < 15; i++) {
    Loader.push(
      <div className=''>
        <Skeleton className="h-[160px] w-full rounded-xl" />
        <div className='flex items-center gap-4 mt-4 '>
          <Skeleton className="h-[30px] w-[30px] rounded-full flex-shrink-0" />
          <Skeleton className="h-[20px] w-full rounded-full" />
        </div>

          <Skeleton className="h-[20px] w-1/2 rounded-full ml-12" />
      
      </div>
    )
  }


  return <>{Loader}</>;
}

function TikTokLoader() {
  const Loader = [];

  for (let i = 1; i <= 10; i++) {
    Loader.push(
      <div className="flex flex-col gap-3" key={i}>
        <Skeleton className="h-[500px] w-full rounded-lg" />
        <div className="flex flex-col gap-2 px-2">
          <Skeleton className="h-[20px] w-3/4 rounded-full" />
          <Skeleton className="h-[20px] w-1/2 rounded-full" />
        </div>
      </div>
    );
  }

  return <>{Loader}</>;
}