import type { GeneratedStory, StorybookPage } from "../../types/story";
import { createId } from "../utils/ids";

function splitStoryIntoParagraphs(story: string, storyTitle?: string) {
  return story
    .split(/\n\s*\n/g)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .filter((paragraph) => {
      const cleanParagraph = paragraph.toLowerCase().trim();
      const cleanTitle = storyTitle?.toLowerCase().trim();

      if (cleanTitle && cleanParagraph === cleanTitle) return false;
      if (cleanParagraph === "english version") return false;
      if (cleanParagraph === "မြန်မာဘာသာဖြင့်") return false;

      return paragraph.length > 30;
    });
}

function splitSentences(text: string) {
  return text
    .replace(/\n+/g, " ")
    .split(/(?<=[.!?။])\s+/g)
    .map((sentence) => sentence.trim())
    .filter(Boolean);
}

function chunkBySentences(text: string, maxPages: number) {
  const sentences = splitSentences(text);

  if (sentences.length === 0) return [text];

  const targetSentencesPerPage = Math.max(
    2,
    Math.ceil(sentences.length / maxPages),
  );

  const pages: string[] = [];

  for (let i = 0; i < sentences.length; i += targetSentencesPerPage) {
    pages.push(sentences.slice(i, i + targetSentencesPerPage).join(" "));
  }

  return pages.slice(0, maxPages);
}

function getStyleLabel(style: GeneratedStory["setup"]["style"]) {
  const labels = {
    soft_cartoon: "soft children’s cartoon storybook illustration",
    bright_anime: "bright child-safe anime adventure illustration",
    comic_panel: "child-friendly comic panel illustration",
  } as const;

  return labels[style];
}

function getVisualMood(pageText: string) {
  const lower = pageText.toLowerCase();

  if (
    lower.includes("sad") ||
    lower.includes("lost") ||
    lower.includes("afraid") ||
    pageText.includes("ကြောက်") ||
    pageText.includes("ဝမ်းနည်း")
  ) {
    return "gentle concern, soft light, comforting mood";
  }

  if (
    lower.includes("smile") ||
    lower.includes("happy") ||
    lower.includes("shine") ||
    pageText.includes("ပြုံး") ||
    pageText.includes("တောက်ပ")
  ) {
    return "warm joy, glowing light, hopeful mood";
  }

  if (
    lower.includes("forest") ||
    lower.includes("moon") ||
    lower.includes("star") ||
    pageText.includes("တော") ||
    pageText.includes("လရောင်") ||
    pageText.includes("ကြယ်")
  ) {
    return "magical calm, moonlit atmosphere, dreamy mood";
  }

  return "warm, child-safe, emotional storybook mood";
}

function buildImagePrompt(
  story: GeneratedStory,
  pageText: string,
  pageNumber: number,
) {
  return `${getStyleLabel(story.setup.style)}. Page ${pageNumber} of a children’s storybook. Main character: ${story.setup.mainCharacterName}, ${story.setup.characterType}. Setting: ${story.setup.setting}. Scene text: ${pageText.slice(
    0,
    500,
  )}. Mood: ${getVisualMood(pageText)}. Keep character design consistent across all pages. Safe for children. No scary, violent, or adult content.`;
}

function extractBilingualParts(story: string) {
  const burmeseHeading = "မြန်မာဘာသာဖြင့်";
  const englishHeading = "English Version";

  if (!story.includes(burmeseHeading)) {
    return {
      english: story,
      burmese: "",
    };
  }

  const [englishRaw, burmeseRaw] = story.split(burmeseHeading);

  return {
    english: englishRaw.replace(englishHeading, "").trim(),
    burmese: burmeseRaw?.trim() ?? "",
  };
}

function buildNormalPages(story: GeneratedStory): StorybookPage[] {
  const maxPages = story.setup.length === "short" ? 5 : 10;
  const paragraphs = splitStoryIntoParagraphs(story.story, story.title);

  const textForChunking =
    paragraphs.length > maxPages ? paragraphs.join(" ") : story.story;

  const pageTexts =
    paragraphs.length > 1 && paragraphs.length <= maxPages
      ? paragraphs
      : chunkBySentences(textForChunking, maxPages);

  return pageTexts.map((text, index) => ({
    id: createId("page"),
    pageNumber: index + 1,
    text,
    imagePrompt: buildImagePrompt(story, text, index + 1),
    visualMood: getVisualMood(text),
    image: {
      pageId: createId("image"),
      status: "empty",
    },
  }));
}

function buildBilingualPages(story: GeneratedStory): StorybookPage[] {
  const { english, burmese } = extractBilingualParts(story.story);
  const maxPages = story.setup.length === "short" ? 5 : 10;

  const englishPages = chunkBySentences(english, maxPages);
  const burmesePages = burmese ? chunkBySentences(burmese, maxPages) : [];

  const pageCount = Math.max(englishPages.length, burmesePages.length);
  const pages: StorybookPage[] = [];

  for (let index = 0; index < pageCount; index += 1) {
    const englishText = englishPages[index] ?? "";
    const burmeseText = burmesePages[index] ?? "";

    const text = burmeseText
      ? `English Version\n\n${englishText}\n\nမြန်မာဘာသာဖြင့်\n\n${burmeseText}`
      : englishText;

    pages.push({
      id: createId("page"),
      pageNumber: index + 1,
      text,
      imagePrompt: buildImagePrompt(
        story,
        englishText || burmeseText,
        index + 1,
      ),
      visualMood: getVisualMood(`${englishText} ${burmeseText}`),
      image: {
        pageId: createId("image"),
        status: "empty",
      },
    });
  }

  return pages;
}

export function buildStorybookPages(story: GeneratedStory): StorybookPage[] {
  if (story.setup.language === "bilingual") {
    return buildBilingualPages(story);
  }

  return buildNormalPages(story);
}
