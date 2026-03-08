import { ColorsByName } from "@/constants/colors";

export function getColorByName(name: string): string | null {
  return ColorsByName[name as keyof typeof ColorsByName] ?? null;
}
