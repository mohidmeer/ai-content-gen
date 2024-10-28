import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';



interface ContentContextProps {
    content: string;
    setContent: Dispatch<SetStateAction<string>>;
    // step: number;
    // setStep: Dispatch<SetStateAction<number>>;
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
    const [content, setContent] = useState<string>( `<h2>Why Drinking Water is Essential</h2>
        <p>Did you know that drinking water is one of the easiest ways to improve your health?</p>
        <p>Water helps keep your skin glowing, your energy levels high, and even boosts your mood throughout the day.</p>`);
    // const [step, setStep] = useState<number>(1);
    const [progress, setProgress] = useState<number>(22);
    // const [images, setImages] = useState<string[]>([]);
    const [images, setImages] = useState<string[]>([
        "https://images.unsplash.com/photo-1633381521050-26bb467d9d5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NjYxNTJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3Mjk5MTAxMTB8&ixlib=rb-4.0.3&q=80&w=1080",
        "https://images.unsplash.com/photo-1529111290557-82f6d5c6cf85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NjYxNTJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3Mjk5MTAxMTZ8&ixlib=rb-4.0.3&q=80&w=1080",
        "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NjYxNTJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3Mjk5MTAxMjV8&ixlib=rb-4.0.3&q=80&w=1080",
        "https://images.unsplash.com/photo-1516913840875-366de3e463bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NjYxNTJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3Mjk5MTAxMzN8&ixlib=rb-4.0.3&q=80&w=1080",
        "https://images.unsplash.com/photo-1535643302794-19c3804b874b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NjYxNTJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3Mjk5MTAxMzl8&ixlib=rb-4.0.3&q=80&w=1080",
        "https://images.unsplash.com/photo-1535987309421-9fa2b1bca07e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NjYxNTJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3Mjk5MTAxNDl8&ixlib=rb-4.0.3&q=80&w=1080"
    ]);
    const [voices] = useState<Voice[]>( [
            {
                "id": "9BWtsMINqrJLrRacOk9x",
                "name": "Aria",
                "labels": {
                    "accent": "American",
                    "description": "expressive",
                    "age": "middle-aged",
                    "gender": "female",
                    "use_case": "social media"
                },
                "preview_url": "https://storage.googleapis.com/eleven-public-prod/premade/voices/9BWtsMINqrJLrRacOk9x/405766b8-1f4e-4d3c-aba1-6f25333823ec.mp3"
            },
            {
                "id": "CwhRBWXzGAHq8TQ4Fs17",
                "name": "Roger",
                "labels": {
                    "accent": "American",
                    "description": "confident",
                    "age": "middle-aged",
                    "gender": "male",
                    "use_case": "social media"
                },
                "preview_url": "https://storage.googleapis.com/eleven-public-prod/premade/voices/CwhRBWXzGAHq8TQ4Fs17/58ee3ff5-f6f2-4628-93b8-e38eb31806b0.mp3"
            },
            {
                "id": "EXAVITQu4vr4xnSDxMaL",
                "name": "Sarah",
                "labels": {
                    "accent": "american",
                    "description": "soft",
                    "age": "young",
                    "gender": "female",
                    "use_case": "news"
                },
                "preview_url": "https://storage.googleapis.com/eleven-public-prod/premade/voices/EXAVITQu4vr4xnSDxMaL/01a3e33c-6e99-4ee7-8543-ff2216a32186.mp3"
            },
            {
                "id": "FGY2WhTYpPnrIDTdsKH5",
                "name": "Laura",
                "labels": {
                    "accent": "American",
                    "description": "upbeat",
                    "age": "young",
                    "gender": "female",
                    "use_case": "social media"
                },
                "preview_url": "https://storage.googleapis.com/eleven-public-prod/premade/voices/FGY2WhTYpPnrIDTdsKH5/67341759-ad08-41a5-be6e-de12fe448618.mp3"
            },
            {
                "id": "IKne3meq5aSn9XLyUdCD",
                "name": "Charlie",
                "labels": {
                    "accent": "Australian",
                    "description": "natural",
                    "age": "middle aged",
                    "gender": "male",
                    "use_case": "conversational"
                },
                "preview_url": "https://storage.googleapis.com/eleven-public-prod/premade/voices/IKne3meq5aSn9XLyUdCD/102de6f2-22ed-43e0-a1f1-111fa75c5481.mp3"
            },
            {
                "id": "JBFqnCBsd6RMkjVDRZzb",
                "name": "George",
                "labels": {
                    "accent": "British",
                    "description": "warm",
                    "age": "middle aged",
                    "gender": "male",
                    "use_case": "narration"
                },
                "preview_url": "https://storage.googleapis.com/eleven-public-prod/premade/voices/JBFqnCBsd6RMkjVDRZzb/e6206d1a-0721-4787-aafb-06a6e705cac5.mp3"
            },
            {
                "id": "N2lVS1w4EtoT3dr4eOWO",
                "name": "Callum",
                "labels": {
                    "accent": "Transatlantic",
                    "description": "intense",
                    "age": "middle-aged",
                    "gender": "male",
                    "use_case": "characters"
                },
                "preview_url": "https://storage.googleapis.com/eleven-public-prod/premade/voices/N2lVS1w4EtoT3dr4eOWO/ac833bd8-ffda-4938-9ebc-b0f99ca25481.mp3"
            },
            {
                "id": "SAz9YHcvj6GT2YYXdXww",
                "name": "River",
                "labels": {
                    "accent": "American",
                    "description": "confident",
                    "age": "middle-aged",
                    "gender": "non-binary",
                    "use_case": "social media"
                },
                "preview_url": "https://storage.googleapis.com/eleven-public-prod/premade/voices/SAz9YHcvj6GT2YYXdXww/e6c95f0b-2227-491a-b3d7-2249240decb7.mp3"
            },
            {
                "id": "TX3LPaxmHKxFdv7VOQHJ",
                "name": "Liam",
                "labels": {
                    "accent": "American",
                    "description": "articulate",
                    "age": "young",
                    "gender": "male",
                    "use_case": "narration"
                },
                "preview_url": "https://storage.googleapis.com/eleven-public-prod/premade/voices/TX3LPaxmHKxFdv7VOQHJ/63148076-6363-42db-aea8-31424308b92c.mp3"
            },
            {
                "id": "XB0fDUnXU5powFXDhCwa",
                "name": "Charlotte",
                "labels": {
                    "accent": "Swedish",
                    "description": "seductive",
                    "age": "young",
                    "gender": "female",
                    "use_case": "characters"
                },
                "preview_url": "https://storage.googleapis.com/eleven-public-prod/premade/voices/XB0fDUnXU5powFXDhCwa/942356dc-f10d-4d89-bda5-4f8505ee038b.mp3"
            },
            {
                "id": "Xb7hH8MSUJpSbSDYk0k2",
                "name": "Alice",
                "labels": {
                    "accent": "British",
                    "description": "confident",
                    "age": "middle-aged",
                    "gender": "female",
                    "use_case": "news"
                },
                "preview_url": "https://storage.googleapis.com/eleven-public-prod/premade/voices/Xb7hH8MSUJpSbSDYk0k2/d10f7534-11f6-41fe-a012-2de1e482d336.mp3"
            },
            {
                "id": "XrExE9yKIg1WjnnlVkGX",
                "name": "Matilda",
                "labels": {
                    "accent": "American",
                    "description": "friendly",
                    "age": "middle-aged",
                    "gender": "female",
                    "use_case": "narration"
                },
                "preview_url": "https://storage.googleapis.com/eleven-public-prod/premade/voices/XrExE9yKIg1WjnnlVkGX/b930e18d-6b4d-466e-bab2-0ae97c6d8535.mp3"
            },
            {
                "id": "bIHbv24MWmeRgasZH58o",
                "name": "Will",
                "labels": {
                    "accent": "American",
                    "description": "friendly",
                    "age": "young",
                    "gender": "male",
                    "use_case": "social media"
                },
                "preview_url": "https://storage.googleapis.com/eleven-public-prod/premade/voices/bIHbv24MWmeRgasZH58o/8caf8f3d-ad29-4980-af41-53f20c72d7a4.mp3"
            },
            {
                "id": "cgSgspJ2msm6clMCkdW9",
                "name": "Jessica",
                "labels": {
                    "accent": "American",
                    "description": "expressive",
                    "age": "young",
                    "gender": "female",
                    "use_case": "conversational"
                },
                "preview_url": "https://storage.googleapis.com/eleven-public-prod/premade/voices/cgSgspJ2msm6clMCkdW9/56a97bf8-b69b-448f-846c-c3a11683d45a.mp3"
            },
            {
                "id": "cjVigY5qzO86Huf0OWal",
                "name": "Eric",
                "labels": {
                    "accent": "American",
                    "description": "friendly",
                    "age": "middle-aged",
                    "gender": "male",
                    "use_case": "conversational"
                },
                "preview_url": "https://storage.googleapis.com/eleven-public-prod/premade/voices/cjVigY5qzO86Huf0OWal/d098fda0-6456-4030-b3d8-63aa048c9070.mp3"
            },
            {
                "id": "iP95p4xoKVk53GoZ742B",
                "name": "Chris",
                "labels": {
                    "accent": "American",
                    "description": "casual",
                    "age": "middle-aged",
                    "gender": "male",
                    "use_case": "conversational"
                },
                "preview_url": "https://storage.googleapis.com/eleven-public-prod/premade/voices/iP95p4xoKVk53GoZ742B/3f4bde72-cc48-40dd-829f-57fbf906f4d7.mp3"
            },
            {
                "id": "nPczCjzI2devNBz1zQrb",
                "name": "Brian",
                "labels": {
                    "accent": "American",
                    "description": "deep",
                    "age": "middle-aged",
                    "gender": "male",
                    "use_case": "narration"
                },
                "preview_url": "https://storage.googleapis.com/eleven-public-prod/premade/voices/nPczCjzI2devNBz1zQrb/2dd3e72c-4fd3-42f1-93ea-abc5d4e5aa1d.mp3"
            },
            {
                "id": "onwK4e9ZLuTAKqWW03F9",
                "name": "Daniel",
                "labels": {
                    "accent": "British",
                    "description": "authoritative",
                    "age": "middle-aged",
                    "gender": "male",
                    "use_case": "news"
                },
                "preview_url": "https://storage.googleapis.com/eleven-public-prod/premade/voices/onwK4e9ZLuTAKqWW03F9/7eee0236-1a72-4b86-b303-5dcadc007ba9.mp3"
            },
            {
                "id": "pFZP5JQG7iQjIQuC4Bku",
                "name": "Lily",
                "labels": {
                    "accent": "British",
                    "description": "warm",
                    "age": "middle-aged",
                    "gender": "female",
                    "use_case": "narration"
                },
                "preview_url": "https://storage.googleapis.com/eleven-public-prod/premade/voices/pFZP5JQG7iQjIQuC4Bku/89b68b35-b3dd-4348-a84a-a3c13a3c2b30.mp3"
            },
            {
                "id": "pqHfZKP75CvOlQylNhV4",
                "name": "Bill",
                "labels": {
                    "accent": "American",
                    "description": "trustworthy",
                    "age": "old",
                    "gender": "male",
                    "use_case": "narration"
                },
                "preview_url": "https://storage.googleapis.com/eleven-public-prod/premade/voices/pqHfZKP75CvOlQylNhV4/d782b3ff-84ba-4029-848c-acf01285524d.mp3"
            }
        ]
    )
    // const [generatedAudio, setGeneratedAudio] = useState<string | null>(null);
    const [generatedAudio, setGeneratedAudio] = useState<string | null>('https://storage.googleapis.com/bucket-quickstart_ai-content-gen-439516/audio/mp3/1d16b47b-81a9-4429-a9a1-e6972f7edeb4.mp3');

    const [isSavingHistory,setIsSavingHistory] = useState<boolean>(false)

    return (
        <ContentContext.Provider value={{ 
            content, setContent, 
            // step, setStep,
            isSavingHistory,setIsSavingHistory, 
            progress, setProgress,
            images,setImages,
            voices,
            generatedAudio,
            setGeneratedAudio 
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
