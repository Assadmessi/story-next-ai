import type { AgeBand } from "../../types/child";

export const universalChildSafetyRules = [
  "No graphic violence, gore, or disturbing injury.",
  "No adult sexual themes or romantic adult content.",
  "No hate, bullying encouragement, or cruel humiliation.",
  "No dangerous instructions children could copy.",
  "No hopeless ending; every story must resolve warmly or safely.",
  "Conflict must be emotional, social, magical, or adventurous without being traumatic.",
  "Fear can exist only at a child-safe level and must be comforted quickly.",
  "The moral must feel natural, not preachy or forced.",
];

export const ageSafetyProfiles: Record<AgeBand, string[]> = {
  "3-5": [
    "Use very simple sentences and gentle emotions.",
    "Avoid scary villains; use small problems like losing, sharing, waiting, or helping.",
    "Keep conflict short and quickly comforted.",
    "Use repetition only if it feels like bedtime rhythm, not accidental duplication.",
  ],
  "6-8": [
    "Use playful adventure and clear emotional lessons.",
    "Allow mild tension, but keep the solution reassuring.",
    "Use lively dialogue and simple character growth.",
    "Avoid complex moral ambiguity.",
  ],
  "9-12": [
    "Allow deeper emotions, richer worldbuilding, and stronger character arcs.",
    "Conflict can be more layered but must stay child-safe.",
    "Dialogue can be more expressive and thoughtful.",
    "Still avoid dark, hopeless, or overly intense scenes.",
  ],
};

export function getSafetyRulesForAge(ageBand: AgeBand) {
  return [...universalChildSafetyRules, ...ageSafetyProfiles[ageBand]];
}
