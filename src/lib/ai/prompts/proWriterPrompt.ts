import type { ProStoryRequest } from "../../../types/ai";
import { getLanguageInstruction } from "../languageRules";
import { getSafetyRulesForAge } from "../safetyRules";

function list(items: string[]) {
  return items.map((item) => `- ${item}`).join(" ");
}

export function buildProWriterSystemPrompt() {
  return `You are a pro children's cartoon, anime, and comic story writer with 20+ years of experience.

Your writing style:
- emotionally warm
- child-safe
- visually rich
- smooth and non-repetitive
- character-consistent
- suitable for parents and children
- cinematic but simple enough for the selected age

You must think like a professional writers' room:
- plan before drafting
- keep character personality consistent
- avoid repeated scenes or repeated lines
- make the moral natural, not forced
- write with clear beginning, middle, and ending
- create image-ready scenes for future storyboard generation.`;
}

export function buildBlueprintPrompt(request: ProStoryRequest) {
  const languageRules = getLanguageInstruction(request.language);
  const safetyRules = getSafetyRulesForAge(request.ageBand);

  return `Create a professional story blueprint.

Story request:
- Age band: ${request.ageBand}
- Language: ${request.language}
- Length: ${request.length}
- Visual style: ${request.style}
- Lesson: ${request.lesson}
- Main character name: ${request.mainCharacterName}
- Character type: ${request.characterType}
- Setting: ${request.setting}
- Mood: ${request.mood}
- Child name: ${request.childName ?? "not provided"}
- Favorite theme: ${request.favoriteTheme ?? "not provided"}

Language rules:
${list(languageRules)}

Child safety rules:
${list(safetyRules)}

Return a blueprint with:
- 3 title options
- selected title
- logline
- theme
- moral
- emotional arc
- character memory
- safety notes`;
}

export function buildScenePlanPrompt(request: ProStoryRequest) {
  return `Create a scene-by-scene plan for a ${request.length} child-safe story.

Rules:
- Every scene must have a purpose.
- Do not repeat scene actions.
- Each scene must move the emotional arc forward.
- Each scene must include visual description for future image/storyboard generation.
- Keep the main character consistent.

Scene count:
- short story: 4 to 5 scenes
- long story: 6 to 8 scenes`;
}

export function buildDraftPrompt(request: ProStoryRequest) {
  return `Write the full story from the approved blueprint and scene plan.

Requirements:
- Write in ${request.language} mode.
- Use ${request.mood} tone.
- Make it suitable for age ${request.ageBand}.
- The story must be ${request.length} length.
- Keep ${request.mainCharacterName} consistent.
- Avoid repeated dialogue and repeated scene structure.
- Include gentle but meaningful emotional growth.
- End with a warm resolution.`;
}

export function buildPolishPrompt() {
  return `Polish the story like a senior children's book editor.

Improve:
- flow
- emotional rhythm
- dialogue
- clarity
- transitions
- ending warmth

Remove:
- repeated lines
- repeated scene beats
- generic phrasing
- awkward moralizing
- anything unsafe for children`;
}
