import { useContent } from '@/context/ContentContext';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image';
import WaveSurfer from 'wavesurfer.js';
import { getCSSVariable } from '@/lib/utils';
import { Button } from '../ui/button';
import JSZip from 'jszip';


const getExtensionFromMime = (mimeType:string) => {
    if (mimeType.startsWith('image/')) {
      const extension = mimeType.split('/')[1];
      return  extension
    }
    return ''
  };

const DownloadAssets = () => {

    const { images,generatedAudio,content } = useContent();

    const editor = useEditor({
        immediatelyRender: false,
        editable: false,
        content: content,
        extensions: [StarterKit],
    })

    useEffect(() => {
        if (editor) {
            editor!.commands.setContent(content);
        }
    }, [content]);

    

    const createDownloadableZip = async () => {
        const zip = new JSZip();

        const imagesFolder = zip.folder('images');
        const audioFolder = zip.folder('audio');
        const scriptFolder = zip.folder('script');

        await Promise.all(
            images.map(async (url, index) => {
                const response = await fetch(url);
                const blob = await response.blob();
                imagesFolder!.file(`image${index + 1}.${getExtensionFromMime(blob.type)}`, blob);
            })
        );
        
        const response = await fetch(generatedAudio!);
        const blob = await response.blob();
        audioFolder!.file(`audio.mp3`, blob);

        scriptFolder!.file('script.txt', editor!.getText());
        
        const zipBlob = await zip.generateAsync({ type: 'blob' });

        const link = document.createElement('a');
        link.href = URL.createObjectURL(zipBlob);
        console.log(link.href)
        link.download = 'project_files.zip';
        link.click();

    }
    return (
        <div>
            <div className='flex'>
                <div className='flex flex-col w-1/2  justify-center items-center'>
                    <ImageGallery />
                    <AudioBox />
                    <Button className='w-full mt-8' onClick={createDownloadableZip} >
                        Download Assets
                    </Button>
                </div>
                <div className='w-1/2'>
                    <EditorBox editor={editor} />
                </div>
            </div>
        </div>
    )
}

export default DownloadAssets



const ImageGallery = () => {
    const { images } = useContent();

    const scrollRef = useRef<HTMLDivElement>(null);

    const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer) return;

        e.preventDefault();
        scrollContainer.scrollLeft += e.deltaY;
    };


    return (
        <div className='w-full'>
            <h3 className='font-semibold text-xl my-4'>Images</h3>
            <div ref={scrollRef} onWheel={handleWheel} className="p-1 border mt-6   flex gap-2  overflow-x-auto overflow-y-hidden custom-scrollbar    select-none ">
                {images.map((i, z) => (
                    <div key={z} className="relative h-[100px] bg-primary/10 w-[100px] flex-shrink-0">
                        <Image alt="" layout="fill" className="cursor-pointer -z-5" src={i} style={{ objectFit: 'cover' }} />

                        <p className="absolute top-1 left-1 text-primary-foreground  font-bold bg-primary  px-2 z-10">
                            {z + 1}
                        </p>

                    </div>
                ))}
            </div>
        </div>
    )
};

const EditorBox = ({editor}:{editor:any}) => {

    
    return (
        <>

            {
                editor ?
                    <div className='p-2 w-full'>
                        <h3 className='font-semibold text-xl my-4'>Script</h3>

                        <EditorContent editor={editor}
                            className="select-none  "
                        >
                        </EditorContent>
                    </div>
                    :
                    <></>
            }
        </>
    )
}

const AudioBox = ({ }) => {

    const { generatedAudio } = useContent();

    useEffect(() => {
        const waveSurferInstance = WaveSurfer.create({
            container: '#waveform',
            waveColor: getCSSVariable('--primary'),
            progressColor: getCSSVariable('--secondary-foreground'),
            barWidth: 2,
            barGap: 1,
            barRadius: 2,
        });


        waveSurferInstance.load(generatedAudio!);


        waveSurferInstance.on('ready', () => {
           
        });



        waveSurferInstance.on('click', () => {
            if (waveSurferInstance.isPlaying()) {
              
                waveSurferInstance.pause()
            } else {
           
                waveSurferInstance.play()
            }
        })


        waveSurferInstance.on('finish', () => {
            waveSurferInstance.seekTo(0)
            
        });



    }, [generatedAudio]);
    return (
        <div className='w-full'>
            <h3 className='font-semibold text-xl my-2'>Voiceover</h3>
            <div id="waveform" className='border overflow-hidden  ' style={{ width: '100%', height: '112px' }}></div>
        </div>
    )
}