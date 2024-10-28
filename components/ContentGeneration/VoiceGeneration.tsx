import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { EditorSkeleton } from '../Editor/EditorSkeleton'
import { useContent } from '@/context/ContentContext';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { generateVoice } from '@/apiClients/ellevenLabClient';
import WaveSurfer from 'wavesurfer.js'
import { MdPause, MdPlayArrow } from 'react-icons/md';
import { Button } from '../ui/button';
import { PiSpeakerSimpleNoneFill } from "react-icons/pi";
import { BiLoader, BiLoaderAlt} from 'react-icons/bi';
import { extractWordsAndTimestamps, getCSSVariable, soudnPlaybackTextObject } from '@/lib/utils';
const VoiceGeneration = () => {

  const { content, voices,setGeneratedAudio,generatedAudio } = useContent();
  const [selectedVoice, setSelectedVoice] = useState(voices![0])
  const [loading, setLoading] = useState(false)
  

  const editorRef = useRef(null)

  const [textSelection,setTextSelection] = useState({start:0,end:0})

  async function getGeneratedAudio() {
    setLoading(true)
    const audioUrl = await generateVoice(editor!.getText(), selectedVoice.id)
    setGeneratedAudio(audioUrl)
    const res =  extractWordsAndTimestamps(soudnPlaybackTextObject)

    setLoading(false)
  }

  const selectTextByIndex = (startIndex:number, endIndex:number) => {
    if (editorRef.current) {
      const range = document.createRange();
      const selection = window.getSelection();
      
      // Clear any existing selections
      selection?.removeAllRanges();

      let charCount = 0;
      let startNode:any = null;
      let endNode:any = null;
      let startOffset = 0;
      let endOffset = 0;

      const walkTextNodes = (node:any) => {
        if (node.nodeType === Node.TEXT_NODE) {
          const textLength = node.textContent.length;

          // Check if the current text node contains the start index
          if (startNode === null && charCount + textLength >= startIndex) {
            startNode = node;
            startOffset = startIndex - charCount;
          }

          // Check if the current text node contains the end index
          if (endNode === null && charCount + textLength >= endIndex) {
            endNode = node;
            endOffset = endIndex - charCount;
          }

          charCount += textLength;
        } else {
          // Traverse child nodes if it's not a text node
          node.childNodes.forEach(walkTextNodes);
        }
      };

      // Start walking through the text nodes inside the container
      walkTextNodes(editorRef.current);

      if (startNode && endNode) {
        range.setStart(startNode, startOffset);
        range.setEnd(endNode, endOffset);
        selection!.addRange(range);
      } else {
        console.error('Failed to find text nodes at the specified indices.');
      }
    }
  };
  useEffect(()=>{
    if(editor){
      editor!.commands.setContent(content);
    }
  },[content])

  const editor = useEditor({
    immediatelyRender: false,
    editable: false,
    content: content,
    extensions: [
      StarterKit,

    ],
  })

  

  useEffect(()=>{
    selectTextByIndex(textSelection.start,textSelection.end)
  },[textSelection])



  return (
    <div>
      {/* Main Layout */}
      <div className="flex mt-8 gap-8 overflow-hidden  ">
        {/* Voice Form */}
        <div className='w-full'>
          <h3 className='text-2xl font-semibold my-2' >Select the  voice</h3>
          <div className='grid grid-cols-3 gap-4 h-[45vh] overflow-y-auto overflow-x-hidden custom-scrollbar p-2 ' >
            {
              voices!.map((i, z) => (
                <VoiceBox
                  voice={i}
                  key={i.id}
                  selectedVoice={selectedVoice}
                  setSelectedVoice={setSelectedVoice}
                />
              ))
            }
          </div>
        </div>
        {/* Editor */}
        <div className="w-2/3 min-h-[40vh] max-h-[45vh] overflow-y-auto custom-scrollbar">
          {
            editor ?
              <div className='p-2'>
                <div className='flex justify-between my-4 items-center '>

                  <Button className='w-fit shadow-2xl disabled:cursor-not-allowed ' onClick={() => { getGeneratedAudio() }} disabled={loading} >
                    {
                      loading &&
                      <BiLoader size={18} className='animate-spin' />
                    }
                    <PiSpeakerSimpleNoneFill size={18} />
                    Generate
                  </Button>
                </div>
                <EditorContent ref={editorRef} editor={editor}
                  className="selection:bg-primary selection:text-primary-foreground !h-full"
                >
                </EditorContent>
              </div>
              :
              <EditorSkeleton />
          }


        </div>

      </div>
      {/* Generated Voice */}
      {
        generatedAudio ? 
          <VoiceTimeLine textSelection={textSelection} setTextSelection={setTextSelection}   generatedAudio={generatedAudio} />
          :
          <div className='h-[160px] w-full p-2 my-2 animate-pulse bg-primary/10' />
      }
    </div>
  )
}

export default VoiceGeneration




interface AudioPlayerProps {
  generatedAudio: string;
  textSelection: { start : number, end:number}
  setTextSelection: (selection: { start: number; end: number }) => void;
}


const VoiceTimeLine: React.FC<AudioPlayerProps> = ({generatedAudio,setTextSelection
}) => {
  const [waveSurfer, setWaveSurfer] = useState<WaveSurfer | null>(null);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);


  const timestamps = [
    0.383, 0.476, 0.848, 0.871, 1.161, 1.196, 1.335, 1.37, 1.881, 2.032,
    2.635, 2.786, 2.821, 2.914, 2.937, 3.077, 3.111, 3.251, 3.274, 3.611,
    3.634, 3.901, 3.924, 4.052, 4.087, 4.214, 4.261, 4.319, 4.354, 4.435,
    4.458, 4.911, 4.946, 5.132, 5.178, 5.236, 5.271, 5.631, 5.666, 5.782,
    5.817, 6.211
  ];
 const words = [
    "Why",
    " ",
    "Drinking",
    " ",
    "Water",
    " ",
    "is",
    " ",
    "Essential",
    " ",
    " ",
    "Did",
    " ",
    "you",
    " ",
    "know",
    " ",
    "that",
    " ",
    "drinking",
    " ",
    "water",
    " ",
    "is",
    " ",
    "one",
    " ",
    "of",
    " ",
    "the",
    " ",
    "easiest",
    " ",
    "ways",
    " ",
    "to",
    " ",
    "improve",
    " ",
    "your",
    " ",
    "health?"
]

const calculateSelectionRange = (index:number) => {
  let start = 0;
  
  for (let i = 0; i < index; i++) {
    start += words[i].length;
  }
  const end = (start + words[index].length);

  console.log(start,end)

  return { start, end };
};

const findClosestTimestampIndex = (currentTime:number) => {
  let closestIndex = 0;
  let smallestDiff = Math.abs(timestamps[0] - currentTime);

  for (let i = 1; i < timestamps.length; i++) {
    const diff = Math.abs(timestamps[i] - currentTime);
    if (diff < smallestDiff) {
      smallestDiff = diff;
      closestIndex = i;
    }
  }

  return closestIndex;
};

  useEffect(() => {
    const waveSurferInstance = WaveSurfer.create({
      container: '#waveform',
      waveColor: getCSSVariable('--primary'),
      progressColor: getCSSVariable('--secondary-foreground'),
      barWidth: 2,
      barGap: 1,
      barRadius: 2,
    });

    try {

      waveSurferInstance.load(generatedAudio);
      
    } catch (error) {

      throw error
      
    }

    waveSurferInstance.on('ready', () => {
      setIsReady(true);
    });
    
    waveSurferInstance.on('audioprocess', () => {
      const currentTime = waveSurferInstance.getCurrentTime();
      const closest = findClosestTimestampIndex(currentTime);
      const selection = calculateSelectionRange(closest);
      setTextSelection(selection)
    });


    waveSurferInstance.on('click', () => {
      if (waveSurferInstance.isPlaying()) {
        setIsPlaying(false)
        waveSurferInstance.pause()
      } else {
        setIsPlaying(true)
        waveSurferInstance.play()
      }
    })


    waveSurferInstance.on('finish', () => {
      waveSurferInstance.seekTo(0)
      setIsPlaying(false);
    });


    setWaveSurfer(waveSurferInstance);


  }, [generatedAudio]);

  const handlePlayPause = () => {
    if (waveSurfer!.isPlaying()) {

      waveSurfer!.pause()
    } else {

      waveSurfer!.play()
    }
    setIsPlaying(!isPlaying)
  };

  return (
    <div className='p-2 flex flex-col justify-center items-center my-2'>
      <div id="waveform" className='border overflow-hidden' style={{ width: '100%', height: '120px' }}></div>
      <div className='mt-2'>
        {isReady ?
          (isPlaying ?
            <Button variant={'outline'} onClick={handlePlayPause} size={'icon'}>
              <MdPause size={24} />
            </Button>
            : <Button variant={'outline'} onClick={handlePlayPause} size={'icon'}>
              <MdPlayArrow size={24} />
            </Button>
          ) : <BiLoaderAlt size={24} className='animate-spin' />}
      </div>
    </div>
  );
};


function VoiceBox({
  voice,
  selectedVoice,
  setSelectedVoice,
}: {
  voice: Voice;
  selectedVoice: Voice;
  setSelectedVoice: Dispatch<SetStateAction<Voice>>;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        if (selectedVoice !== voice) {

          setSelectedVoice(voice);
        }
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };
  useEffect(() => {
    if (audioRef.current && selectedVoice !== voice) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, [selectedVoice, voice]);

  useEffect(() => {
    if (audioRef.current) {
      const handleAudioEnded = () => {
        setIsPlaying(false);
      };
      audioRef.current.addEventListener('ended', handleAudioEnded);
      return () => {
        audioRef.current?.removeEventListener('ended', handleAudioEnded);
      };
    }
  }, [audioRef]);

  return (
    <div
      className={`text-xs  p-2 rounded flex flex-col gap-2 hover:shadow-xl shadow-primary/30 cursor-pointer  duration-300  group  ${selectedVoice === voice ? 'border-primary border-2' : 'border-2'
        }`}
      onClick={() => {
        if (selectedVoice !== voice) {
          setSelectedVoice(voice);
        }
      }}
    >
      <div className="w-full flex justify-between items-center">
        <p className="text-lg font-semibold">{voice.name}</p>
        <button onClick={handlePlayPause}>
          {isPlaying ? <MdPause size={24} /> : <MdPlayArrow size={24} />}
        </button>
      </div>
      <audio ref={audioRef} src={voice.preview_url} />
      <div className="flex flex-wrap text-sm gap-2">
        <p className="bg-primary text-primary-foreground px-2 rounded-full">
          {voice.labels.accent}
        </p>
        <p className="bg-primary text-primary-foreground px-2 rounded-full">
          {voice.labels.description}
        </p>
        <p className="bg-primary text-primary-foreground px-2 rounded-full">
          {voice.labels.age}
        </p>
        <p className="bg-primary text-primary-foreground px-2 rounded-full">
          {voice.labels.gender}
        </p>
        <p className="bg-primary text-primary-foreground px-2 rounded-full">
          {voice.labels.use_case}
        </p>
      </div>
    </div>
  );
}

