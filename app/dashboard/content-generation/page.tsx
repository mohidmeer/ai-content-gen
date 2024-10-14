"use client"
import Header from '@/components/Header'
import React, { useState } from 'react'
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import ProgressBar from '@/components/ProgressBar';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import ContentTextEditor from '@/components/ContentTextEditor';
import { MdRepeat } from 'react-icons/md';
import { TbPlayerTrackNextFilled } from "react-icons/tb";
const scriptTypes = [
  { label: "Comedy/Funny", value: "comedy" },
  { label: "Lifestyle", value: "lifestyle" },
  { label: "Drama", value: "drama" },
  { label: "Sci-Fi", value: "sci-fi" },
  { label: "Adventure", value: "adventure" },
  { label: "Mystery", value: "mystery" },
  { label: "Romance", value: "romance" },
  { label: "Thriller", value: "thriller" },
  { label: "Historical Fiction", value: "historical-fiction" },
  { label: "Fun Facts", value: "fun-facts" },
  { label: "Short Stories", value: "short-stories" },
  { label: "Fantasy", value: "fantasy" },
  { label: "Supernatural", value: "supernatural" },
  { label: "Self-Help", value: "self-help" },
  { label: "Documentary", value: "documentary" },
  { label: "Biographical", value: "biographical" },
  { label: "Nature", value: "nature" },
  { label: "Travel", value: "travel" },
  { label: "Cooking", value: "cooking" },
  { label: "Tech Reviews", value: "tech-reviews" },
  { label: "Product Reviews", value: "product-reviews" },
  { label: "DIY", value: "diy" },
  { label: "Health & Fitness", value: "health-fitness" },
  { label: "Motivational", value: "motivational" },
  { label: "Podcast", value: "podcast" },
  { label: "Virtual Reality", value: "vr" },
  { label: "Animation", value: "animation" },
  { label: "Interactive", value: "interactive" },
  { label: "Seasonal", value: "seasonal" },
  { label: "Cultural", value: "cultural" }
];

const languageStyles = [
  { label: "Formal", value: "formal" },
  { label: "Casual", value: "casual" },
  { label: "Conversational", value: "conversational" },
  { label: "Professional", value: "professional" },
  { label: "Slang-heavy", value: "slang-heavy" }
];




const Content = () => {

  
  const [scriptLength, setScriptLength] = useState([22])


  return (
    <>
      <Header title='Create new script' />
      <ProgressBar />
      <div className='flex mt-8 gap-8 '>
        <div className='flex flex-col gap-8 border p-4 rounded-md   bg-card w-full'>
          <div className='flex flex-col gap-4 '>
            <h3 className='text-lg font-semibold '>What kind of script do you want to create today</h3>

            <ToggleGroup type="single" defaultValue='drama' size={'sm'} className='flex gap-2 flex-wrap justify-start ' variant={'outline'}>
              {
                scriptTypes.map((i) => (
                  <ToggleGroupItem key={i.value} value={i.value} aria-label={`Toggle ${i.label}`}>{i.label}</ToggleGroupItem>
                ))
              }
            </ToggleGroup>

          </div>
          <div className='flex flex-col gap-4'>
            <h3 className='text-lg font-semibold '>Language style</h3>

            <ToggleGroup type="single" defaultValue='formal' size={'sm'} className='flex gap-2 flex-wrap justify-start ' variant={'outline'}>
              {
                languageStyles.map((i) => (
                  <ToggleGroupItem key={i.value} value={i.value} aria-label={`Toggle ${i.label}`}>{i.label}</ToggleGroupItem>
                ))
              }
            </ToggleGroup>

          </div>

          <div className='flex flex-col gap-4 w-full'>
            <h3 className='text-lg  font-semibold  '>Please provide specific instructions for the script.</h3>
            <Textarea rows={3} placeholder="Enter your script topic or instructions...." />
          </div>


          <div className='flex flex-col gap-4'>
            <h3 className='text-lg  font-semibold  '>What is the desired length for your video?</h3>
            <div className='flex gap-4 items-center '>
              <Slider defaultValue={scriptLength} min={10} onValueChange={(e) => { setScriptLength(e) }} max={300} step={1} className='w-1/2' />
              <p className='text-xs text-muted-foreground '> {`${scriptLength[0]} seconds ~${Math.ceil(scriptLength[0] * 2.3)} words `} </p>
            </div>
          </div>

          <Button className='shadow-2xl  '>
            Generate
          </Button>


        </div>
        <div className='w-full flex flex-col min-h-[600px] border p-4'>
          <ContentTextEditor/>
          <Button className='mt-2 ml-auto' size={'icon'} >
            <MdRepeat/>
          </Button>

          <Button className=' mt-auto mb-3 gap-2'  >
            Next
            <TbPlayerTrackNextFilled />
          </Button>

        </div>
      </div>
    </>
  )
}

export default Content
