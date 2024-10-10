import { TbScriptPlus } from "react-icons/tb";
import { IconType } from "react-icons/lib";
import { TbFileDescription } from "react-icons/tb";
import { RiImageAddLine } from "react-icons/ri";
import { MdRecordVoiceOver } from "react-icons/md";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { VscSymbolKeyword } from "react-icons/vsc";
import { BiVideoPlus } from "react-icons/bi";
import { GrHistory } from "react-icons/gr";

export const NavMenuItems: { title: string; href: string; description: string; icon: IconType }[] = [
    {
        title: "Script Generation",
        href: "/dashboard/script-generation",
        description: "Create scripts automatically using AI with various templates and customization options.",
        icon:TbFileDescription

    },
    {
        title: "Image Generation",
        href: "/dashboard/image-generation",
        description:
            "Generate images from text prompts with customizable styles and themes.",
        
        icon:RiImageAddLine
        },
    {
        title: "Voiceover Generation",
        href: "/dashboard/voiceover-generation",
        description:
            "Convert scripts into voiceovers with different voice options and settings for pitch and tone.",
        
        icon:MdRecordVoiceOver
        },
    {
        title: "Video Editing",
        href: "/dashboard/video-editing",
        description:
            "Edit videos using a user-friendly timeline with tools for trimming, transitions, and text overlays.",
        
        icon:MdOutlineOndemandVideo
        },
 
    {
        title: "Keyword Research",
        href: "/dashboard/keyword-research",
        description:
            "Insights into user activity, project usage, and content performance.",
        
        icon:VscSymbolKeyword
        },
 
];

export const DashboardNavMenuItems: { title: string; href: string; description: string; icon: IconType }[] = [
    {
        title: "Create Content",
        href: "/dashboard/content-generation",
        description: "Create scripts automatically using AI with various templates and customization options.",
        icon:BiVideoPlus

    },
    {
        title: "Script Generation",
        href: "/dashboard/script-generation",
        description: "Create scripts automatically using AI with various templates and customization options.",
        icon:TbFileDescription

    },
    {
        title: "Image Generation",
        href: "/dashboard/image-generation",
        description:
            "Generate images from text prompts with customizable styles and themes.",
        
        icon:RiImageAddLine
        },
    {
        title: "Voiceover Generation",
        href: "/dashboard/voiceover-generation",
        description:
            "Convert scripts into voiceovers with different voice options and settings for pitch and tone.",
        
        icon:MdRecordVoiceOver
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
        
        icon:VscSymbolKeyword
        },
    {
        title: "History",
        href: "/dashboard/history",
        description:
            "Insights into user activity, project usage, and content performance.",
        
        icon:GrHistory
        },
];