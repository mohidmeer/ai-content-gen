"use client"
import Header from '@/components/Header'
import React, { useEffect, useState } from 'react'
import ProgressBar from '@/components/ProgressBar';
import { Button } from '@/components/ui/button';
import { MdArrowBackIos, } from 'react-icons/md';
import { TbPlayerTrackNextFilled } from "react-icons/tb";

import ImageGeneration from '@/components/ContentGeneration/ImageGeneration';
import { useContent } from '@/context/ContentContext';
import ScriptGeneration from '@/components/ContentGeneration/ScriptGeneration';
import VoiceGeneration from '@/components/ContentGeneration/VoiceGeneration';



const Content = () => {

  const { step, setStep, content, progress } = useContent();



  return (
    <>
      <Header title='Create new script' />
      <ProgressBar progress={progress} />
      <div className='flex flex-col '>
          <div className='overflow-hidden' style={{ display: step === 1 ? 'block' : 'none' }}>
            <ScriptGeneration />
          </div>

          <div className='overflow-hidden' style={{ display: step === 2 ? 'block' : 'none' }}>
            <ImageGeneration />
          </div>

          <div className='overflow-hidden' style={{ display: step === 3 ? 'block' : 'none' }}>
            <VoiceGeneration />
          </div>

        {
          step == 1 &&
          <div className='flex justify-end mt-auto'>
            <Button className='mt-4 gap-2 w-1/3' disabled={!content} onClick={() => { setStep(step + 1) }}  >
              Next
              <TbPlayerTrackNextFilled />
            </Button>
          </div>
        }
        {
          step >= 2 &&
          <div className='flex justify-between  my-10 gap-4'>
            <Button className='w-1/3 ' size={'default'} onClick={() => { setStep(step - 1) }}   >
              <MdArrowBackIos />
              Go Back
            </Button>
            <Button className='gap-2 w-1/3 ' disabled={!content} onClick={() => { setStep(step + 1) }}  >
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







