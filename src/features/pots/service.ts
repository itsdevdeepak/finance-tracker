import fs from "fs/promises";
import path from "path";

import {
  CreateNewPotResponse,
  DeletePotByIdResponse,
  GetPotsByIdResponse,
  GetPotsResponse,
  Pot,
  PotRaw,
  UpdatePotByIdResponse,
} from "./types";

async function getMockData() {
  const filePath = path.join(process.cwd(), "src/lib/data/data.json");
  const rawData = await fs.readFile(filePath, "utf-8");

  const data = JSON.parse(rawData).pots as PotRaw[];
  return data;
}

export async function getPots(): Promise<GetPotsResponse> {
  try {
    const rawData = await getMockData();
    const pots: Pot[] = rawData.map((pot, idx) => ({
      ...pot,
      target: parseInt(pot.target, 10),
      total: parseInt(pot.total, 10),
      id: idx.toString(),
    }));

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
  try {
    const allPots = await getPots();
    const pot = allPots.data.pots.find((pot) => pot.id === id) ?? null;

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

export async function findPotByName(name: string) {
  try {
    const { data } = await getPots();
    const pot = data.pots.find(
      (pot) => pot.name.toLowerCase() === name.trim().toLowerCase(),
    );
    if (!pot) throw new Error(`Can't find pot with name: ${name}`);
    return { data: { pot } };
  } catch (error) {
    console.error("failed update pot", error);
    return {
      data: {
        pot: null,
      },
      error: "failed to find pot with name",
    };
  }
}

export async function updatePotById(
  id: string,
  updatedFields: Partial<Omit<Pot, "id">>,
): Promise<UpdatePotByIdResponse> {
  try {
    const { data } = await getPotById(id);

    if (!data.pot) throw new Error(`Pot with id:${id} doesn't exist`);

    const merged = { ...data.pot, ...updatedFields };

    return { data: { pot: merged } };
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
  try {
    const { data } = await getPotById(id);

    if (!data.pot) throw new Error(`Pot with id:${id} doesn't exist`);

    return { data: { pot: data.pot } };
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
  try {
    const { data } = await findPotByName(potData.name);

    if (data.pot)
      throw new Error(`Pot with name:${potData.name} already exist`);

    return { data: { pot: { id: "newID", ...potData } } };
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
