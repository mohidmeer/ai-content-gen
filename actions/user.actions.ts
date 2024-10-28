'use server';

import { prisma } from "@/prisma";

export const saveHistoryToBD = async (history: HistroyDetails) => {

  try {

    if (history.id) {


      const updatedHistory = await prisma.history.update({
        where: { id: history.id },
        data: {
          content: history.content,
          step: history.step,
          imageUrl: history.images,
          voiceUrl: history.generatedAudio,
        },
      });
      return updatedHistory.id;


    } else {


      const newHistory = await prisma.history.create({
        data: {
          userId: history.userId,
          type: 'CONTENT_GENERATION',
          step: history.step,
          content: history.content,
          imageUrl: history.images,
          voiceUrl: history.generatedAudio,
        },
      });
      return newHistory.id;
    }



  } catch (error) {

    console.log(error)

  }
}  
