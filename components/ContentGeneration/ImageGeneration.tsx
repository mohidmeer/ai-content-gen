import { EditorContent, useEditor } from "@tiptap/react";
import ContentTextEditor from "./ContentTextEditor"
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import Highlight from "@tiptap/extension-highlight";
import { useEffect, useRef, useState } from "react";
import { EditorMenuBar } from "../Editor/EditorMenuBar";
import { Button } from "../ui/button";
import { BiSolidImageAdd } from "react-icons/bi";
import { FcAddImage } from "react-icons/fc";
import { useContent } from "@/context/contentContext";


const ImageGeneration = () => {

  const { step, setStep, content, setContent, progress, setProgress } = useContent();

  const [selectionCoords, setSelectionCoords] = useState(null);
  const [isTextSelected, setIsTextSelected] = useState(false);


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



  const editorRef = useRef(null); // Reference to the editor container

  const handleMouseUp = () => {
    const selection = window.getSelection();
    const selectedText = selection.toString();

    if (selectedText.length > 0) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();

      // Check if the selection is within the editor component
      if (editorRef.current && editorRef.current.contains(selection.anchorNode)) {
        setSelectionCoords({
          top: rect.top + window.scrollY - 40, // Adjust to position above selected text
          left: rect.left + window.scrollX,
        });
        setIsTextSelected(true);
      } else {
        setIsTextSelected(false);
      }
    } else {
      setIsTextSelected(false);
    }
  };


  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Highlight,
      Placeholder.configure({
        placeholder: 'Your script will appear here…',

      }),

    ],
  })

  return (
    <div>
      <div className="flex mt-8 gap-8 ">
        <div className="w-full">
          <EditorMenuBar editor={editor} />
          <EditorContent editor={editor}
            onMouseUp={handleMouseUp}
            ref={editorRef}
          />
          {isTextSelected && (
            <Button
              style={{
                position: 'absolute',
                top: `${selectionCoords?.top}px`,
                left: `${selectionCoords?.left}px`,

              }}
            >
              <BiSolidImageAdd />

            </Button>
          )}
        </div>

        <div className="w-full border">



        </div>
      </div>
    </div>
  )
}

export default ImageGeneration




