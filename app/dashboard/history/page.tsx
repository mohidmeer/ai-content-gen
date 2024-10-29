// "use client"
import Header from "@/components/Header"
import DataTable from "./Table"
// import { HistoryType } from "./Columns"
// import { useEffect, useState } from "react"
import { getHistory } from "@/actions/user.actions"



export default async function  History() {

  const history = await getHistory();

  const stripHtmlUsingRegex = (htmlString:any) => {
    return htmlString.replace(/<[^>]*>?/gm, '');
  };
  

  const formattedData = history.map((item) => ({
    ...item,
    content: stripHtmlUsingRegex(item.content),
  }));

 
  return (
    <div className="w-full">
      <Header title="History" />
      <DataTable history={formattedData} />
    </div>
  )
}