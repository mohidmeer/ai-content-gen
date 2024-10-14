'use client';
import Highlight from '@tiptap/extension-highlight'
import TextAlign from '@tiptap/extension-text-align'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React, { useEffect, useRef, useState } from 'react'
import { Toggle } from './ui/toggle'
import { BsJustify, BsJustifyLeft, BsJustifyRight } from "react-icons/bs";
import { Skeleton } from './ui/skeleton';
import Placeholder from '@tiptap/extension-placeholder'
import { Button } from './ui/button';

const MenuBar = ({ editor }: any) => {
    if (!editor) {
        return null
    }

    return (
        <div className="mb-4">
            <div className="flex flex-wrap gap-2">
                <Toggle variant={'outline'} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
                    H1
                </Toggle>
                <Toggle variant={'outline'} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} >
                    H2
                </Toggle>
                <Toggle variant={'outline'} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} >
                    H3
                </Toggle>
                <Toggle variant={'outline'} onClick={() => editor.chain().focus().setParagraph().run()} data-state={editor.isActive('paragraph') ? 'on' : 'off'} >
                    P
                </Toggle>
                <Toggle variant={'outline'} onClick={() => editor.chain().focus().toggleBold().run()} >
                    B
                </Toggle>
                <Toggle variant={'outline'} onClick={() => editor.chain().focus().toggleItalic().run()} className='italic' >
                    I
                </Toggle>
                <Toggle variant={'outline'} onClick={() => editor.chain().focus().toggleStrike().run()} className='line-through' >
                    S
                </Toggle>
                <Toggle variant={'outline'} onClick={() => editor.chain().focus().toggleHighlight().run()} >
                    Highlight
                </Toggle>
                <Toggle variant={'outline'} onClick={() => editor.chain().focus().setTextAlign('left').run()} >
                    <BsJustifyLeft />
                </Toggle>
                <Toggle variant={'outline'} onClick={() => editor.chain().focus().setTextAlign('center').run()} >
                    <BsJustify />
                </Toggle>
                <Toggle variant={'outline'} onClick={() => editor.chain().focus().setTextAlign('right').run()} >
                    <BsJustifyRight />
                </Toggle>

            </div>
        </div>
    )
}

const ContentTextEditor = () => {
    const [selectionCoords, setSelectionCoords] = useState(null);
    const [isTextSelected, setIsTextSelected] = useState(false);

    const editorRef = useRef(null); // Reference to the editor container

    // const handleMouseUp = () => {
    //   const selection = window.getSelection();
    //   const selectedText = selection.toString();
  
    //   if (selectedText.length > 0) {
    //     const range = selection.getRangeAt(0);
    //     const rect = range.getBoundingClientRect();
  
    //     // Check if the selection is within the editor component
    //     if (editorRef.current && editorRef.current.contains(selection.anchorNode)) {
    //       setSelectionCoords({
    //         top: rect.top + window.scrollY - 40, // Adjust to position above selected text
    //         left: rect.left + window.scrollX,
    //       });
    //       setIsTextSelected(true);
    //     } else {
    //       setIsTextSelected(false);
    //     }
    //   } else {
    //     setIsTextSelected(false);
    //   }
    // };


    const editor = useEditor({
        immediatelyRender:false,
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
        content: `
                <h2>Why Drinking Water is Essential</h2>

                <p>Did you know that drinking water is one of the easiest ways to improve your health?</p>

                <p>Water helps keep your skin glowing, your energy levels high, and even boosts your mood throughout the day.</p>

                <h3>Stay Hydrated, Stay Healthy</h3>

                <p>Whether you're working out, at work, or just relaxing, staying hydrated helps your body function at its best.</p>

                <p>So next time, grab a bottle of water and take a sip. It’s a simple habit that can make a big difference.</p>

                <p>Cheers to a healthier, happier you!</p>

      `,
    })

    return (

        <>
            {
                !editor &&
                <EditorSkeleton />

            }
            <MenuBar editor={editor} />
            <EditorContent editor={editor} 
            // onMouseUp={handleMouseUp} 
            // ref={editorRef} 
            />

            {/* {isTextSelected && (
                <Button
                    style={{
                        position: 'absolute',
                        top: `${selectionCoords?.top}px`,
                        left: `${selectionCoords?.left}px`,
                      
                    }}
                >
                    Action
                </Button>
            )} */}

        </>
    )
}
export default ContentTextEditor






const EditorSkeleton = () => {
    return (
        <div className="flex flex-col  space-y-4 bg-card rounded-lg">
            {/* Toolbar */}
            <div className="flex space-x-2">
                <Skeleton className="w-10 h-10" />
                <Skeleton className="w-10 h-10" />
                <Skeleton className="w-10 h-10" />
                <Skeleton className="w-10 h-10" />
                <Skeleton className="w-10 h-10" />
                <Skeleton className="w-10 h-10" />
                <Skeleton className="w-10 h-10" />
                <Skeleton className="w-10 h-10" />
                <Skeleton className="w-10 h-10" />
                <Skeleton className="w-10 h-10" />


            </div>

            {/* Content Area */}
            <div className="flex flex-col space-y-2">

                <Skeleton className="w-full h-60" /> {/* Main text area */}
                <Skeleton className="w-full h-6" /> {/* Footer or additional information */}
            </div>

            <div className="flex space-x-2">
                <div className="flex flex-col space-y-2 flex-grow">
                    <Skeleton className="w-full h-6" />
                    <Skeleton className="w-full h-6" />
                    <Skeleton className="w-full h-6" />
                </div>
            </div>
        </div>
    );
};