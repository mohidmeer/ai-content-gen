import { saveHistoryToBD } from '@/actions/user.actions';
import { useContent } from '@/context/ContentContext';
import { createQueryString } from '@/lib/utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useRef } from 'react';

const useTrackHistory = () => {
  const { content, script , images, generatedAudio,setIsSavingHistory } = useContent();
  
  const router = useRouter();
  const pathname = usePathname()
  const searchParams = useSearchParams();
  
  const stepParam = searchParams.get('step');
  const currentStep = parseInt(stepParam || '1', 10);
  const prevState = useRef({ content, images, generatedAudio,script });

  async function updateHistory() {


    setIsSavingHistory(true)

    const Id = await saveHistoryToBD({
      id:searchParams.get('id'),
      script:script,
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
    const hasStateChanged = prevState.current.content !== content ||
                            prevState.current.images !== images ||
                            prevState.current.script !== script ||
                            prevState.current.generatedAudio !== generatedAudio;

    if (hasStateChanged) {
      updateHistory()
    }

    prevState.current = { content, images, generatedAudio,script };

  }, [content, images, generatedAudio,script]);
};

export default useTrackHistory;