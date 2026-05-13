import type {
    CharacterMemory,
    StoryBlueprintPlan,
    StoryDraft,
    StoryScenePlan,
    proStoryRequest,
    proStoryResult,
} from "../../../types/ai";
import type { GeneratedStory } from "../../../types/story";
import { createId } from "../../utils/ids";
import { getSafetyRulesForAge } from "../safetyRules";

function createCharacterMemory(request: proStoryRequest): CharacterMemory {
  return {
    name: request.mainCharacterName,
    type: request.characterType,
    personality: ["curious", "kind-hearted", "learning to slow down"],
    speakingStyle:
      request.ageBand === "3-5" ? "simple and gentle" : "warm and expressive",
    emotionalNeed: `to understand ${request.lesson} through action`,
    strength: "cares about others",
    weakness: "sometimes rushes before thinking",
    visualTraits: [request.characterType, request.style, "friendly expression"],
    consistencyRules: [
      `${request.mainCharacterName} must remain ${request.characterType}.`,
      `${request.mainCharacterName} must not suddenly change personality.`,
      `The lesson must stay focused on ${request.lesson}.`,
    ],
  };
}

function createBlueprint(request: proStoryRequest): StoryBlueprintPlan {
  const isBurmese = request.language === "burmese";

  return {
    titleOptions: isBurmese
      ? [
          `${request.mainCharacterName} နှင့် ${request.setting} ထဲက အလင်းလေး`,
          `${request.setting} ရဲ့ လျှို့ဝှက်ကြယ်လေး`,
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
    logline: `${request.mainCharacterName}, a ${request.characterType}, learns ${request.lesson} through a gentle adventure in ${request.setting}.`,
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
    characterMemory: createCharacterMemory(request),
    safetyNotes: getSafetyRulesForAge(request.ageBand),
  };
}

function createScenePlan(request: proStoryRequest): StoryScenePlan[] {
  const count = request.length === "short" ? 5 : 7;

  const baseScenes = [
    {
      title: "A curious beginning",
      purpose: "Introduce the hero, setting, and emotional mood.",
      emotion: "curiosity",
      conflict: "The hero wants to explore quickly.",
    },
    {
      title: "The tiny problem",
      purpose: "Introduce a gentle child-safe conflict.",
      emotion: "concern",
      conflict: "A tiny golden light needs help.",
    },
    {
      title: "Learning to slow down",
      purpose: "Show the hero learning through action.",
      emotion: "patience",
      conflict: "Rushing makes the light fade.",
    },
    {
      title: "The careful choice",
      purpose: "Show the lesson becoming real.",
      emotion: "kindness",
      conflict: "The hero protects the light through a small challenge.",
    },
    {
      title: "A warm ending",
      purpose: "Resolve the story with emotional warmth.",
      emotion: "quiet pride",
      conflict: "The light becomes safe and shines.",
    },
    {
      title: "A deeper test",
      purpose: "Add richer emotion for long stories.",
      emotion: "bravery",
      conflict: "The hero doubts whether they can help.",
    },
    {
      title: "The shared glow",
      purpose: "Give long stories a fuller final image.",
      emotion: "connection",
      conflict: "The setting changes because of the hero’s care.",
    },
  ];

  return baseScenes.slice(0, count).map((scene, index) => ({
    sceneNumber: index + 1,
    title: scene.title,
    purpose: scene.purpose,
    setting: request.setting,
    emotion: scene.emotion,
    conflict: scene.conflict,
    childSafeLimit: "Keep tension gentle, brief, and emotionally reassuring.",
    visualDescription: `${request.mainCharacterName}, a ${request.characterType}, in ${request.setting}, ${scene.emotion} mood, ${request.style} style.`,
    imagePrompt: `Child-safe ${request.style} illustration of ${request.mainCharacterName}, a ${request.characterType}, in ${request.setting}. Emotion: ${scene.emotion}. No scary or unsafe content.`,
  }));
}

function createDraft(
  request: proStoryRequest,
  blueprint: StoryBlueprintPlan,
  scenes: StoryScenePlan[],
): StoryDraft {
  const character = request.mainCharacterName;
  const setting = request.setting.toLowerCase();
  const characterType = request.characterType.toLowerCase();
  const isBurmese = request.language === "burmese";

  const storyText = isBurmese
    ? `${character} ဆိုတဲ့ ${request.characterType} လေးဟာ ${request.setting} ထဲမှာ စူးစမ်းလေ့လာရတာကို နှစ်သက်ပါတယ်။ တစ်နေ့မှာတော့ ${character} ဟာ အကူအညီလိုနေတဲ့ ရွှေရောင်အလင်းလေးတစ်ခုကို တွေ့လိုက်ပါတယ်။

အစမှာ ${character} က အမြန်ဆုံးကူညီချင်ပေမယ့် အလင်းလေးက မြန်မြန်လှုပ်ရှားတိုင်း မှိန်သွားပါတယ်။ ဒါကြောင့် ${character} ဟာ ဖြည်းဖြည်းချင်း နားထောင်ပြီး စိတ်ရှည်စွာ ကူညီဖို့ သင်ယူလိုက်ပါတယ်။

လမ်းတစ်လျှောက် ${character} ဟာ အလင်းလေးကို မထားခဲ့ဘဲ စောင့်ရှောက်ပေးပါတယ်။ နောက်ဆုံးမှာ အလင်းလေးဟာ ကောင်းကင်ပေါ်ကို တက်သွားပြီး ကြယ်လေးတစ်ပွင့် ဖြစ်သွားပါတယ်။

${character} သိလိုက်တာက ${request.lesson} ဆိုတာ သေးငယ်တဲ့ လုပ်ရပ်လေးတစ်ခုကနေ စတင်နိုင်ပြီး တစ်ယောက်ယောက်ကို ပြန်လည်တောက်ပစေနိုင်တာပါပဲ။`
    : `${character} was a ${characterType} who loved exploring the ${setting}. One quiet morning, ${character} found a tiny golden light hiding beneath a leaf.

“Are you lost?” ${character} asked gently.

The light blinked, but it did not speak. At first, ${character} wanted to rush ahead and fix everything quickly. But whenever ${character} hurried, the little light faded. Whenever ${character} slowed down, it glowed.

So ${character} learned to listen with the heart. Step by step, they moved through the ${setting}. When the wind grew strong, ${character} stood carefully in front of the light. When the path became tricky, ${character} chose patience instead of speed.

By sunset, the light rose from ${character}'s hands and became the first star of the evening.

${character} smiled softly. That day, ${character} learned that ${request.lesson} can begin with one small gentle choice, and that small choice can help someone shine again.`;

  return {
    title: blueprint.selectedTitle,
    storyText,
    scenes,
    moral: blueprint.moral,
  };
}

function checkConsistency(request: proStoryRequest, draft: StoryDraft) {
  const issues: string[] = [];

  if (!draft.storyText.includes(request.mainCharacterName)) {
    issues.push("Main character name is missing from story.");
  }

  if (!draft.moral.toLowerCase().includes(request.lesson.toLowerCase())) {
    issues.push("Moral does not clearly connect to requested lesson.");
  }

  return {
    passed: issues.length === 0,
    issues,
    fixesApplied:
      issues.length === 0
        ? ["No consistency fixes needed."]
        : ["Flagged issues for future AI polish pass."],
  };
}

function checkSafety(request: proStoryRequest) {
  return {
    passed: true,
    ageBand: request.ageBand,
    issues: [],
    fixesApplied: [
      "Applied universal child-safe story limits.",
      ...getSafetyRulesForAge(request.ageBand).slice(0, 2),
    ],
  };
}

export async function generateproStory(
  request: proStoryRequest,
): Promise<proStoryResult> {
  await new Promise((resolve) => setTimeout(resolve, 900));

  const blueprint = createBlueprint(request);
  const scenePlan = createScenePlan(request);
  const draft = createDraft(request, blueprint, scenePlan);
  const consistencyReport = checkConsistency(request, draft);
  const safetyReport = checkSafety(request);

  return {
    id: createId("pro_story"),
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

export function proResultToGeneratedStory(
  result: proStoryResult,
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
