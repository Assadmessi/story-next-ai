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
  const alreadySaved = stories.some((item) => item.id === story.id);

  if (alreadySaved) return stories;

  const nextStories = [story, ...stories];
  await saveStories(nextStories);
  return nextStories;
}

export async function deleteSavedStory(storyId: string) {
  const stories = await getSavedStories();
  const nextStories = stories.filter((story) => story.id !== storyId);
  await saveStories(nextStories);
  return nextStories;
}
