import type { AgeBand, StoryLanguage } from "./child";
import type { StoryLength, VisualStyle } from "./story";

export type StoryTone =
  | "warm_emotional"
  | "funny_playful"
  | "calm_bedtime"
  | "safe_adventure"
  | "gentle_inspiring";

export type StoryEngineStep =
  | "blueprint"
  | "scene_plan"
  | "draft"
  | "consistency_check"
  | "safety_check"
  | "polish"
  | "final";

export interface ProStoryRequest {
  ageBand: AgeBand;
  language: StoryLanguage;
  length: StoryLength;
  style: VisualStyle;
  lesson: string;
  mainCharacterName: string;
  characterType: string;
  setting: string;
  mood: string;
  childName?: string;
  favoriteTheme?: string;
}

export interface CharacterMemory {
  name: string;
  type: string;
  personality: string[];
  speakingStyle: string;
  emotionalNeed: string;
  strength: string;
  weakness: string;
  visualTraits: string[];
  consistencyRules: string[];
}

export interface StoryBlueprintPlan {
  titleOptions: string[];
  selectedTitle: string;
  logline: string;
  theme: string;
  moral: string;
  emotionalArc: string[];
  characterMemory: CharacterMemory;
  safetyNotes: string[];
}

export interface StoryScenePlan {
  sceneNumber: number;
  title: string;
  purpose: string;
  setting: string;
  emotion: string;
  conflict: string;
  childSafeLimit: string;
  visualDescription: string;
  imagePrompt: string;
}

export interface StoryDraft {
  title: string;
  storyText: string;
  scenes: StoryScenePlan[];
  moral: string;
}

export interface ConsistencyReport {
  passed: boolean;
  issues: string[];
  fixesApplied: string[];
}

export interface SafetyReport {
  passed: boolean;
  ageBand: AgeBand;
  issues: string[];
  fixesApplied: string[];
}

export interface ProStoryResult {
  id: string;
  request: ProStoryRequest;
  blueprint: StoryBlueprintPlan;
  draft: StoryDraft;
  consistencyReport: ConsistencyReport;
  safetyReport: SafetyReport;
  finalTitle: string;
  finalStory: string;
  finalMoral: string;
  sceneSummaries: string[];
  imagePrompts: string[];
  createdAt: string;
}
