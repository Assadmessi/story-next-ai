import AsyncStorage from "@react-native-async-storage/async-storage";
import type { ChildProfile } from "../../types/child";
import { STORAGE_KEYS } from "./keys";

export async function getChildProfiles(): Promise<ChildProfile[]> {
  const raw = await AsyncStorage.getItem(STORAGE_KEYS.childProfiles);
  if (!raw) return [];

  try {
    return JSON.parse(raw) as ChildProfile[];
  } catch {
    return [];
  }
}

export async function saveChildProfiles(profiles: ChildProfile[]) {
  await AsyncStorage.setItem(
    STORAGE_KEYS.childProfiles,
    JSON.stringify(profiles),
  );
}

export async function addChildProfile(profile: ChildProfile) {
  const profiles = await getChildProfiles();
  const nextProfiles = [profile, ...profiles];
  await saveChildProfiles(nextProfiles);
  return nextProfiles;
}
