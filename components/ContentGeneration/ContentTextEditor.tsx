'use client';
import Highlight from '@tiptap/extension-highlight'
import TextAlign from '@tiptap/extension-text-align'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React, { useEffect, useState } from 'react'
import Placeholder from '@tiptap/extension-placeholder'
import { EditorMenuBar  } from '../features/text-editor/EditorMenuBar'; 
import { EditorSkeleton } from '../features/text-editor/EditorSkeleton';
import { useContent } from '@/context/ContentContext';
import { Heading } from '@tiptap/extension-heading';
import { Paragraph } from '@tiptap/extension-paragraph';

const CustomHeading = Heading.extend({
    addAttributes() {
      return {
        ...this.parent?.(),
        id: {
          default: null,
          parseHTML: (element) => element.getAttribute('id'),
          renderHTML: (attributes) => {
            if (!attributes.id) {
              return {};
            }
            return { id: attributes.id };
          },
        },
      };
    },
  });
  
  // Extend Paragraph to support `id`
  const CustomParagraph = Paragraph.extend({
    addAttributes() {
      return {
        ...this.parent?.(),
        id: {
          default: null,
          parseHTML: (element) => element.getAttribute('id'),
          renderHTML: (attributes) => { 
            if (!attributes.id) {
              return {};
            }
            return { id: attributes.id };
          },
        },
      };
    },
  });

const ContentTextEditor = () => {

    const {content, setContent} = useContent();
    const [loading] = useState(false)


    useEffect(() => {
        if (editor) {
            editor!.commands.setContent(content);
        }
    }, [content]);


    const editor = useEditor({
        immediatelyRender: false,
        content: content,
        extensions: [
            StarterKit.configure({
                heading:false,
                paragraph:false,
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Highlight,
            Placeholder.configure({
                placeholder: 'Your script will appear here…',

            }),
            CustomHeading,
            CustomParagraph,

        ],
        onUpdate: ({ editor }) => {

            console.log('TEXT EDIOTR EVENT EXECUTED')
            const htmlContent = editor.getHTML();
            const textContent = editor.getText();

            if (textContent.trim() === '') {
                setContent('');
            } else {
                setContent(htmlContent);
            }


        },
    })

    return (

        <>
            {
                (!editor || loading) ?
                    <EditorSkeleton /> :
                    <>
                        {/* <EditorMenuBar editor={editor} />    */}
                        <div className='max-h-[40vh] overflow-y-auto'>
                          <EditorContent editor={editor}/>
                        </div>

                        

                    </>
            }
        </>
    )
}
export default ContentTextEditor






