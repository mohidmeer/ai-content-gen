"use client"; 
import Header from '@/components/Header';
import React, { Suspense, useEffect } from 'react';
import ProgressBar from '@/components/ProgressBar';
import { Button } from '@/components/ui/button';
import { MdArrowBackIos } from 'react-icons/md';
import { TbPlayerTrackNextFilled } from "react-icons/tb";
import ImageGeneration from '@/components/ContentGeneration/ImageGeneration';
import { useContent } from '@/context/ContentContext';
import ScriptGeneration from '@/components/ContentGeneration/ScriptGeneration';
import VoiceGeneration from '@/components/ContentGeneration/VoiceGeneration';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import DownloadAssets from '@/components/ContentGeneration/DownloadAssets';
import useTrackHistory from '@/hooks/useHistory';
import { createQueryString } from '@/lib/utils';
import { getHistoryDetails } from '@/actions/user.actions';
import { RiLoader4Line } from "react-icons/ri";
import { JsonObject } from '@prisma/client/runtime/library';
import { buttonVariants } from "@/components/ui/button"
import Link from 'next/link';


export default function Content() {
  return (
    <Suspense fallback={<div className='h-screen'></div>}>
      <MainContent />
    </Suspense>
  );
};

const MainContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const stepParam = searchParams.get('step');
  const currentStep = parseInt(stepParam || '1', 10);
  const pathname = usePathname()

  useTrackHistory();

  const { content,setContent,progress,setScript,setProgress,isSavingHistory, images,setImages, setGeneratedAudio, generatedAudio } = useContent();

async function getHistoryItems(id: string) {
  try {
    const history = await getHistoryDetails(id); 

    if (history) {
      setContent(history.content || ""); 
      setScript(history.script as JsonObject || {} );
      setImages(history.imageUrl || []);
      setGeneratedAudio(history.voiceUrl || null);
    } else {
      console.warn("No history found for the given ID:", id);
    }
  } catch (error) {
    console.error("Failed to fetch history details:", error);
  }
}
  useEffect(()=>{
    if(searchParams.get('id') ){
      getHistoryItems(searchParams.get('id')!)
    }
  },[])


  useEffect(() => {
    const updateProgress = () => {
      switch (currentStep) {
        case 1:
          setProgress(content ? 25 : 22);
          break;
        case 2:
          setProgress(images.length ? 50 : 40);
          break;
        case 3:
          setProgress(generatedAudio ? 75 : 70);
          break;
        case 4:
          setProgress(95);
          break;
        default:
          break;
      }
    };

    updateProgress();
    router.push(pathname + '?' + createQueryString('step',currentStep.toString(),searchParams))

  }, [currentStep, content, images, generatedAudio, setProgress, router]);


  const getTitleForStep = () => {
    switch (currentStep) {
      case 1:
        return 'Create new script';
      case 2:
        return 'Generate Images';
      case 3:
        return 'Generate Voiceovers';
      case 4:
        return 'Download Assets';
      default:
        return 'Create new script'; // Default title for unknown steps
    }
  };

  return (
    <>
      <Header title={getTitleForStep()} />
      <ProgressBar progress={progress} />
      <NavigationButtons currentStep={currentStep}  />

            {
              isSavingHistory &&
              <RiLoader4Line size={32} className='absolute right-30 top-3   text-primary animate-spin ' />
            }
      
      <div className='flex flex-col overflow-hidden'>

        <StepContent currentStep={currentStep}  />

      </div>
    </>
  );
};


const StepContent = ({ currentStep }: { currentStep: number }) => {
  switch (currentStep) {
    case 1:
      return <ScriptGeneration />;
    case 2:
      return <ImageGeneration />;
    case 3:
      return <VoiceGeneration />;
    case 4:
      return <DownloadAssets />;
    default:
      return null;
  }
};


const NavigationButtons = ({ currentStep }
  : { currentStep: number }) => {

const { content, generatedAudio } = useContent();

  const router = useRouter();
  const pathname = usePathname()
  const searchParams = useSearchParams();

  const isDisabled = 
  (currentStep === 1 && !content) ||
  // (currentStep === 2 && images.length === 0) ||
  (currentStep === 3 && !generatedAudio);

  const handleNext = () => {
    const nextStep = currentStep + 1;
    router.push(pathname + '?' + createQueryString('step',nextStep,searchParams))
  };

  const handleBack = () => {
    const prevStep = currentStep - 1;
    if (prevStep >= 1) {
      router.push(pathname + '?' + createQueryString('step',prevStep,searchParams))
    }
  };

  if (currentStep === 1) {
    return (
      <div className='flex justify-end mt-auto'>
        <Button className='mt-4 gap-2 w-1/5' disabled={!content} onClick={handleNext}>
          Next
          <TbPlayerTrackNextFilled />
        </Button>
      </div>
    );
  }

  if (currentStep == 3) {
    return (
      <div className='flex justify-between mt-4 gap-4'>
        <Button className='w-1/5' size={'default'} onClick={handleBack}>
          <MdArrowBackIos />
          Go Back
        </Button>
        
           <Button className='gap-2 w-1/5' disabled={isDisabled} onClick={handleNext}>
            Next
            <TbPlayerTrackNextFilled />
          </Button>
        
      </div>
    );
  }
  if (currentStep == 4) {
    return (
      <div className='flex justify-between mt-4 gap-4'>
        <Button className='w-1/5' size={'default'} onClick={handleBack}>
          <MdArrowBackIos />
          Go Back
        </Button>
        {
           <Link className={`${buttonVariants()} w-1/5 gap-2 `} href={'/video/'+searchParams.get('id')! }    onClick={handleNext}>
             Open Video Editor
            <TbPlayerTrackNextFilled />
          </Link>
        }
      </div>
    );
  }

  return null;
};