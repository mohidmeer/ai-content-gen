import { elevenLabDemoVoices } from '@/constants';
import { demoJsonScript } from '@/demoData';
import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';



interface ContentContextProps {
    content: string;
    setContent: Dispatch<SetStateAction<string>>;
    
    script: Record<string, any>;
    setScript: Dispatch<SetStateAction<Record<string, any>>>;

    progress: number;
    setProgress: Dispatch<SetStateAction<number>>;
    images: string[];
    setImages: Dispatch<SetStateAction<string[]>>;
    voices?:Voice[];
    generatedAudio?: string | null;
    setGeneratedAudio: Dispatch<SetStateAction<string | null>>;
    isSavingHistory:boolean;
    setIsSavingHistory:Dispatch<SetStateAction<boolean>>;

}

const ContentContext = createContext<ContentContextProps | undefined>(undefined);


export const ContentProvider = ({ children }: { children: ReactNode }) => {
    const [content, setContent] = useState<string>('');
    const [progress, setProgress] = useState<number>(22);
    const [images, setImages] = useState<string[]>([]);
    const [voices] = useState<Voice[]>(elevenLabDemoVoices)
    const [generatedAudio, setGeneratedAudio] = useState<string | null>(null);
    const [isSavingHistory,setIsSavingHistory] = useState<boolean>(false)
    const [script, setScript] = useState<Record<string, any>>(demoJsonScript);  

    return (
        <ContentContext.Provider value={{ 
            content, setContent, 
            isSavingHistory,setIsSavingHistory, 
            progress, setProgress,
            images,setImages,
            voices,
            generatedAudio,
            setGeneratedAudio, 
            script,
            setScript
            }}>
            {children}
        </ContentContext.Provider>
    );
};


export const useContent = () => {
    const context = useContext(ContentContext);
    if (!context) {
        throw new Error('useContent must be used within a ContentProvider');
    }
    return context;
};
