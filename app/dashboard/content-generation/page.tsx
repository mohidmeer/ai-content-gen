"use client"
import Header from '@/components/Header'
import React, { useEffect, useState } from 'react'
import ProgressBar from '@/components/ProgressBar';
import { Button } from '@/components/ui/button';
import { MdArrowBackIos, MdRepeat } from 'react-icons/md';
import { TbPlayerTrackNextFilled } from "react-icons/tb";

import ImageGeneration from '@/components/ContentGeneration/ImageGeneration';
import { useContent } from '@/context/contentContext';
import Scriptgeneration from '@/components/ContentGeneration/Scriptgeneration';



const Content = () => {

  const { step, setStep, content, setContent, progress, setProgress } = useContent();




  return (
    <>
      <Header title='Create new script' />
      <ProgressBar progress={progress} />
      <div>
        <div>
          <div style={{ display: step === 1 ? 'block' : 'none' }}>
            <Scriptgeneration />
          </div>

          <div style={{ display: step === 2 ? 'block' : 'none' }}>
            <ImageGeneration />
          </div>
        </div>

        {
          step == 1 &&
          <div className='flex justify-end'>
            <Button className='mt-4 gap-2 w-1/3' disabled={!content} onClick={() => { setStep(step + 1) }}  >
              Next
              <TbPlayerTrackNextFilled />
            </Button>
          </div>
        }
        {
          step == 2 &&
          <div className='flex justify-end'>
            <Button className='  absolute top-2 left-[280px] ' size={'icon'} onClick={() => { setStep(step - 1) }}  >
              <MdArrowBackIos />
            </Button>

            <Button className='mt-6 gap-2 w-1/3 ' disabled={!content}  >
              Next
              <TbPlayerTrackNextFilled />
            </Button>
          </div>
        }



      </div>
    </>
  )
}

export default Content







