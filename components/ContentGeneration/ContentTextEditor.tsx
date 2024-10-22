'use client';
import Highlight from '@tiptap/extension-highlight'
import TextAlign from '@tiptap/extension-text-align'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React, { useEffect, useState } from 'react'
import Placeholder from '@tiptap/extension-placeholder'
import { EditorMenuBar } from '../Editor/EditorMenuBar';
import { EditorSkeleton } from '../Editor/EditorSkeleton';
import { useContent } from '@/context/ContentContext';



const ContentTextEditor = () => {

    const { step, content, setContent,setProgress } = useContent();
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (step == 1 && content) {
          setProgress(25)
        }
      }, [content])



    useEffect(() => {
        async function setContent() {
            setLoading(true)    
            await new Promise((resolve) => setTimeout(resolve, 1000));          
            editor!.commands.setContent(content);
            setLoading(false)
        }
        if (editor && content) {
            setContent();
        }
    }, [content]);



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
                       
                        />
                        
                    </>
            }
        </>
    )
}
export default ContentTextEditor






