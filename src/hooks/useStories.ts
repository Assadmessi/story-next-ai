import { useCallback, useEffect, useState } from "react";
import {
  addSavedStory,
  deleteSavedStory,
  getSavedStories,
} from "../lib/storage/stories";
import type { GeneratedStory } from "../types/story";

export function useStories() {
  const [stories, setStories] = useState<GeneratedStory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadStories = useCallback(async () => {
    setIsLoading(true);
    const storedStories = await getSavedStories();
    setStories(storedStories);
    setIsLoading(false);
  }, []);

  const saveStory = useCallback(async (story: GeneratedStory) => {
    const nextStories = await addSavedStory(story);
    setStories(nextStories);
  }, []);

  const removeStory = useCallback(async (storyId: string) => {
    const nextStories = await deleteSavedStory(storyId);
    setStories(nextStories);
  }, []);

  useEffect(() => {
    loadStories();
  }, [loadStories]);

  return {
    stories,
    isLoading,
    loadStories,
    saveStory,
    removeStory,
  };
}
