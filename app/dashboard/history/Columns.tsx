"use client"

import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
import { MdLink, } from "react-icons/md"
import moment from "moment";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@radix-ui/react-hover-card";

export type HistoryType = {
    id: string;
    userId: string;
    type: string;
    step: number;
    content: string | null;
    imageUrl: string[];
    voiceUrl: string | null;
    createdAt: Date;
    updatedAt: Date;
}


export const Columns: ColumnDef<HistoryType>[] = [
    {
        accessorKey: "content",
        header: "Description",
        cell: ({ row }) => (
            <div className="capitalize truncate w-[200px]">{row.getValue("content")}</div>
        ),
    },
    {
        accessorKey: "createdAt",
        header: "Created at",
        cell: ({ row }) => (
            <HoverCard>
                <HoverCardTrigger>{moment(row.getValue("createdAt")).fromNow()}</HoverCardTrigger>
                <HoverCardContent className="bg-secondary p-2">
                    {row.getValue<Date>("createdAt").toLocaleString()}
                </HoverCardContent>
            </HoverCard>
        
        ),

    },
    {
        id: 'action',
        header: 'Action',
        cell: ({ row }) => {

            const { step, id } = row.original;

            return (
                <Link href={`/dashboard/content-generation?step=${step}&id=${id}`} >
                    <MdLink size={24} />
                </Link>
            );
        }
    }
]