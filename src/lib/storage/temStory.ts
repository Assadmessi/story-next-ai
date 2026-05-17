import AsyncStorage from "@react-native-async-storage/async-storage";
import type { GeneratedStory } from "../../types/story";

const TEMP_STORY_PREFIX = "storynest.temp_story.";

export async function saveTempStory(story: GeneratedStory) {
  await AsyncStorage.setItem(
    `${TEMP_STORY_PREFIX}${story.id}`,
    JSON.stringify(story),
  );

  return story.id;
}

export async function getTempStory(storyId: string) {
  const raw = await AsyncStorage.getItem(`${TEMP_STORY_PREFIX}${storyId}`);

  if (!raw) return null;

  try {
    return JSON.parse(raw) as GeneratedStory;
  } catch {
    return null;
  }
}
