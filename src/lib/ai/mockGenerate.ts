import type { GeneratedStory, StorySetupInput } from "../../types/story";
import { createId } from "../utils/ids";

interface MockStoryInput extends StorySetupInput {
  ageBand: "3-5" | "6-8" | "9-12";
}

function styleLabel(style: StorySetupInput["style"]) {
  const labels = {
    soft_cartoon: "soft cartoon storybook",
    bright_anime: "bright anime adventure",
    comic_panel: "comic panel",
  } as const;

  return labels[style];
}

function lengthNote(length: StorySetupInput["length"]) {
  return length === "short"
    ? "a short, gentle story with a clear emotional turn"
    : "a longer story with more scenes, richer emotions, and a fuller ending";
}

export async function mockGenerateStory(
  input: MockStoryInput,
): Promise<GeneratedStory> {
  await new Promise((resolve) => setTimeout(resolve, 1800));

  const character = input.mainCharacterName.trim() || "Milo";
  const setting = input.setting.toLowerCase();
  const lesson = input.lesson.toLowerCase();
  const characterType = input.characterType.toLowerCase();
  const mood = input.mood.toLowerCase();

  const title = `${character} and the Little Light of ${input.setting}`;

  const story =
    input.length === "short"
      ? `${character} was a ${characterType} who loved exploring the ${setting}. One quiet morning, ${character} found a tiny golden light hiding under a leaf.

“Are you lost?” ${character} asked gently.

The light blinked once, then twice, as if it was too shy to speak. ${character} wanted to run ahead and find something exciting, but the little light trembled whenever the wind blew.

So ${character} slowed down. Step by step, they walked together through the ${setting}. Along the way, ${character} shared a warm smile, a careful hand, and a brave little promise: “I will not leave you behind.”

By sunset, the light grew brighter. It floated into the sky and became the first star of the evening. ${character} looked up and understood something important: kindness may feel small, but it can help someone shine again.`
      : `${character} was a ${characterType} who lived near the ${setting}. Everyone knew ${character} for being curious, but sometimes curiosity made ${character} rush ahead without noticing how others felt.

One morning, while the air felt ${mood}, ${character} discovered a tiny golden light caught between two silver leaves. The light flickered weakly.

“Hello?” ${character} whispered. “Do you need help?”

The little light trembled. It could not speak, but it leaned toward ${character} like it had been waiting for a friend.

At first, ${character} wanted to carry it quickly to the tallest hill. That seemed like the fastest solution. But every time ${character} hurried, the light faded. Every time ${character} slowed down, the light glowed.

So ${character} listened with the heart instead of only the ears. Through the winding path, past the sleepy flowers, and beside the soft blue stream, ${character} moved carefully. When a branch blocked the way, ${character} did not complain. When the wind grew strong, ${character} stood in front of the little light.

“I thought being brave meant going fast,” ${character} said. “Maybe today it means staying gentle.”

By evening, they reached a quiet hill above the ${setting}. The tiny light rose from ${character}’s hands. It shimmered, spun, and became a bright star.

The whole sky softened. The flowers opened. The stream sparkled. Even the wind became calm.

${character} smiled, not because everyone cheered, but because the little light was safe. That day, ${character} learned that ${lesson} is not always loud or grand. Sometimes it is a small choice repeated again and again, until someone else can shine.`;

  return {
    id: createId("story"),
    setup: input,
    blueprint: {
      titles: [
        title,
        `The Secret Star in ${input.setting}`,
        `${character}'s Gentle Adventure`,
      ],
      summary: `${character}, a ${input.characterType}, learns ${input.lesson} during ${lengthNote(
        input.length,
      )} in a ${styleLabel(input.style)} world.`,
      emotionalArc: `Curiosity → concern → patience → kindness → quiet pride`,
      moral: `${input.lesson} can help others feel safe, seen, and brave.`,
    },
    title,
    story,
    scenes: [
      `${character} enters the ${input.setting}.`,
      `${character} discovers a tiny golden light that needs help.`,
      `${character} learns to slow down and care patiently.`,
      `The little light becomes brighter because of ${character}'s kindness.`,
      `${character} understands the real meaning of ${input.lesson}.`,
    ],
    moral: `${input.lesson} can help others feel safe, seen, and brave.`,
    createdAt: new Date().toISOString(),
  };
}
