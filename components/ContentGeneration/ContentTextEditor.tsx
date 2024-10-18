'use client';
import Highlight from '@tiptap/extension-highlight'
import TextAlign from '@tiptap/extension-text-align'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React, { useEffect, useState } from 'react'
import Placeholder from '@tiptap/extension-placeholder'
import { EditorMenuBar } from '../Editor/EditorMenuBar';
import { EditorSkeleton } from '../Editor/EditorSkeleton';
import { useContent } from '@/context/contentContext';



const ContentTextEditor = ({   }) => {

    const {  content, setContent } = useContent();

    

    const [loading, setLoading] = useState(false)



    useEffect(() => {
        async function setContent() {
            setLoading(true)
            await new Promise((resolve) => setTimeout(resolve, 1000));
            editor.commands.setContent(content);
            setLoading(false)
        }
        if (editor && content) {
            setContent();
        }
    }, [content]);

    // useEffect(() => {
    //     if (editor) {
    //         editor.on('update', () => {
    //             const currentContent = editor.getHTML(); // Get current HTML from the editor
    //             setContent(currentContent); // Sync with parent component's content state
    //         });
    //     }
    //     // Clean up event listener when component unmounts
    //     return () => {
    //         if (editor) {
    //             editor.off('update'); // Remove the event listener when editor unmounts
    //         }
    //     };
    // }, [editor, setContent]);





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

        <>
            {
                (!editor || loading) ?
                    <EditorSkeleton /> :
                    <>
                        <EditorMenuBar editor={editor} />
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
            }
        </>
    )
}
export default ContentTextEditor






