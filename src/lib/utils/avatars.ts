import { AVATARS } from "@/constants/avatars";

export function getRandomNonHumanAvatar() {
  const index = Math.floor(Math.random() * AVATARS.length);
  return AVATARS[index];
}

export function getAvatarOrRandom(avatar: string | null | undefined) {
  const normalizedAvatar = avatar?.trim();
  if (normalizedAvatar) return normalizedAvatar;
  return getRandomNonHumanAvatar();
}
