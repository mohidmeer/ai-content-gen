'use client';
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { BiLoader, BiSolidImageAdd } from "react-icons/bi";
import { useContent } from "@/context/ContentContext";
import { Skeleton } from "../ui/skeleton";
import Image from "next/image";
import { MdAdd, MdImage } from "react-icons/md";
import { Input } from "../ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { imageGenerationAPIs, ImageStyles } from "@/constants";
import { getImage } from "@/apiClients/unsplashClient";
import { IoMdDownload } from "react-icons/io";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { EditorSkeleton } from "../features/text-editor/EditorSkeleton";
import { FaTrash } from "react-icons/fa6";


const aspectRatios = [
  { id: 0, label: '16:9', query: 'landscape' },
  { id: 1, label: '9:16', query: 'portrait' },
  { id: 2, label: '1:1', query: 'square' },
  { id: 3, label: '4:5', query: 'portrait' },
]


interface SelectionCoords {
  top: number;
  left: number;
}


const ImageGeneration = () => {

  const { content } = useContent();

  const [loading, setLoading] = useState(false);
  // const [selectionCoords, setSelectionCoords] = useState(null);
  const [selectionCoords, setSelectionCoords] = useState<SelectionCoords | null>(null); // Update the type here
  const [isTextSelected, setIsTextSelected] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const [ImageStyle, setImageStyle] = useState('photorealistic');
  const [selectedImage, setSelectedImage] = useState();
  const [selectedImageGeneration, setSelectedImageGeneration] = useState('0')
  const [selectedImageAspectRatio, setSelectedImageAspectRatio] = useState('1')
  const editorRef = useRef<HTMLDivElement | null>(null);
  const editor = useEditor({
    immediatelyRender: false,
    content: content,
    editable: false,
    extensions: [
      StarterKit,
    ],
  })


  useEffect(() => {
    if (editor) {
      editor!.commands.setContent(content);
    }
  }, [content]);



  const handleMouseUp = () => {
    const selection = window.getSelection();
    const selectedText = selection!.toString();

    if (selectedText.length > 0) {
      const range = selection!.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      setSelectedText(selectedText);


      if (editorRef.current && editorRef.current.contains(selection!.anchorNode)) {
        setSelectionCoords({
          top: rect.top + window.scrollY - 40,
          left: rect.left + window.scrollX,
        });
        setIsTextSelected(true);
        // setIsTextSelected(selectedText);
      } else {
        setIsTextSelected(false);
      }
    } else {
      setIsTextSelected(false);
    }
  };


  return (
    <div className="">
      <div className="flex mt-8 gap-8 overflow-hidden ">
        {/* Editor */}
        <div className="w-full min-h-[50vh] max-h-[50vh] overflow-y-auto custom-scrollbar border">
          {
            editor ?
              <EditorContent editor={editor}
                className="selection:bg-primary selection:text-primary-foreground     "
                onMouseUp={handleMouseUp}
                ref={editorRef}
              />
              :
              <EditorSkeleton />

          }
          {isTextSelected && (

            <ImageGenerator
              selectionCoords={selectionCoords}
              selectedText={selectedText}
              imageStyle={ImageStyle}
              setSelectedImage={setSelectedImage}
              setLoading={setLoading}
              selectedImageAspectRatio={selectedImageAspectRatio}

            />

          )}

        </div>

        {/* Forms */}
        <div className="w-1/2 border-l pl-2">
          <div>
            <h3 className='text-lg font-semibold my-4'>Select image source</h3>
            <ToggleGroup
              type="single"
              defaultValue={selectedImageGeneration}
              size={'sm'}
              variant={'outline'}
              className='flex gap-2 flex-wrap justify-start mb-4'
              onValueChange={(e) => { setSelectedImageGeneration(e) }}
            >
              {
                imageGenerationAPIs.map((i) => (
                  <HoverCard openDelay={300} key={i.value} >
                    <HoverCardTrigger >
                      <ToggleGroupItem
                        key={i.value}
                        value={i.id.toString()} className="flex flex-col gap-2  py-2 text-xs " >
                        {i.label}
                      </ToggleGroupItem>
                    </HoverCardTrigger>
                    <HoverCardContent side={'top'}>
                      <div className="flex flex-col gap-2 justify-center items-center">
                        {i.Icon && <i.Icon />}
                        <p className="text-2xl font-bold">{i.label}</p>
                        <p className="text-sm">{i.description}</p>

                      </div>
                    </HoverCardContent>
                  </HoverCard>

                ))
              }
            </ToggleGroup>

          </div>
          <div>
            {
              imageGenerationAPIs[Number(selectedImageGeneration)].isAi &&
              <div>
                <h3 className='text-lg font-semibold my-4'>Select Image Type</h3>
                <ToggleGroup
                  type="single"
                  defaultValue={ImageStyle}
                  size={'sm'}
                  variant={'outline'}
                  className='flex gap-2 flex-wrap justify-start mb-2  '
                  onValueChange={(e) => { setImageStyle(e) }}
                >

                  {
                    ImageStyles.map((i) => (
                      <ToggleGroupItem
                        key={i.value}
                        value={i.value}
                        className="text-xs"
                        aria-label={`Toggle ${i.label}`}

                      >{i.label}</ToggleGroupItem>
                    ))
                  }

                </ToggleGroup>

              </div>
            }


          </div>
          <div>
            <h3 className='text-lg font-semibold my-4'>Aspect Ratio</h3>

            <ToggleGroup
              type="single"
              defaultValue={'16-9'}
              size={'sm'}
              variant={'outline'}
              className='flex gap-2 flex-wrap justify-start mb-4'
              onValueChange={(e) => { setSelectedImageAspectRatio(e) }}>
              {
                aspectRatios.map((i) => (
                  <ToggleGroupItem
                    key={i.id}
                    className="text-xs tracking-widest"
                    value={i.id.toString()}
                  >
                    {i.label}
                  </ToggleGroupItem>

                ))
              }


            </ToggleGroup>

          </div>
        </div>
        {/* Image Pannl */}
        <div className={`w-full relative`}>
          {
            selectedImage ?
              loading ?
                <BiLoader className="animate-spin duration-1000" size={52} />
                :
                <SelectedImage
                  selectedImage={selectedImage}

                />
              :
              <ImageLoader />
          }

        </div>

      </div>

      <div className=" flex justify-center items-center  ">
        <ImageTimeLine />
      </div>

    </div>
  )
}

export default ImageGeneration


function SelectedImage({ selectedImage }: { selectedImage: string }) {

  const { setImages } = useContent();

  const handleDownload = async () => {
    try {
      const response = await fetch(selectedImage);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'downloaded-image.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to download image', error);
    }
  };

  return (
    <div className="w-full h-full relative group cursor-pointer ">
      <div className="z-10 flex justify-end  ">
        <button onClick={() => { handleDownload() }} className="z-10 bg-secondary/50 rounded-full text-xs font-bold px-4 py-1 flex gap-1 items-center mt-2 mr-2  ">
          Download <IoMdDownload />
        </button>
      </div>
      <Image src={selectedImage}
        layout="fill"
        style={{ objectFit: 'cover', zIndex: '-5' }}
        alt=""
      />
      <div className="w-full h-full flex justify-center items-center  ">
        <div className="flex-col justify-center items-center backdrop-blur-2xl    p-4 group-hover:flex hidden rounded-md ">
          <MdAdd size={52} className="text-primary  spin-once  duration-500" onClick={() => { setImages((prev) => ([...prev, selectedImage])) }} />
          <p>Add to Timeline</p>
        </div>
      </div>
    </div>
  )
}


function ImageGenerator({
  selectionCoords,
  imageStyle,
  setSelectedImage,
  selectedText,
  setLoading,
  selectedImageAspectRatio
}: {
  selectionCoords: any,
  imageStyle: string,
  setSelectedImage: any,
  selectedText: any,
  setLoading: any,
  selectedImageAspectRatio: any
}) {
  const [prompt, setPrompt] = useState('')
  async function handleImageGeneration() {
    setLoading(true);
    const res = await getImage(`${prompt} ${selectedText}`, imageStyle, aspectRatios[Number(selectedImageAspectRatio)].query)
    setSelectedImage(res.urls.regular)
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setLoading(false)
  }
  return (
    <div
      style={{
        position: 'absolute',
        top: `${selectionCoords?.top}px`,
        left: `${selectionCoords?.left}px`
      }}
      className="flex"
    >
      <Input
        className="bg-secondary placeholder:text-[10px] text-xs w-[200px]"
        placeholder="Specific instructions for image"
        type="text"
        value={prompt}
        onChange={(e) => { setPrompt(e.target.value) }} />
      <Button onClick={() => { handleImageGeneration() }} >
        <BiSolidImageAdd />
      </Button>
    </div>
  )
}



function ImageTimeLine() {
  const { images, setImages } = useContent();

  const scrollRef = useRef<HTMLDivElement>(null);

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    e.preventDefault();
    scrollContainer.scrollLeft += e.deltaY;
  };
  const handleRemove = (index: any) => {
    setImages((prevImages) => [
      ...prevImages.slice(0, index),    // Elements before the target index
      ...prevImages.slice(index + 1)    // Elements after the target index
    ]);
  };

  return (
    <div ref={scrollRef} onWheel={handleWheel} className="p-1 border   flex gap-2  overflow-x-auto overflow-y-hidden custom-scrollbar  my-4  w-[90vw] select-none ">
      {images.map((i, z) => (
        <div key={z} className="relative h-[100px] bg-primary/10 w-[100px] flex-shrink-0">
          <Image alt="" layout="fill" className="cursor-pointer -z-5" src={i} style={{ objectFit: 'cover' }} />

          <p className="absolute top-1 left-1 text-primary-foreground  font-bold bg-primary  px-2 z-10">
            {z + 1}
          </p>
          <FaTrash
            className="absolute bottom-1 right-1 text-destructive-foreground  p-1 z-10 cursor-pointer bg-destructive "
            size={20} // Adjust icon size as needed
            onClick={() => handleRemove(z)} // Trigger your remove function here
          />
        </div>
      ))}
    </div>
  );
}




function ImageLoader() {

  return (

    <div className="flex flex-col space-y-2 ">
      <Skeleton className="w-full h-[350px] flex justify-center items-center" >
        <div className="flex flex-col items-center justify-center">
          <MdImage className="text-muted-foreground" size={100} />
          {/* <p className="text-sm text-muted-foreground" >Images will appear here </p> */}
        </div>

      </Skeleton>

    </div>
  )
}