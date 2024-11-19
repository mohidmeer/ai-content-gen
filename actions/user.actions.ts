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
          script:history.script,
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
    return data;
  } catch (error) {

    throw error

  }
}

export const getHistoryDetails = async (id: string) => {
  try {
    const history = await prisma.history.findUnique({
      where: {
        id: id,
      },
    });

    return history;
  } catch (error) {
    console.error("Error fetching history details:", error);
    return null;
  }
};