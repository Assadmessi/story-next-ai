export function extractJsonObject<T>(text: string): T {
  const cleaned = text
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

  try {
    return JSON.parse(cleaned) as T;
  } catch {
    const firstBrace = cleaned.indexOf("{");
    const lastBrace = cleaned.lastIndexOf("}");

    if (firstBrace === -1 || lastBrace === -1) {
      console.log("AI RAW RESPONSE:", cleaned);

      throw new Error("No JSON object found in AI response.");
    }

    const jsonText = cleaned.slice(firstBrace, lastBrace + 1);

    try {
      return JSON.parse(jsonText) as T;
    } catch (err) {
      console.log("BROKEN JSON:", jsonText);

      throw new Error("Gemini returned invalid JSON.");
    }
  }
}
