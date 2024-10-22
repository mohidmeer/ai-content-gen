import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { EditorSkeleton } from '../Editor/EditorSkeleton'
import { useContent } from '@/context/ContentContext';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { elevenlabApi } from '@/apiClients/ellevenLabClient';
import WaveSurfer from 'wavesurfer.js'
import { MdPause, MdPlayArrow } from 'react-icons/md';
import { Button } from '../ui/button';
import { PiSpeakerSimpleNoneFill } from "react-icons/pi";
import { BiLoader, BiLoaderAlt, BiLoaderCircle } from 'react-icons/bi';
import { getCSSVariable } from '@/lib/utils';

const VoiceGeneration = () => {

  const { content, setProgress, voices } = useContent();
  const [selectedVoice, setSelectedVoice] = useState(voices![0])
  const [loading, setLoading] = useState(false)
  const [generatedAudio, setGeneratedAudio] = useState('https://storage.googleapis.com/eleven-public-prod/premade/voices/EXAVITQu4vr4xnSDxMaL/01a3e33c-6e99-4ee7-8543-ff2216a32186.mp3')

  async function getGeneratedAudio() {
    setLoading(true)
    const audio  = await elevenlabApi.generateVoice(editor!.getText(),selectedVoice.id) 
    console.log(audio)
    setGeneratedAudio(audio)
    setLoading(false)

  }

  const editor = useEditor({
    immediatelyRender: false,
    editable: false,
    content: content,
    extensions: [
      StarterKit,

    ],
  })

  useEffect(() => {
    setProgress(70)
  })



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
                <EditorContent editor={editor}
                  className="selection:bg-primary selection:text-primary-foreground !h-full     "
                />
              </div>
              :
              <EditorSkeleton />
          }


        </div>

      </div>
      {/* Generated Voice */}
      <VoiceTimeLine />
    </div>
  )
}

export default VoiceGeneration



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


interface AudioPlayerProps {
  generatedAudio: string;
}


const VoiceTimeLine: React.FC<AudioPlayerProps> = ({
  generatedAudio = 'https://storage.googleapis.com/eleven-public-prod/premade/voices/Xb7hH8MSUJpSbSDYk0k2/d10f7534-11f6-41fe-a012-2de1e482d336.mp3',
}) => {
  const [waveSurfer, setWaveSurfer] = useState<WaveSurfer | null>(null);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false); // To track play/pause state



  useEffect(() => {
    const waveSurferInstance = WaveSurfer.create({
      container: '#waveform',
      waveColor: getCSSVariable('--primary'),
      progressColor: getCSSVariable('--secondary-foreground'),
      barWidth: 2,
      barGap: 1,
      barRadius: 2,
    });

    waveSurferInstance.load(generatedAudio);

    waveSurferInstance.on('ready', () => {
      setIsReady(true);
    });

    waveSurferInstance.on('audioprocess', () => {
      console.log(waveSurferInstance.getCurrentTime());
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
    <div className='p-2 flex flex-col justify-center items-center my-4'>
      <div id="waveform" className='border overflow-hidden' style={{ width: '100%', height: '120px' }}></div>
      <div className='mt-2'>
        {isReady ?
          (isPlaying ?
            <Button variant={'outline'} onClick={handlePlayPause}  size={'icon'}>
              <MdPause size={24} />
            </Button>
            : <Button variant={'outline'} onClick={handlePlayPause} size={'icon'}>
              <MdPlayArrow size={24} />
            </Button>  
            ): <BiLoaderAlt size={24} className='animate-spin' /> }
      </div>
    </div>
  );
};