import { BsJustify, BsJustifyLeft, BsJustifyRight } from "react-icons/bs"
import { Toggle } from "@/components/ui/toggle"

export const EditorMenuBar = ({ editor }: any) => {
    if (!editor) {
        return null
    }

    return (
        <div className="mb-4">
            <div className="flex flex-wrap gap-2">
                <Toggle
                    variant={'outline'}
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    data-state={editor.isActive('heading', { level: 1 }) ? 'on' : 'off'}
                >
                    H1
                </Toggle>

                <Toggle
                    variant={'outline'}
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    data-state={editor.isActive('heading', { level: 2 }) ? 'on' : 'off'}
                >
                    H2
                </Toggle>

                <Toggle
                    variant={'outline'}
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    data-state={editor.isActive('heading', { level: 3 }) ? 'on' : 'off'}
                >
                    H3
                </Toggle>

                <Toggle
                    variant={'outline'}
                    onClick={() => editor.chain().focus().setParagraph().run()}
                    data-state={editor.isActive('paragraph') ? 'on' : 'off'}
                >
                    P
                </Toggle>

                <Toggle
                    variant={'outline'}
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    data-state={editor.isActive('bold') ? 'on' : 'off'}
                >
                    B
                </Toggle>

                <Toggle
                    variant={'outline'}
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className='italic'
                    data-state={editor.isActive('italic') ? 'on' : 'off'}
                >
                    I
                </Toggle>

                <Toggle
                    variant={'outline'}
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    className='line-through'
                    data-state={editor.isActive('strike') ? 'on' : 'off'}
                >
                    S
                </Toggle>

                <Toggle
                    variant={'outline'}
                    onClick={() => editor.chain().focus().toggleHighlight().run()}
                    data-state={editor.isActive('highlight') ? 'on' : 'off'}
                >
                    Highlight
                </Toggle>

                <Toggle
                    variant={'outline'}
                    onClick={() => editor.chain().focus().setTextAlign('left').run()}
                    data-state={editor.isActive({ textAlign: 'left' }) ? 'on' : 'off'}
                >
                    <BsJustifyLeft />
                </Toggle>

                <Toggle
                    variant={'outline'}
                    onClick={() => editor.chain().focus().setTextAlign('center').run()}
                    data-state={editor.isActive({ textAlign: 'center' }) ? 'on' : 'off'}
                >
                    <BsJustify />
                </Toggle>

                <Toggle
                    variant={'outline'}
                    onClick={() => editor.chain().focus().setTextAlign('right').run()}
                    data-state={editor.isActive({ textAlign: 'right' }) ? 'on' : 'off'}
                >
                    <BsJustifyRight />
                </Toggle>
            </div>
        </div>
    )
}
