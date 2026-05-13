import type { GeneratedStory, StorySetupInput } from "../../types/story";
import { createId } from "../utils/ids";

interface MockStoryInput extends StorySetupInput {
  ageBand: "3-5" | "6-8" | "9-12";
}

function getLanguageMode(language: string) {
  if (language === "burmese") return "burmese";
  if (language === "bilingual") return "bilingual";
  return "english";
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
  const languageMode = getLanguageMode(input.language);

  const title =
    languageMode === "burmese"
      ? `${character} နှင့် ${input.setting} ထဲက အလင်းလေး`
      : `${character} and the Little Light of ${input.setting}`;

  const englishStory =
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

  const burmeseStory =
    input.length === "short"
      ? `${character} ဆိုတဲ့ ကလေးလေးဟာ ${input.setting} ထဲမှာ လမ်းလျှောက်ပြီး စူးစမ်းရတာကို အရမ်းကြိုက်ပါတယ်။

တစ်နေ့မနက်ခင်းမှာ ${character} ဟာ သစ်ရွက်အောက်မှာ တောက်ပနေတဲ့ ရွှေရောင်အလင်းလေးတစ်ခုကို တွေ့လိုက်ပါတယ်။

“နင် လမ်းပျောက်နေတာလား?” လို့ ${character} က နူးနူးညံ့ညံ့ မေးလိုက်ပါတယ်။

အလင်းလေးက စကားမပြောနိုင်ပေမယ့် တုန်တုန်လေး တောက်ပနေပါတယ်။ ${character} က အစမှာ အမြန်ပြေးပြီး စွန့်စားချင်ပေမယ့် အလင်းလေးက လေအေးအေးလေးတိုက်တိုင်း ကြောက်နေသလို ဖြစ်နေပါတယ်။

ဒါကြောင့် ${character} က ခြေလှမ်းတွေကို ဖြည်းဖြည်းချင်း လှမ်းပါတယ်။ အလင်းလေးကို မထားခဲ့ဘဲ အတူတူ လမ်းလျှောက်ပေးပါတယ်။

ညနေစောင်းလာတဲ့အခါ အလင်းလေးက ပိုတောက်ပလာပြီး ကောင်းကင်ပေါ်ကို တက်သွားပါတယ်။ အဲဒီအလင်းလေးဟာ ညနေခင်းရဲ့ ပထမဆုံးကြယ်လေး ဖြစ်သွားပါတယ်။

${character} က အပေါ်ကို မော့ကြည့်ပြီး သိလိုက်ပါတယ်။ ကြင်နာမှုဆိုတာ သေးသေးလေးလို ထင်ရပေမယ့် တစ်ယောက်ယောက်ကို ပြန်လည်တောက်ပစေနိုင်ပါတယ်။`
      : `${character} ဆိုတဲ့ ကလေးလေးဟာ ${input.setting} အနီးမှာ နေထိုင်ပါတယ်။ ${character} ဟာ စူးစမ်းချင်စိတ်ကြီးပြီး အမြဲတမ်း အသစ်အသစ်တွေကို ရှာဖွေချင်တတ်ပါတယ်။ ဒါပေမယ့် တစ်ခါတစ်လေ အရမ်းမြန်မြန် လုပ်ချင်လို့ အခြားသူတွေ ဘယ်လိုခံစားနေရလဲဆိုတာ မမြင်မိတတ်ပါဘူး။

တစ်နေ့မနက်မှာ ${character} ဟာ ငွေရောင်သစ်ရွက်နှစ်ရွက်ကြားမှာ ပိတ်မိနေတဲ့ ရွှေရောင်အလင်းလေးတစ်ခုကို တွေ့လိုက်ပါတယ်။

“ဟယ်လို... အကူအညီလိုနေတာလား?” လို့ ${character} က တိုးတိုးလေး မေးလိုက်ပါတယ်။

အလင်းလေးက စကားမပြောနိုင်ပေမယ့် ${character} ဆီကို တဖြည်းဖြည်း ယိမ်းလာပါတယ်။ သူငယ်ချင်းတစ်ယောက်ကို စောင့်နေသလိုပါပဲ။

အစမှာ ${character} က အလင်းလေးကို အမြန်ဆုံး တောင်ကုန်းပေါ်ကို ယူသွားချင်ပါတယ်။ ဒါပေမယ့် ${character} မြန်မြန်လျှောက်တိုင်း အလင်းလေးက မှိန်သွားပါတယ်။ ${character} ဖြည်းဖြည်းလျှောက်တိုင်းတော့ အလင်းလေးက ပိုတောက်ပလာပါတယ်။

ဒါကြောင့် ${character} က နားနဲ့ပဲ မဟုတ်ဘဲ နှလုံးသားနဲ့ပါ နားထောင်ဖို့ သင်ယူလိုက်ပါတယ်။ လမ်းကွေ့ကွေ့တွေကို ဖြည်းဖြည်းလျှောက်ပြီး လေပြင်းလာတဲ့အခါ အလင်းလေးရှေ့မှာ ရပ်ကာ ကာကွယ်ပေးပါတယ်။

“သတ္တိရှိတယ်ဆိုတာ အမြန်ပြေးတာလို့ ထင်ခဲ့တာ။ ဒီနေ့တော့ နူးညံ့စွာ စောင့်ရှောက်တာလည်း သတ္တိပဲဆိုတာ သိသွားပြီ” လို့ ${character} က ပြောလိုက်ပါတယ်။

ညနေစောင်းတဲ့အခါ သူတို့ဟာ တောင်ကုန်းလေးတစ်ခုပေါ်ကို ရောက်သွားပါတယ်။ အလင်းလေးဟာ ${character} ရဲ့ လက်ထဲကနေ တက်လာပြီး ကောင်းကင်ပေါ်မှာ ကြယ်လေးတစ်ပွင့် ဖြစ်သွားပါတယ်။

အဲဒီနေ့မှာ ${character} သိလိုက်တာက ${input.lesson} ဆိုတာ အကြီးကြီး ပြောပြစရာမလိုပါဘူး။ တစ်ခါတစ်လေ သေးငယ်တဲ့ ကြင်နာမှုလေးတွေကို ထပ်ခါထပ်ခါ ပြုလုပ်ပေးခြင်းက တစ်ယောက်ယောက်ကို ပြန်လည်တောက်ပစေနိုင်ပါတယ်။`;

  const story =
    languageMode === "burmese"
      ? burmeseStory
      : languageMode === "bilingual"
        ? `${englishStory}

---

မြန်မာဘာသာဖြင့်

${burmeseStory}`
        : englishStory;

  const moral =
    languageMode === "burmese"
      ? `${input.lesson} ဆိုတာ တစ်ယောက်ယောက်ကို လုံခြုံမှု၊ နားလည်ခံရမှုနဲ့ သတ္တိရှိမှု ပေးနိုင်ပါတယ်။`
      : languageMode === "bilingual"
        ? `${input.lesson} can help others feel safe, seen, and brave.

${input.lesson} ဆိုတာ တစ်ယောက်ယောက်ကို လုံခြုံမှု၊ နားလည်ခံရမှုနဲ့ သတ္တိရှိမှု ပေးနိုင်ပါတယ်။`
        : `${input.lesson} can help others feel safe, seen, and brave.`;

  const scenes =
    languageMode === "burmese"
      ? [
          `${character} ဟာ ${input.setting} ထဲကို ဝင်ရောက်ပါတယ်။`,
          `${character} ဟာ အကူအညီလိုနေတဲ့ ရွှေရောင်အလင်းလေးကို တွေ့ပါတယ်။`,
          `${character} ဟာ ဖြည်းဖြည်းချင်း စောင့်ရှောက်တတ်ဖို့ သင်ယူပါတယ်။`,
          `${character} ရဲ့ ကြင်နာမှုကြောင့် အလင်းလေး ပိုတောက်ပလာပါတယ်။`,
          `${character} ဟာ ${input.lesson} ရဲ့ အဓိပ္ပါယ်ကို နားလည်သွားပါတယ်။`,
        ]
      : [
          `${character} enters the ${input.setting}.`,
          `${character} discovers a tiny golden light that needs help.`,
          `${character} learns to slow down and care patiently.`,
          `The little light becomes brighter because of ${character}'s kindness.`,
          `${character} understands the real meaning of ${input.lesson}.`,
        ];

  return {
    id: createId("story"),
    setup: input,
    blueprint: {
      titles:
        languageMode === "burmese"
          ? [
              title,
              `${input.setting} ထဲက လျှို့ဝှက်ကြယ်လေး`,
              `${character} ရဲ့ နူးညံ့တဲ့ စွန့်စားခန်း`,
            ]
          : [
              title,
              `The Secret Star in ${input.setting}`,
              `${character}'s Gentle Adventure`,
            ],
      summary:
        languageMode === "burmese"
          ? `${character} ဟာ ${input.characterType} တစ်ယောက်အနေနဲ့ ${input.setting} ထဲမှာ ${input.lesson} ကို သင်ယူသွားတဲ့ ကလေးများအတွက် သင့်တော်တဲ့ ပုံပြင်လေးဖြစ်ပါတယ်။`
          : `${character}, a ${input.characterType}, learns ${input.lesson} during ${lengthNote(
              input.length,
            )} in a ${styleLabel(input.style)} world.`,
      emotionalArc:
        languageMode === "burmese"
          ? "စူးစမ်းချင်စိတ် → စိုးရိမ်မှု → စိတ်ရှည်မှု → ကြင်နာမှု → ဂုဏ်ယူမှု"
          : "Curiosity → concern → patience → kindness → quiet pride",
      moral,
    },
    title,
    story,
    scenes,
    moral,
    createdAt: new Date().toISOString(),
  };
}
