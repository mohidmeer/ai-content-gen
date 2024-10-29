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

  const { content, progress, setProgress, images, generatedAudio } = useContent();

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
      <NavigationButtons currentStep={currentStep} content={content} />
      <div className='flex flex-col overflow-hidden'>

        <StepContent currentStep={currentStep} />

      </div>
    </>
  );
};

const NavigationButtons = ({ currentStep, content }
  : { currentStep: number, content: string }) => {
  const router = useRouter();
  const pathname = usePathname()
  const searchParams = useSearchParams();

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

  if (currentStep >= 2) {
    return (
      <div className='flex justify-between my-10 gap-4'>
        <Button className='w-1/5' size={'default'} onClick={handleBack}>
          <MdArrowBackIos />
          Go Back
        </Button>
        {
          currentStep === 4 ? '' : <Button className='gap-2 w-1/5' disabled={!content} onClick={handleNext}>
            Next
            <TbPlayerTrackNextFilled />
          </Button>
        }
      </div>
    );
  }

  return null;
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
