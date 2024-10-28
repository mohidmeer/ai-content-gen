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