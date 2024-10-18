import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';



interface ContentContextProps {
    content: string;
    setContent: Dispatch<SetStateAction<string>>;
    step: number;
    setStep: Dispatch<SetStateAction<number>>;
    progress: number;
    setProgress: Dispatch<SetStateAction<number>>;
    images: string[];
    setImages: Dispatch<SetStateAction<string[]>>;
}

const ContentContext = createContext<ContentContextProps | undefined>(undefined);


export const ContentProvider = ({ children }: { children: ReactNode }) => {
    const [content, setContent] = useState<string>('');
    const [step, setStep] = useState<number>(1);
    const [progress, setProgress] = useState<number>(22);
    const [images, setImages] = useState<string[]>([]);

    return (
        <ContentContext.Provider value={{ content, setContent, step, setStep, progress, setProgress,images,setImages }}>
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
