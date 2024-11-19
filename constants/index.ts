import { IconType } from "react-icons/lib";
import { TbFileDescription } from "react-icons/tb";
import { RiImageAddLine } from "react-icons/ri";
import { MdRecordVoiceOver } from "react-icons/md";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { VscSymbolKeyword } from "react-icons/vsc";
import { BiVideoPlus } from "react-icons/bi";
import { GrHistory } from "react-icons/gr";
import ChatGptLogo from "@/components/icons/ChatGptLogo";
import StableDiffusionLogo from "@/components/icons/StableDiffusionLogo";
import PixabayLogo from "@/components/icons/PixaBayLogo";
import { FaUnsplash } from "react-icons/fa6";

export const NavMenuItems: { title: string; href: string; description: string; icon: IconType }[] = [
    {
        title: "Script Generation",
        href: "/dashboard/script-generation",
        description: "Create scripts automatically using AI with various templates and customization options.",
        icon: TbFileDescription

    },
    {
        title: "Image Generation",
        href: "/dashboard/image-generation",
        description:
            "Generate images from text prompts with customizable styles and themes.",

        icon: RiImageAddLine
    },
    {
        title: "Voiceover Generation",
        href: "/dashboard/voiceover-generation",
        description:
            "Convert scripts into voiceovers with different voice options and settings for pitch and tone.",

        icon: MdRecordVoiceOver
    },
    {
        title: "Video Editing",
        href: "/dashboard/video-editing",
        description:
            "Edit videos using a user-friendly timeline with tools for trimming, transitions, and text overlays.",

        icon: MdOutlineOndemandVideo
    },

    {
        title: "Keyword Research",
        href: "/dashboard/keyword-research",
        description:
            "Insights into user activity, project usage, and content performance.",

        icon: VscSymbolKeyword
    },

];

export const DashboardNavMenuItems: { title: string; href: string; description: string; icon: IconType }[] = [
    {
        title: "Create Content",
        href: "/dashboard/content-generation",
        description: "Create scripts automatically using AI with various templates and customization options.",
        icon: BiVideoPlus

    },
    {
        title: "Script Generation",
        href: "/dashboard/script-generation",
        description: "Create scripts automatically using AI with various templates and customization options.",
        icon: TbFileDescription

    },
    {
        title: "Image Generation",
        href: "/dashboard/image-generation",
        description:
            "Generate images from text prompts with customizable styles and themes.",

        icon: RiImageAddLine
    },
    {
        title: "Voiceover Generation",
        href: "/dashboard/voiceover-generation",
        description:
            "Convert scripts into voiceovers with different voice options and settings for pitch and tone.",

        icon: MdRecordVoiceOver
    },
    // {
    //     title: "Video Editing",
    //     href: "/dashboard/video-editing",
    //     description:
    //         "Edit videos using a user-friendly timeline with tools for trimming, transitions, and text overlays.",

    //     icon:MdOutlineOndemandVideo
    //     },

    {
        title: "Topic Research",
        href: "/dashboard/keyword-research",
        description:
            "Insights into user activity, project usage, and content performance.",

        icon: VscSymbolKeyword
    },
    {
        title: "History",
        href: "/dashboard/history",
        description:
            "Insights into user activity, project usage, and content performance.",

        icon: GrHistory
    },
];


export const ScriptTypes = [

    { label: "Comedy", value: "comedy" },
    { label: "Lifestyle", value: "lifestyle" },
    { label: "Drama", value: "drama" },
    { label: "Sci-Fi", value: "sci-fi" },
    { label: "Adventure", value: "adventure" },
    { label: "Mystery", value: "mystery" },
    { label: "Romance", value: "romance" },
    { label: "Documentary", value: "documentary" },
    { label: "Fantasy", value: "fantasy" },
    { label: "Self-Help", value: "self-help" },
    { label: "Motivational", value: "motivational" },
     { label: "Information", value: "informational" },
    { label: "Animation", value: "animation" },
    { label: "Interactive", value: "interactive" },
    { label: "Seasonal", value: "seasonal" },
    { label: "Cultural", value: "cultural" }

    // { label: "Comedy/Funny", value: "comedy" },
    // { label: "Lifestyle", value: "lifestyle" },
    // { label: "Drama", value: "drama" },
    // { label: "Sci-Fi", value: "sci-fi" },
    // { label: "Adventure", value: "adventure" },
    // { label: "Mystery", value: "mystery" },
    // { label: "Romance", value: "romance" },
    // { label: "Thriller", value: "thriller" },
    // { label: "Historical Fiction", value: "historical-fiction" },
    // { label: "Fun Facts", value: "fun-facts" },
    // { label: "Short Stories", value: "short-stories" },
    // { label: "Fantasy", value: "fantasy" },
    // { label: "Supernatural", value: "supernatural" },
    // { label: "Self-Help", value: "self-help" },
    // { label: "Documentary", value: "documentary" },
    // { label: "Biographical", value: "biographical" },
    // { label: "Nature", value: "nature" },
    // { label: "Travel", value: "travel" },
    // { label: "Cooking", value: "cooking" },
    // { label: "Tech Reviews", value: "tech-reviews" },
    // { label: "Product Reviews", value: "product-reviews" },
    // { label: "DIY", value: "diy" },
    // { label: "Health & Fitness", value: "health-fitness" },
    // { label: "Motivational", value: "motivational" },
    // { label: "Podcast", value: "podcast" },
    // { label: "Virtual Reality", value: "vr" },
    // { label: "Animation", value: "animation" },
    // { label: "Interactive", value: "interactive" },
    // { label: "Seasonal", value: "seasonal" },
    // { label: "Cultural", value: "cultural" }



]


export const LanguageStyles = [

    { label: "Formal", value: "formal" },
    { label: "Casual", value: "casual" },
    { label: "Conversational", value: "conversational" },
    { label: "Professional", value: "professional" },
    { label: "Slang-heavy", value: "slang-heavy" }
]



export const ImageStyles = [
    {

        label: "Cartoon",
        value: "cartoon",
        description: "Simplified, colorful, and animated style often seen in cartoons.",
    },
    {
      label: "Photorealistic",
      value: "photorealistic",
      description: "Highly detailed, realistic images as if taken with a camera.",
    },
    {
      label: "Abstract",
      value: "abstract",
      description: "Non-representational, using colors and shapes to express concepts.",
    },
    {
      label: "Minimalist",
      value: "minimalist",
      description: "Clean, simple images with limited detail and color palette.",
    },
    {
      label: "Vintage",
      value: "vintage",
      description: "Retro, old-fashioned style with muted colors and textures.",
    },
    {
      label: "Fantasy",
      value: "fantasy",
      description: "Surreal and imaginative, often featuring mythical elements.",
    },
    {
      label: "Cyberpunk",
      value: "cyberpunk",
      description: "Futuristic, urban, and dystopian, often neon-lit and gritty.",
    },
    {
      label: "Watercolor",
      value: "watercolor",
      description: "Soft, painterly style with delicate brushstrokes and fluid colors.",
    },
    {
      label: "Pencil Sketch",
      value: "pencil_sketch",
      description: "Hand-drawn style with sharp lines and shading, simulating a pencil sketch.",
    },
    {
      label: "Oil Painting",
      value: "oil_painting",
      description: "Rich, textured style that mimics traditional oil painting techniques.",
    },
    {
      label: "3D Render",
      value: "3d_render",
      description: "Highly detailed, realistic 3D-modeled images with depth and perspective.",
    },
    {
      label: "Anime",
      value: "anime",
      description: "Japanese-inspired animation style with large eyes, sharp lines, and bright colors.",
    },
    {
      label: "Comic Book",
      value: "comic_book",
      description: "Bold, dramatic style with thick lines and high-contrast colors.",
    },
    {
      label: "Line Art",
      value: "line_art",
      description: "Simple, monochromatic style made up of clean, bold lines.",
    },
    {
      label: "Pixel Art",
      value: "pixel_art",
      description: "Retro, 8-bit or 16-bit style with blocky pixels and limited color range.",
    },
    {
      label: "Flat Design",
      value: "flat_design",
      description: "Simple, two-dimensional style without gradients or textures.",
    },
    {
      label: "Isometric",
      value: "isometric",
      description: "3D-like style with parallel lines, often used for technical and architectural images.",
    },
  ];


 export const imageGenerationAPIs:{id:number,label:string,value:string,description:string,isAi:boolean, Icon: React.FC | null; }[] = [
    {
      id:0,
      label: "DALL-E 2",
      value: "dalle",
      description: "AI model developed by OpenAI for generating images from textual descriptions.",
      isAi:true,
      Icon:  ChatGptLogo
},
    {
      id:1,
      label: "Stable Diffusion",
      value: "stable-diffusion",
      description: "A deep learning, text-to-image model that generates high-quality images based on text prompts.",
      isAi:true,
      Icon:  StableDiffusionLogo
    },
    {
      id:2,
      label: "Flux 1",
      value: "flux1",
      description: "A cutting-edge API known for its advanced text-on-image capabilities, allowing dynamic placement of text directly onto generated images.",
      isAi:true,
      Icon:  null
    },
    {
      id:3,
      label: "Pixabay",
      value: "pixabay",
      description: "Access to a vast collection of free images and videos, available through a simple API.",
      isAi:false,
      Icon:  PixabayLogo
    },
    {
      id:4,
      label: "Unsplash",
      value: "unsplash",
      description: "High-quality, free images from Unsplash's API, perfect for various creative projects.",
      isAi:false,
      Icon:FaUnsplash
    },
    {
      id:5,
      label: "Pexels",
      value: "pexels",
      description: "A free stock photo and video API, providing high-quality images and videos for various uses.",
      isAi:false,
      Icon:  null
    },
    
  ];



  export const elevenLabDemoVoices = [
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