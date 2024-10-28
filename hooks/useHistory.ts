import { saveHistoryToBD } from '@/actions/user.actions';
import { useContent } from '@/context/ContentContext';
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';

const useTrackHistory = () => {
  const { content, progress, images, generatedAudio} = useContent();

  const searchParams = useSearchParams();
  const stepParam = searchParams.get('step');
  const currentStep = parseInt(stepParam || '1', 10);
  
  const prevState = useRef({ content, progress, images, generatedAudio });

  async function updateHistory(){

    const res  = saveHistoryToBD({
        content:content,
        userId:'1',
        step:currentStep,
        images:images,
        generatedAudio:generatedAudio
    })

  }

  useEffect(() => {
    const hasStateChanged =
      prevState.current.content !== content ||
      prevState.current.progress !== progress ||
      prevState.current.images !== images ||
      prevState.current.generatedAudio !== generatedAudio;

      if (hasStateChanged) {
        updateHistory()
      }

      prevState.current = { content, progress, images, generatedAudio };
  
    }, [content, progress, images, generatedAudio]);
};

export default useTrackHistory;