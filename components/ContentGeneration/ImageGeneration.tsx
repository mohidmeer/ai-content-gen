'use client';
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useRef, useState } from "react";
import { Button } from "../ui/button";
import { BiLoader, } from "react-icons/bi";
import { useContent } from "@/context/ContentContext";
import { Skeleton } from "../ui/skeleton";
import Image from "next/image";
import { MdImage } from "react-icons/md";
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


const aspectRatios = [
  { id: 0, label: '16:9', query: 'landscape' },
  { id: 1, label: '9:16', query: 'portrait' },
  { id: 2, label: '1:1', query: 'square' },
  { id: 3, label: '4:5', query: 'portrait' },
]
const ImageGeneration = () => {

  interface SelectionCoords {
    top: number;
    left: number;
  }


  const { script } = useContent();
  const [loading, setLoading] = useState(false);



  const [ImageStyle, setImageStyle] = useState('photorealistic');

  const [selectedImage, setSelectedImage] = useState();
  const [selectedImageGeneration, setSelectedImageGeneration] = useState('0')
  const [selectedImageAspectRatio, setSelectedImageAspectRatio] = useState('1')

  const editorRef = useRef<HTMLDivElement>(null);
  const [parentId, setParentId] = useState<string | null>(null);
  const [selectionCoords, setSelectionCoords] = useState<SelectionCoords | null>(null);
  const [isTextSelected, setIsTextSelected] = useState(false);
  const [selectedText, setSelectedText] = useState('');

  const handleMouseUp = () => {
    const selection = window.getSelection();
    const selectedText = selection!.toString();

    if (selectedText.length > 0) {
      const range = selection!.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      setSelectedText(selectedText);
      let node = selection!.anchorNode as Node | null;
      while (node && !(node instanceof HTMLElement && node.id)) {
        node = node.parentNode;
      }

      if (node instanceof HTMLElement && node.id) {
        console.log(node.id)
        setParentId(node.id);
      } else {
        setParentId(null);
      }

      if (editorRef.current && editorRef.current.contains(selection!.anchorNode)) {
        setSelectionCoords({
          top: rect.top + window.scrollY - 40,
          left: rect.left + window.scrollX,
        });
        setIsTextSelected(true);
      } else {
        setIsTextSelected(false);
      }
    } else {
      setIsTextSelected(false);
      setParentId(null);
    }
  };

  return (
    <div className="">
      <div className="flex mt-8 gap-8 overflow-hidden ">
        <div className="w-full min-h-[50vh] max-h-[50vh] overflow-y-auto custom-scrollbar border p-2 flex flex-col gap-2 ">

          <div onMouseUp={handleMouseUp} ref={editorRef} className="flex flex-col gap-2"  >
            {script.scenes.map((i: Scene) => (

              <Scene key={i.scene_id} scene={i} />

            ))}
          </div>

          {isTextSelected && (

            <ImageGenerator
              scene_id={parentId}
              selectionCoords={selectionCoords}
              selectedText={selectedText}
              imageStyle={ImageStyle}
              setSelectedImage={setSelectedImage}
              setLoading={setLoading}
              selectedImageAspectRatio={selectedImageAspectRatio}

            />

          )}

        </div>
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
                <SelectedImage selectedImage={selectedImage} />
              :
              <ImageLoader />
          }

        </div>

      </div>

    </div>
  )
}




function SelectedImage({ selectedImage }: { selectedImage: string }) {

  // const { setImages } = useContent();

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
      {/* <div className="w-full h-full flex justify-center items-center  ">
        <div className="flex-col justify-center items-center backdrop-blur-2xl    p-4 group-hover:flex hidden rounded-md ">
          <MdAdd size={52} className="text-primary  spin-once  duration-500" onClick={() => { setImages((prev) => ([...prev, selectedImage])) }} />
          <p>Add to Timeline</p>
        </div>
      </div> */}
    </div>
  )
}


function ImageGenerator({
  scene_id,
  selectionCoords,
  imageStyle,
  setSelectedImage,
  selectedText,
  setLoading,
  selectedImageAspectRatio
}: {
  scene_id: string | null
  selectionCoords: any,
  imageStyle: string,
  setSelectedImage: any,
  selectedText: any,
  setLoading: any,
  selectedImageAspectRatio: any
}) {
  const [prompt, setPrompt] = useState(selectedText)
  const { setScript } = useContent();

  async function handleImageGeneration() {
    setLoading(true);
    const res = await getImage(`${prompt} ${selectedText}`, imageStyle, aspectRatios[Number(selectedImageAspectRatio)].query)
    setSelectedImage(res.urls.regular)
    setScript((prevScript) => {
      const updatedScenes = [...prevScript.scenes];
      const index = Number(scene_id) - 1;

      if (index >= 0 && index < updatedScenes.length) {
        updatedScenes[index] = {
          ...updatedScenes[index],
          images: [...(updatedScenes[index].images), res.urls.regular],
        };
      }

      return {
        ...prevScript,
        scenes: updatedScenes,
      };
    });

    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false)
  }

  return (
    <div
      style={{
        position: 'absolute',
        top: `${selectionCoords?.top}px`,
        left: `${selectionCoords?.left}px`
      }}
      className="flex flex-col"
    >
      <Input
        className="bg-secondary  w-[300px]"
        placeholder="Specific instructions for image"
        type="text"
        value={prompt}
        onChange={(e) => { setPrompt(e.target.value) }} />
      <Button onClick={() => { handleImageGeneration() }} >
        Generate
      </Button>
    </div>
  )
}


const Scene = ({ scene }: { scene: Scene }) => {

  return (
    <div
      key={scene.scene_id}
      id={scene.scene_id}
      className="border rounded-md p-2 flex flex-col gap-2 relative">
      <div>
        <h3 className="font-bold">{scene.scene_title}</h3>
        <p>{scene.text}</p>
      </div>
      <div  className="flex gap-2 items-center">
      {
        scene.images.map((i, z) => (
            <div key={z} className="relative w-20 h-20 flex-shrink-0 cursor-pointer border flex justify-center items-center overflow-hidden">
              <Image alt="" className="" layout="responsive" width={100} height={50} src={i || '/images/Loader.png'} />
            </div>
        ))
      }
      </div>

    </div>
  );
}


function ImageLoader() {

  return (

    <div className="flex flex-col space-y-2 ">
      <Skeleton className="w-full h-[350px] flex justify-center items-center" >
        <div className="flex flex-col items-center justify-center">
          <MdImage className="text-muted-foreground" size={100} />
        </div>

      </Skeleton>

    </div>
  )
}

export default ImageGeneration



// function ImageTimeLine() {
//   const { images, setImages } = useContent();

//   const scrollRef = useRef<HTMLDivElement>(null);

//   const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
//     const scrollContainer = scrollRef.current;
//     if (!scrollContainer) return;

//     e.preventDefault();
//     scrollContainer.scrollLeft += e.deltaY;
//   };
//   const handleRemove = (index: any) => {
//     setImages((prevImages) => [
//       ...prevImages.slice(0, index),    // Elements before the target index
//       ...prevImages.slice(index + 1)    // Elements after the target index
//     ]);
//   };

//   return (
//     <div ref={scrollRef} onWheel={handleWheel} className="p-1 border   flex gap-2  overflow-x-auto overflow-y-hidden custom-scrollbar  my-4  w-[90vw] select-none ">
//       {images.map((i, z) => (
//         <div key={z} className="relative h-[100px] bg-primary/10 w-[100px] flex-shrink-0">
//           <Image alt="" layout="fill" className="cursor-pointer -z-5" src={i} style={{ objectFit: 'cover' }} />

//           <p className="absolute top-1 left-1 text-primary-foreground  font-bold bg-primary  px-2 z-10">
//             {z + 1}
//           </p>
//           <FaTrash
//             className="absolute bottom-1 right-1 text-destructive-foreground  p-1 z-10 cursor-pointer bg-destructive "
//             size={20} // Adjust icon size as needed
//             onClick={() => handleRemove(z)} // Trigger your remove function here
//           />
//         </div>
//       ))}
//     </div>
//   );
// }


