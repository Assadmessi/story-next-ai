import type { StoryLanguage } from "../../types/child";

export function getLanguageInstruction(language: StoryLanguage) {
  if (language === "burmese") {
    return [
      "Write the story naturally in Burmese/Myanmar language.",
      "Do not sound like direct translation from English.",
      "Use warm storyteller Burmese suitable for parents reading to children.",
      "Keep sentences smooth, clear, and age-appropriate.",
    ];
  }

  if (language === "bilingual") {
    return [
      "Produce English first, then Burmese/Myanmar version.",
      "The Burmese version must be natural storytelling, not word-for-word translation.",
      "Keep both versions consistent in plot, emotion, and moral.",
    ];
  }

  return [
    "Write the story in warm, polished English.",
    "Use clear, child-friendly language with emotional storytelling.",
    "Avoid robotic or generic phrasing.",
  ];
}
