import { saveHistoryToBD } from '@/actions/user.actions';
import { useContent } from '@/context/ContentContext';
import { createQueryString } from '@/lib/utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useRef } from 'react';

const useTrackHistory = () => {
  const { content, progress, images, generatedAudio,setIsSavingHistory } = useContent();
  
  const router = useRouter();
  const pathname = usePathname()
  const searchParams = useSearchParams();
  
  const stepParam = searchParams.get('step');
  const currentStep = parseInt(stepParam || '1', 10);
  const prevState = useRef({ content, images, generatedAudio });

  async function updateHistory() {


    setIsSavingHistory(true)

    const Id = await saveHistoryToBD({
      id:searchParams.get('id'),
      content: content,
      step: currentStep,
      images: images,
      generatedAudio: generatedAudio
    })
    setIsSavingHistory(false)

    if (!searchParams.get('id')){
      router.push(pathname + '?' + createQueryString('id',Id,searchParams))
    }

  }

  useEffect(() => {
    const hasStateChanged =
      prevState.current.content !== content ||
      // prevState.current.progress !== progress ||
      prevState.current.images !== images ||
      prevState.current.generatedAudio !== generatedAudio;

    if (hasStateChanged) {
      updateHistory()
    }

    prevState.current = { content, images, generatedAudio };

  }, [content, images, generatedAudio]);
};

export default useTrackHistory;