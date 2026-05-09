import AsyncStorage from "@react-native-async-storage/async-storage";
import type { GeneratedStory } from "../../types/story";
import { STORAGE_KEYS } from "./keys";

export async function getSavedStories(): Promise<GeneratedStory[]> {
  const raw = await AsyncStorage.getItem(STORAGE_KEYS.savedStories);
  if (!raw) return [];

  try {
    return JSON.parse(raw) as GeneratedStory[];
  } catch {
    return [];
  }
}

export async function saveStories(stories: GeneratedStory[]) {
  await AsyncStorage.setItem(
    STORAGE_KEYS.savedStories,
    JSON.stringify(stories),
  );
}

export async function addSavedStory(story: GeneratedStory) {
  const stories = await getSavedStories();
  const nextStories = [story, ...stories];
  await saveStories(nextStories);
  return nextStories;
}
