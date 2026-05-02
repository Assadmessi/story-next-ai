import type { AgeBand, StoryLanguage } from "../types/child";
import type { StoryLength, VisualStyle } from "../types/story";

export const ageBandOptions: {
  label: string;
  value: AgeBand;
  description: string;
}[] = [
  {
    label: "Ages 3–5",
    value: "3-5",
    description: "Simple, gentle, short sentences",
  },
  {
    label: "Ages 6–8",
    value: "6-8",
    description: "Playful, clear lessons, more adventure",
  },
  {
    label: "Ages 9–12",
    value: "9-12",
    description: "Deeper emotions and richer plots",
  },
];

export const languageOptions: {
  label: string;
  value: StoryLanguage;
  description: string;
}[] = [
  { label: "English", value: "english", description: "English-first stories" },
  {
    label: "Burmese",
    value: "burmese",
    description: "Natural Myanmar storytelling",
  },
  {
    label: "Bilingual",
    value: "bilingual",
    description: "English + Burmese support",
  },
];

export const storyLengthOptions: {
  label: string;
  value: StoryLength;
  description: string;
}[] = [
  {
    label: "Short",
    value: "short",
    description: "Quick bedtime or daily story",
  },
  {
    label: "Long",
    value: "long",
    description: "More detailed story with stronger arc",
  },
];

export const visualStyleOptions: {
  label: string;
  value: VisualStyle;
  description: string;
  emoji: string;
}[] = [
  {
    label: "Soft Cartoon Storybook",
    value: "soft_cartoon",
    description: "Warm, safe, rounded, child-friendly visuals",
    emoji: "🧸",
  },
  {
    label: "Bright Anime Adventure",
    value: "bright_anime",
    description: "Expressive, colorful, adventurous scenes",
    emoji: "🌟",
  },
  {
    label: "Comic Panel Style",
    value: "comic_panel",
    description: "Bold, fun, scene-by-scene storytelling",
    emoji: "📖",
  },
];

export const lessonOptions = [
  "Kindness",
  "Honesty",
  "Bravery",
  "Sharing",
  "Patience",
  "Helping family",
  "Respecting friends",
  "Trying again",
];

export const characterTypeOptions = [
  "Curious child",
  "Talking animal",
  "Little robot",
  "Tiny dragon",
  "Brave rabbit",
  "Kind fairy",
];

export const settingOptions = [
  "Cozy home",
  "Moonlit forest",
  "Friendly school",
  "Magical village",
  "Floating island",
  "Space garden",
];

export const moodOptions = [
  "Warm and emotional",
  "Funny and playful",
  "Calm bedtime",
  "Adventurous but safe",
  "Gentle and inspiring",
];
