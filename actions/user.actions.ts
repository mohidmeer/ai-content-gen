'use server';

import { auth } from "@/auth";
import { prisma } from "@/prisma";

export const saveHistoryToBD = async (history: HistroyDetails) => {

  const userSession = await auth()

  try {

    if (history.id) {
      let updatedHistory = await prisma.history.update({
        where: { id: history.id },
        data: {
          content: history.content,
          step: history.step,
          imageUrl: history.images,
          voiceUrl: history.generatedAudio,
        },
      });
      console.log('Executed same database id for history ')
      return updatedHistory.id;
    } else {

      const newHistory = await prisma.history.create({
        data: {
          userId: userSession?.user?.id!,
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


export const getHistory = async () => {

  const userSession = await auth()
  try {
    const data = await prisma.history.findMany({
      where: {
        userId: userSession?.user!.id,
      },
    });
    console.log(data)
    return data;


  } catch (error) {

    throw error

  }


}
