import {
  CreateNewPotResponse,
  DeletePotByIdResponse,
  GetPotsByIdResponse,
  GetPotsResponse,
  Pot,
  UpdatePotByIdResponse,
} from "./types";
import { verifySession } from "@/lib/auth-session";
import { prisma } from "@/lib/prisma";

const omitPotProperties = {
  createdAt: true,
  updatedAt: true,
  userId: true,
}

export async function getPots(): Promise<GetPotsResponse> {
  const session = await verifySession();
  if (!session.isAuth) throw new Error("Unauthorized");

  try {
    const pots = await prisma.pot.findMany({
      where: { userId: session.userId },
      omit: omitPotProperties
    })

    return { data: { pots } };
  } catch (error) {
    console.error("failed getting pots data", error);
    return {
      data: {
        pots: [],
      },
      error: "failed getting pots data",
    };
  }
}

export async function getPotById(id: string): Promise<GetPotsByIdResponse> {
  const session = await verifySession();
  if (!session.isAuth) throw new Error("Unauthorized");

  try {
    const pot = await prisma.pot.findUnique({
      where: {
        id: id,
        userId: session.userId
      },
      omit: omitPotProperties
    })

    return { data: { pot } };
  } catch (error) {
    console.error("failed getting pot data", error);
    return {
      data: {
        pot: null,
      },
      error: "failed getting pots data",
    };
  }
}

export async function updatePotById(
  id: string,
  updatedFields: Partial<Omit<Pot, "id">>,
): Promise<UpdatePotByIdResponse> {
  const session = await verifySession();
  if (!session.isAuth) throw new Error("Unauthorized");

  try {
    const existingPot = await prisma.pot.findUnique({ where: { id, userId: session.userId } });

    if (!existingPot || existingPot.userId !== session.userId) {
      throw new Error(`Pot with id:${id} doesn't exist`);
    }

    const updatedPot = await prisma.pot.update({
      where: { id, userId: session.userId },
      data: updatedFields,
      omit: omitPotProperties
    });

    return { data: { pot: updatedPot } };
  } catch (error) {
    console.error("failed update pot", error);
    return {
      data: {
        pot: null,
      },
      error: "failed to update pot",
    };
  }
}

export async function deletePotById(
  id: string,
): Promise<DeletePotByIdResponse> {
  const session = await verifySession();
  if (!session.isAuth) throw new Error("Unauthorized");

  try {
    const existingPot = await prisma.pot.findUnique({ where: { id, userId: session.userId } });

    if (!existingPot || existingPot.userId !== session.userId) {
      throw new Error(`Pot with id:${id} doesn't exist`);
    }

    const deletedPot = await prisma.pot.delete({
      where: {
        id,
      },
      omit: omitPotProperties
    })

    return { data: { pot: deletedPot } };
  } catch (error) {
    console.error("failed to delete pot", error);
    return {
      data: {
        pot: null,
      },
      error: "failed to delete pot",
    };
  }
}

export async function createNewPot(
  potData: Omit<Pot, "id">,
): Promise<CreateNewPotResponse> {
  const session = await verifySession();
  if (!session.isAuth) throw new Error("Unauthorized");

  try {
    const existingPot = await prisma.pot.findUnique({
      where:
      {
        name_userId: {
          name: potData.name,
          userId: session.userId
        }
      }
    });

    if (existingPot && existingPot.userId !== session.userId) {
      throw new Error(`Pot with name:${potData.name} already exist`);
    }

    const newPot = await prisma.pot.create({
      data: {
        ...potData,
        userId: session.userId
      },
      omit: omitPotProperties
    })

    return { data: { pot: newPot } };
  } catch (error) {
    console.error("failed to create pot", error);
    return {
      data: {
        pot: null,
      },
      error: "Failed to create pot",
    };
  }
}
