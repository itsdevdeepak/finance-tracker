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
import { POT_ERROR_MESSAGES } from "./constants";

const omitPotProperties = {
  createdAt: true,
  updatedAt: true,
  userId: true,
};

export async function getPots(): Promise<GetPotsResponse> {
  const session = await verifySession();
  if (!session.isAuth) throw new Error("Unauthorized");

  try {
    const pots = await prisma.pot.findMany({
      where: { userId: session.userId },
      omit: omitPotProperties
    });

    return { data: { pots } };
  } catch (error) {
    console.error(POT_ERROR_MESSAGES.FETCH_ALL_FAILED, error);
    return {
      data: {
        pots: [],
      },
      error: POT_ERROR_MESSAGES.FETCH_ALL_FAILED,
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
    });

    return { data: { pot } };
  } catch (error) {
    console.error(POT_ERROR_MESSAGES.FETCH_BY_ID_FAILED, error);
    return {
      data: {
        pot: null,
      },
      error: POT_ERROR_MESSAGES.FETCH_BY_ID_FAILED,
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

    if (!existingPot) {
      throw new Error(POT_ERROR_MESSAGES.INVALID_ID);
    }

    const updatedPot = await prisma.pot.update({
      where: { id, userId: session.userId },
      data: updatedFields,
      omit: omitPotProperties
    });

    return { data: { pot: updatedPot } };
  } catch (error) {
    console.error(POT_ERROR_MESSAGES.UPDATE_FAILED, error);

    if (error instanceof Error) {
      return { data: { pot: null }, error: error.message };
    }

    return {
      data: {
        pot: null,
      },
      error: POT_ERROR_MESSAGES.UPDATE_FAILED
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

    if (!existingPot) {
      throw new Error(POT_ERROR_MESSAGES.INVALID_ID);
    }

    const deletedPot = await prisma.pot.delete({
      where: {
        id,
      },
      omit: omitPotProperties
    });

    return { data: { pot: deletedPot } };
  } catch (error) {
    console.error(POT_ERROR_MESSAGES.DELETE_FAILED, error);

    if (error instanceof Error) {
      return { data: { pot: null }, error: error.message };
    }

    return {
      data: {
        pot: null,
      },
      error: POT_ERROR_MESSAGES.DELETE_FAILED,
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

    if (existingPot) {
      throw new Error(POT_ERROR_MESSAGES.DUPLICATE);
    }

    const newPot = await prisma.pot.create({
      data: {
        ...potData,
        userId: session.userId
      },
      omit: omitPotProperties
    });

    return { data: { pot: newPot } };
  } catch (error) {
    console.error(POT_ERROR_MESSAGES.CREATE_FAILED, error);

    if (error instanceof Error) {
      return { data: { pot: null }, error: error.message };
    }

    return {
      data: {
        pot: null,
      },
      error: POT_ERROR_MESSAGES.CREATE_FAILED,
    };
  }
}
