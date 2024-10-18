'use client';
import React, { useEffect } from 'react'
import { Progress } from './ui/progress'

const ProgressBar = ({progress}:{progress:number}) => {


    useEffect(()=>{},[progress])

    return (
        <div className='relative'>
            <div className='flex justify-between mb-4 text-xs font-bold text-muted-foreground'>
                <p className='ml-[22%]'>Generate your script</p>
                <p>Generate Images</p>  
                <p>Generate Voiceovers</p>
                <p className=''>Download Assets</p>
            </div>
            <div className='relative'>
                <Progress value={progress} />
                <div className=' absolute w-full -top-[4px]  flex justify-between  '>
                    <div className='border-4  w-fit p-[4px] rounded-full bg-primary ml-[25%] relative   '>
                    </div>
                    <div className='border-4  w-fit p-[4px] rounded-full bg-primary   '>

                    </div>
                    <div className='border-4  w-fit p-[4px] rounded-full bg-primary   '>

                    </div>
                    <div className='border-4  w-fit p-[4px] rounded-full bg-primary mr-[2%]   '>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default ProgressBar
