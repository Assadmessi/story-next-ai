import type { StoryLanguage } from "./child";

export type StoryLength = "short" | "long";
export type VisualStyle = "soft_cartoon" | "bright_anime" | "comic_panel";

export interface StorySetupInput {
  childProfileId?: string;
  language: StoryLanguage;
  length: StoryLength;
  style: VisualStyle;
  lesson: string;
  mainCharacterName: string;
  characterType: string;
  setting: string;
  mood: string;
}

export interface StoryBlueprint {
  titles: string[];
  summary: string;
  emotionalArc: string;
  moral: string;
}

export interface GeneratedStory {
  id: string;
  setup: StorySetupInput;
  blueprint: StoryBlueprint;
  title: string;
  story: string;
  scenes: string[];
  moral: string;
  createdAt: string;
}
