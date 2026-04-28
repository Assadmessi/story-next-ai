export type AgeBand = "3-5" | "6-8" | "9-12";
export type StoryLanguage = "english" | "burmese" | "bilingual";

export interface ChildProfile {
  id: string;
  name: string;
  ageBand: AgeBand;
  language: StoryLanguage;
  favoriteTheme?: string;
  bedtimeMode?: boolean;
  createdAt: string;
}
