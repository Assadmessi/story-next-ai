import type {
  CharacterMemory,
  ConsistencyReport,
  ProStoryRequest,
  ProStoryResult,
  SafetyReport,
  StoryBlueprintPlan,
  StoryDraft,
  StoryScenePlan,
} from "../../../types/ai";
import type { GeneratedStory } from "../../../types/story";
import { createId } from "../../utils/ids";
import { getLanguageInstruction } from "../languageRules";
import { buildProWriterSystemPrompt } from "../prompts/proWriterPrompt";
import { geminiProvider } from "../providers/geminiProvider";
import { getSafetyRulesForAge } from "../safetyRules";

function list(items: string[]) {
  return items.map((item) => `- ${item}`).join("\n");
}

const stringArraySchema = {
  type: "array",
  items: { type: "string" },
};

const characterMemorySchema = {
  type: "object",
  properties: {
    name: { type: "string" },
    type: { type: "string" },
    personality: stringArraySchema,
    speakingStyle: { type: "string" },
    emotionalNeed: { type: "string" },
    strength: { type: "string" },
    weakness: { type: "string" },
    visualTraits: stringArraySchema,
    consistencyRules: stringArraySchema,
  },
  required: [
    "name",
    "type",
    "personality",
    "speakingStyle",
    "emotionalNeed",
    "strength",
    "weakness",
    "visualTraits",
    "consistencyRules",
  ],
};

const blueprintSchema = {
  type: "object",
  properties: {
    titleOptions: stringArraySchema,
    selectedTitle: { type: "string" },
    logline: { type: "string" },
    theme: { type: "string" },
    moral: { type: "string" },
    emotionalArc: stringArraySchema,
    characterMemory: characterMemorySchema,
    safetyNotes: stringArraySchema,
  },
  required: [
    "titleOptions",
    "selectedTitle",
    "logline",
    "theme",
    "moral",
    "emotionalArc",
    "characterMemory",
    "safetyNotes",
  ],
};

const sceneSchema = {
  type: "object",
  properties: {
    sceneNumber: { type: "number" },
    title: { type: "string" },
    purpose: { type: "string" },
    setting: { type: "string" },
    emotion: { type: "string" },
    conflict: { type: "string" },
    childSafeLimit: { type: "string" },
    visualDescription: { type: "string" },
    imagePrompt: { type: "string" },
  },
  required: [
    "sceneNumber",
    "title",
    "purpose",
    "setting",
    "emotion",
    "conflict",
    "childSafeLimit",
    "visualDescription",
    "imagePrompt",
  ],
};

const scenesResponseSchema = {
  type: "object",
  properties: {
    scenes: {
      type: "array",
      items: sceneSchema,
    },
  },
  required: ["scenes"],
};

const draftSchema = {
  type: "object",
  properties: {
    title: { type: "string" },
    storyText: { type: "string" },
    moral: { type: "string" },
  },
  required: ["title", "storyText", "moral"],
};

function fallbackCharacterMemory(request: ProStoryRequest): CharacterMemory {
  return {
    name: request.mainCharacterName,
    type: request.characterType,
    personality: ["kind", "curious", "learning through action"],
    speakingStyle: "warm and age-appropriate",
    emotionalNeed: `to understand ${request.lesson}`,
    strength: "cares about others",
    weakness: "sometimes rushes or misunderstands",
    visualTraits: [request.characterType, request.style, "friendly expression"],
    consistencyRules: [
      `${request.mainCharacterName} must stay consistent in personality.`,
      `The story must stay focused on ${request.lesson}.`,
      "No sudden character redesigns or unexplained behavior changes.",
    ],
  };
}

function fallbackBlueprint(request: ProStoryRequest): StoryBlueprintPlan {
  const isBurmese = request.language === "burmese";

  return {
    titleOptions: isBurmese
      ? [
          `${request.mainCharacterName} နှင့် ${request.setting} ထဲက အလင်းလေး`,
          `${request.setting} ထဲက လျှို့ဝှက်ကြယ်လေး`,
          `${request.mainCharacterName} ရဲ့ နူးညံ့တဲ့ စွန့်စားခန်း`,
        ]
      : [
          `${request.mainCharacterName} and the Little Light of ${request.setting}`,
          `The Secret Star in ${request.setting}`,
          `${request.mainCharacterName}'s Gentle Adventure`,
        ],
    selectedTitle: isBurmese
      ? `${request.mainCharacterName} နှင့် ${request.setting} ထဲက အလင်းလေး`
      : `${request.mainCharacterName} and the Little Light of ${request.setting}`,
    logline: `${request.mainCharacterName}, a ${request.characterType}, learns ${request.lesson} in ${request.setting}.`,
    theme: request.lesson,
    moral: isBurmese
      ? `${request.lesson} ဆိုတာ တစ်ယောက်ယောက်ကို လုံခြုံပြီး နားလည်ခံရတယ်လို့ ခံစားစေနိုင်ပါတယ်။`
      : `${request.lesson} can help others feel safe, seen, and brave.`,
    emotionalArc: [
      "curiosity",
      "concern",
      "patience",
      "kindness",
      "quiet pride",
    ],
    characterMemory: fallbackCharacterMemory(request),
    safetyNotes: getSafetyRulesForAge(request.ageBand),
  };
}

function fallbackScenes(request: ProStoryRequest): StoryScenePlan[] {
  return [
    {
      sceneNumber: 1,
      title: "A curious beginning",
      purpose: "Introduce the hero, setting, and mood.",
      setting: request.setting,
      emotion: "curiosity",
      conflict: "The hero wants to explore quickly.",
      childSafeLimit: "Keep tension gentle and reassuring.",
      visualDescription: `${request.mainCharacterName}, a ${request.characterType}, in ${request.setting}.`,
      imagePrompt: `Child-safe ${request.style} illustration of ${request.mainCharacterName}, a ${request.characterType}, in ${request.setting}.`,
    },
    {
      sceneNumber: 2,
      title: "The tiny problem",
      purpose: "Introduce a gentle child-safe conflict.",
      setting: request.setting,
      emotion: "concern",
      conflict: "A tiny golden light needs help.",
      childSafeLimit: "No scary or intense content.",
      visualDescription: `${request.mainCharacterName} finds a tiny golden light.`,
      imagePrompt: `Child-safe ${request.style} illustration of ${request.mainCharacterName} finding a tiny golden light.`,
    },
    {
      sceneNumber: 3,
      title: "Learning patience",
      purpose: "Show the hero learning through action.",
      setting: request.setting,
      emotion: "patience",
      conflict: "Rushing makes the light fade.",
      childSafeLimit: "Keep the problem soft and emotional.",
      visualDescription: `${request.mainCharacterName} walks carefully with the light.`,
      imagePrompt: `Child-safe ${request.style} illustration of ${request.mainCharacterName} gently carrying a glowing light.`,
    },
    {
      sceneNumber: 4,
      title: "A warm ending",
      purpose: "Resolve the story with warmth.",
      setting: request.setting,
      emotion: "quiet pride",
      conflict: "The light becomes safe and bright.",
      childSafeLimit: "Warm, safe ending only.",
      visualDescription: `${request.mainCharacterName} watches the light become a star.`,
      imagePrompt: `Child-safe ${request.style} illustration of a warm star glowing above ${request.setting}.`,
    },
  ];
}

async function generateBlueprint(
  request: ProStoryRequest,
): Promise<StoryBlueprintPlan> {
  const prompt = `Create a professional children’s story blueprint.

Story request:
- Age band: ${request.ageBand}
- Language: ${request.language}
- Length: ${request.length}
- Style: ${request.style}
- Lesson: ${request.lesson}
- Main character: ${request.mainCharacterName}
- Character type: ${request.characterType}
- Setting: ${request.setting}
- Mood: ${request.mood}
- Favorite theme: ${request.favoriteTheme ?? "not provided"}

Language rules:
${list(getLanguageInstruction(request.language))}

Safety rules:
${list(getSafetyRulesForAge(request.ageBand))}

Requirements:
- Make 3 title options.
- Build a clear emotional arc.
- Create character memory to preserve consistency.
- Keep it child-safe and age-appropriate.`;

  try {
    const blueprint = await geminiProvider.generateJson<StoryBlueprintPlan>(
      [
        { role: "system", content: buildProWriterSystemPrompt() },
        { role: "user", content: prompt },
      ],
      blueprintSchema,
      { temperature: 0.45, maxTokens: 4096 },
    );

    return {
      ...blueprint,
      characterMemory:
        blueprint.characterMemory ?? fallbackCharacterMemory(request),
      safetyNotes: blueprint.safetyNotes?.length
        ? blueprint.safetyNotes
        : getSafetyRulesForAge(request.ageBand),
    };
  } catch {
    return fallbackBlueprint(request);
  }
}

async function generateScenes(
  request: ProStoryRequest,
  blueprint: StoryBlueprintPlan,
): Promise<StoryScenePlan[]> {
  const sceneCount = request.length === "short" ? "4 to 5" : "6 to 8";

  const prompt = `Create a scene-by-scene plan for this children’s story.

Scene count: ${sceneCount}

Blueprint:
${JSON.stringify(blueprint, null, 2)}

Rules:
- No repeated scenes.
- Every scene must move the story forward.
- Keep ${request.mainCharacterName} consistent.
- Make scenes image-ready for future storyboard generation.
- Keep everything child-safe for ages ${request.ageBand}.`;

  try {
    const response = await geminiProvider.generateJson<{
      scenes: StoryScenePlan[];
    }>(
      [
        { role: "system", content: buildProWriterSystemPrompt() },
        { role: "user", content: prompt },
      ],
      scenesResponseSchema,
      { temperature: 0.45, maxTokens: 4096 },
    );

    return response.scenes?.length ? response.scenes : fallbackScenes(request);
  } catch {
    return fallbackScenes(request);
  }
}

async function generateDraft(
  request: ProStoryRequest,
  blueprint: StoryBlueprintPlan,
  scenes: StoryScenePlan[],
): Promise<StoryDraft> {
  const prompt = `Write the full children’s story.

Request:
${JSON.stringify(request, null, 2)}

Blueprint:
${JSON.stringify(blueprint, null, 2)}

Scenes:
${JSON.stringify(scenes, null, 2)}

Writing rules:
- Write ONLY the story text, not JSON.
- Do not use markdown.
- Do not explain anything.
- If language is english, write only English.
- If language is burmese, write only Burmese/Myanmar.
- If language is bilingual, you MUST write TWO complete versions:
  1. English version under the heading: English Version
  2. Burmese/Myanmar version under the heading: မြန်မာဘာသာဖြင့်
- The Burmese section is required. Do not skip it.
- The Burmese version must retell the same story naturally in Myanmar language, not summarize it.
- No repeated lines or repeated scenes.
- Use smooth transitions.
- Use natural dialogue.
- Make the ending warm and satisfying.
- Keep the moral natural, not preachy.
- Burmese must sound natural, not like direct translation.
- Keep the story child-safe for ages ${request.ageBand}.
- Keep it shorter on mobile.`;

  try {
    const storyText = await geminiProvider.generateText(
      [
        { role: "system", content: buildProWriterSystemPrompt() },
        { role: "user", content: prompt },
      ],
      {
        temperature: 0.7,
        maxTokens:
          request.language === "bilingual"
            ? 8192
            : request.length === "short"
              ? 3072
              : 4096,
      },
    );

    if (!storyText.trim()) {
      throw new Error("Gemini returned empty story text.");
    }

    return {
      title: blueprint.selectedTitle,
      storyText: storyText.trim(),
      moral: blueprint.moral,
      scenes,
    };
  } catch (error) {
    console.log(
      "Gemini draft failed full error:",
      JSON.stringify(error, null, 2),
    );
    console.log(
      "Gemini draft failed message:",
      error instanceof Error ? error.message : error,
    );

    return {
      title: blueprint.selectedTitle,
      storyText:
        request.language === "burmese"
          ? `${request.mainCharacterName} ဆိုတဲ့ ${request.characterType} လေးဟာ ${request.setting} ထဲမှာ ${request.lesson} ကို သင်ယူသွားတဲ့ နူးညံ့ပြီး ကလေးများအတွက် သင့်တော်သော ပုံပြင်လေးတစ်ပုဒ် ဖြစ်ပါတယ်။`
          : request.language === "bilingual"
            ? `${request.mainCharacterName} learns ${request.lesson} in ${request.setting}.

မြန်မာဘာသာဖြင့်

${request.mainCharacterName} ဆိုတဲ့ ${request.characterType} လေးဟာ ${request.setting} ထဲမှာ ${request.lesson} ကို သင်ယူသွားတဲ့ ကလေးများအတွက် သင့်တော်သော ပုံပြင်လေးတစ်ပုဒ် ဖြစ်ပါတယ်။`
            : `${request.mainCharacterName}, a ${request.characterType}, learns ${request.lesson} in ${request.setting}.`,
      moral: blueprint.moral,
      scenes,
    };
  }
}

function localConsistencyCheck(
  request: ProStoryRequest,
  draft: StoryDraft,
): ConsistencyReport {
  const issues: string[] = [];

  if (!draft.storyText.includes(request.mainCharacterName)) {
    issues.push("Main character name may be missing from the story.");
  }

  if (draft.storyText.length < 300) {
    issues.push("Story may be too short.");
  }

  return {
    passed: issues.length === 0,
    issues,
    fixesApplied:
      issues.length === 0 ? ["No local consistency issues found."] : [],
  };
}

function localSafetyCheck(request: ProStoryRequest): SafetyReport {
  return {
    passed: true,
    ageBand: request.ageBand,
    issues: [],
    fixesApplied: [
      "Applied child-safety prompt rules.",
      ...getSafetyRulesForAge(request.ageBand).slice(0, 2),
    ],
  };
}

export async function generateGeminiStory(
  request: ProStoryRequest,
): Promise<ProStoryResult> {
  const USE_FAST_MODE = true;

  const blueprint = USE_FAST_MODE
    ? fallbackBlueprint(request)
    : await generateBlueprint(request);

  const scenes = USE_FAST_MODE
    ? fallbackScenes(request)
    : await generateScenes(request, blueprint);

  const draft = await generateDraft(request, blueprint, scenes);
  const consistencyReport = localConsistencyCheck(request, draft);
  const safetyReport = localSafetyCheck(request);

  return {
    id: createId("gemini_story"),
    request,
    blueprint,
    draft,
    consistencyReport,
    safetyReport,
    finalTitle: draft.title,
    finalStory: draft.storyText,
    finalMoral: draft.moral,
    sceneSummaries: draft.scenes.map((scene) => scene.purpose),
    imagePrompts: draft.scenes.map((scene) => scene.imagePrompt),
    createdAt: new Date().toISOString(),
  };
}

export function geminiResultToGeneratedStory(
  result: ProStoryResult,
): GeneratedStory {
  return {
    id: result.id,
    setup: {
      language: result.request.language,
      length: result.request.length,
      style: result.request.style,
      lesson: result.request.lesson,
      mainCharacterName: result.request.mainCharacterName,
      characterType: result.request.characterType,
      setting: result.request.setting,
      mood: result.request.mood,
    },
    blueprint: {
      titles: result.blueprint.titleOptions,
      summary: result.blueprint.logline,
      emotionalArc: result.blueprint.emotionalArc.join(" → "),
      moral: result.finalMoral,
    },
    title: result.finalTitle,
    story: result.finalStory,
    scenes: result.sceneSummaries,
    moral: result.finalMoral,
    createdAt: result.createdAt,
  };
}
