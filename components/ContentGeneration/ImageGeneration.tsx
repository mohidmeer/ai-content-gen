import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { BiLoader, BiSolidImageAdd } from "react-icons/bi";
import { useContent } from "@/context/ContentContext";
import { Skeleton } from "../ui/skeleton";
import Image from "next/image";
import { MdImage } from "react-icons/md";
import { Input } from "../ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { imageGenerationAPIs, ImageStyles } from "@/constants";
import { unsplashAPi } from "@/apiClients/unsplashClient";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"


const ImageGeneration = () => {

  const { step, setStep, content, setContent, progress, setProgress } = useContent();

  const [selectionCoords, setSelectionCoords] = useState(null);
  const [isTextSelected, setIsTextSelected] = useState(false);
  const [selectedText, setSelectedText] = useState(false);
  const [ImageStyle, setImageStyle] = useState('photorealistic');
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const [selectedImageGeneration, setSelectedImageGeneration] = useState('0')


  useEffect(() => {

    async function setContent() {
      editor.commands.setContent(content);
    }
    if (editor && content) {
      setContent();
    }
  }, [content]);

  useEffect(() => {
    if (step == 2) {
      setProgress(40)
    }
  }, [step])

  const editorRef = useRef(null);

  const handleMouseUp = () => {
    const selection = window.getSelection();
    const selectedText = selection.toString();

    if (selectedText.length > 0) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      setSelectedText(selectedText);


      if (editorRef.current && editorRef.current.contains(selection.anchorNode)) {
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

  const editor = useEditor({
    immediatelyRender: false,
    editable: false,
    extensions: [
      StarterKit,

    ],
  })

  return (
    <div>
      <div className="flex mt-8 gap-8 ">
        <div className="w-full">
          <h3 className='text-lg font-semibold my-4'>Select image sources</h3>
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
                <HoverCard openDelay={300} >
                  <HoverCardTrigger>
                    <ToggleGroupItem
                      key={i.value}
                      value={i.id.toString()} className="flex flex-col gap-2 h-20 w-20 py-2 text-xs " >
                      {i.label}
                    </ToggleGroupItem>
                  </HoverCardTrigger>
                  <HoverCardContent  side={'top'}>
                    <div className="flex flex-col gap-2 justify-center items-center">
                      { i.Icon && <i.Icon/>}
                      <p className="text-2xl font-bold">{i.label}</p>
                      <p className="text-sm">{i.description}</p>

                    </div>
                  </HoverCardContent>
                </HoverCard>

              ))
            }
          </ToggleGroup>
          {

            imageGenerationAPIs[Number(selectedImageGeneration)].isAi &&
            <>
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

            </>
          }
          <EditorContent editor={editor}
            onMouseUp={handleMouseUp}
            ref={editorRef}
          />
          {isTextSelected && (

            <ImageGenerator
              selectionCoords={selectionCoords}
              selectedText={selectedText}
              imageStyle={ImageStyle}
              setSelectedImage={setSelectedImage}
              setLoading={setLoading}
            />

          )}

        </div>


        <div className="w-full border h-[60vh] overflow-hidden relative flex flex-col justify-center items-center ">
          <div>
            {
              selectedImage ?
                loading ?

                  <BiLoader className="animate-spin duration-1000" size={52} />

                  :

                  <Image src={selectedImage}
                    layout="responsive"
                    width={100}
                    height={100}
                    style={{ objectFit: 'contain' }}
                    alt=""
                  />
                :
                <ImageLoader />
            }

          </div>

        </div>
      </div>
    </div>
  )
}

export default ImageGeneration

function ImageGenerator({
  selectionCoords,
  imageStyle,
  setSelectedImage,
  selectedText,
  setLoading
}: {
  selectionCoords: any,
  imageStyle: string,
  setSelectedImage: any,
  selectedText: any,
  setLoading: any,
}) {

  const [prompt, setPrompt] = useState('')



  async function handleImageGeneration() {

    setLoading(true);
    console.log(imageStyle)
    console.log(prompt)
    const res = await unsplashAPi.getImage(`${prompt} ${selectedText}`, imageStyle)
    setSelectedImage(res.urls.full)
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
        className="bg-secondary placeholder:text-[10px] text-xs"
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




function ImageLoader({ }) {

  return (

    <div className="flex flex-col space-y-2 w-[600px]">
      <Skeleton className="w-full h-[400px] flex justify-center items-center" >
        <div className="flex flex-col items-center justify-center">
          <MdImage className="text-muted-foreground" size={100} />
          <p className="text-sm text-muted-foreground" >Image will appear here </p>
        </div>
      </Skeleton>
    </div>
  )
}