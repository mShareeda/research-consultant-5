
import { GoogleGenAI, Type } from "@google/genai";
import { AcademicLevel, Theory, Report, ComparisonResult, Language, ResearchType } from "../types";

const apiKey = process.env.API_KEY;
const ai = new GoogleGenAI({ apiKey: apiKey || "" });
const SUGGESTION_MODEL = "gemini-3-flash-preview";
const REPORT_MODEL = "gemini-3-pro-preview";

/**
 * Robustly extracts the JSON part from a string.
 */
const extractJson = (text: string): string => {
  if (!text) return "";
  try {
    const firstBrace = text.indexOf('{');
    const firstBracket = text.indexOf('[');
    let startPos = -1;

    if (firstBrace !== -1 && (firstBracket === -1 || firstBrace < firstBracket)) {
      startPos = firstBrace;
    } else if (firstBracket !== -1) {
      startPos = firstBracket;
    }

    if (startPos === -1) return text;

    const lastBrace = text.lastIndexOf('}');
    const lastBracket = text.lastIndexOf(']');
    const endPos = Math.max(lastBrace, lastBracket);

    if (endPos === -1 || endPos <= startPos) return text;

    return text.substring(startPos, endPos + 1).trim();
  } catch (e) {
    return text;
  }
};

const handleError = (error: any, context: string, lang: Language): never => {
  console.error(`Error in ${context}:`, error);
  const msg = (error?.message || "").toString();
  const messages = {
    ar: {
        apiKey: "مفتاح الربط (API Key) مفقود أو غير صحيح. يرجى التحقق من الإعدادات.",
        quota: "عذراً، تم تجاوز حد الاستخدام المسموح به حالياً. يرجى الانتظار قليلاً ثم المحاولة.",
        server: "الخادم مشغول حالياً بسبب ضغط الطلبات. يرجى المحاولة بعد دقيقة.",
        safety: "تم حظر إنشاء المحتوى بسبب معايير السلامة. يرجى محاولة تعديل صياغة العنوان البحثي ليكون أكثر أكاديمية.",
        json: "حدث خطأ في معالجة البيانات الواردة من النظام الذكي. يرجى المحاولة مرة أخرى.",
        network: "فشل الاتصال بالإنترنت. يرجى التحقق من الشبكة.",
        generic: "حدث خطأ غير متوقع أثناء المعالجة. يرجى المحاولة لاحقاً."
    },
    en: {
        apiKey: "API Key is missing or invalid. Please check settings.",
        quota: "Usage limit exceeded. Please wait a moment and try again.",
        server: "Server is overloaded. Please try again in a minute.",
        safety: "Content generation blocked by safety filters. Please refine your research title to be more academic.",
        json: "Error processing data from the AI system. Please try again.",
        network: "Network connection failed. Please check your internet.",
        generic: "An unexpected error occurred. Please try again later."
    }
  };
  const t = messages[lang];
  if (msg.includes("API key") || !apiKey) throw new Error(t.apiKey);
  if (msg.includes("429") || msg.includes("quota")) throw new Error(t.quota);
  if (msg.includes("503") || msg.includes("overloaded")) throw new Error(t.server);
  if (msg.includes("SAFETY") || msg.includes("blocked")) throw new Error(t.safety);
  throw new Error(t.generic);
};

export const getTheorySuggestions = async (
  title: string,
  level: AcademicLevel,
  type: ResearchType,
  foundation: string,
  lang: Language,
  existingTheories: string[] = []
): Promise<Theory[]> => {
  try {
    const langInstruction = lang === 'ar' ? "اللغة: عربية فصحى أكاديمية رصينة." : "Language: Advanced Academic English.";
    const exclusion = existingTheories.length > 0 ? `Exclude these existing theories: ${existingTheories.join(", ")}` : "";
    
    const prompt = `
      Role: Senior Academic Research Consultant and Theory Expert.
      Task: Suggest 3 scientific theories for title: "${title}" (Academic Level: ${level}, Research Type: ${type}, Research Field: ${foundation}).
      Constraints: ${langInstruction}. ${exclusion}.
      
      METHODOLOGY FOCUS:
      - If Quantitative: Suggest theories that provide clear measurable variables and cause-effect relationships.
      - If Qualitative: Suggest theories that provide deep interpretive lenses, social constructs, or conceptual frameworks for understanding phenomena.

      CRITICAL INSTRUCTIONS FOR DEPTH:
      - name: Formal academic name.
      - match_reason: Provide an EXTENSIVE AND DETAILED justification showing how it fits the ${type} methodology.
      - background: Provide a COMPREHENSIVE scholarly background.
      - principles: Array of 3-4 fundamental philosophical or functional principles.
      - key_concepts: Array of 5-6 major terminologies.
      
      Format: JSON ONLY.
    `;

    const response = await ai.models.generateContent({
      model: SUGGESTION_MODEL,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              match_reason: { type: Type.STRING },
              background: { type: Type.STRING },
              principles: { type: Type.ARRAY, items: { type: Type.STRING } },
              key_concepts: { type: Type.ARRAY, items: { type: Type.STRING } },
            },
            required: ["name", "match_reason", "background", "principles", "key_concepts"],
          },
        },
      },
    });
    return JSON.parse(extractJson(response.text || "[]")) as Theory[];
  } catch (error) {
    return handleError(error, "getTheorySuggestions", lang);
  }
};

export const getTheoriesHypotheses = async (
    theories: Theory[],
    lang: Language,
    type: ResearchType
): Promise<Record<string, string[]>> => {
    try {
        const theoryNames = theories.map(t => t.name);
        const langInstruction = lang === 'ar' ? "باللغة العربية الفصحى" : "in English";
        const prompt = `
            Task: Provide 5-7 core scientific axioms/hypotheses for EACH of these theories: ${theoryNames.join(", ")}.
            Constraint: The study type is ${type}. 
            - For Quantitative: Hypotheses should be testable, directional, and variable-focused.
            - For Qualitative: Focus on foundational axioms, theoretical propositions, or interpretive core elements.
            Return a JSON object where each key is a theory name exactly as provided and the value is an array of strings.
            Language: ${langInstruction}.
        `;

        const response = await ai.models.generateContent({
            model: SUGGESTION_MODEL,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                  type: Type.OBJECT,
                  properties: theoryNames.reduce((acc: any, name) => {
                    acc[name] = { type: Type.ARRAY, items: { type: Type.STRING } };
                    return acc;
                  }, {}),
                  required: theoryNames
                }
            },
        });
        return JSON.parse(extractJson(response.text || "{}"));
    } catch (error) {
        return handleError(error, "getTheoriesHypotheses", lang);
    }
};

export const compareTheories = async (
    title: string,
    theories: Theory[],
    lang: Language
): Promise<ComparisonResult> => {
    try {
        const theoryNames = theories.map(t => t.name).join(", ");
        const prompt = `
            Compare these theories: ${theoryNames} relative to study: "${title}".
            Language: ${lang === 'ar' ? 'Arabic' : 'English'}.
            Provide common ground, differences, pros/cons, and recommendation.
        `;
        const response = await ai.models.generateContent({
            model: SUGGESTION_MODEL,
            contents: prompt,
            config: { 
              responseMimeType: "application/json",
              responseSchema: {
                type: Type.OBJECT,
                properties: {
                  common_ground: { type: Type.STRING },
                  key_differences: { type: Type.STRING },
                  analysis: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        theory_name: { type: Type.STRING },
                        pros: { type: Type.STRING },
                        cons: { type: Type.STRING }
                      },
                      required: ["theory_name", "pros", "cons"]
                    }
                  },
                  recommendation: { type: Type.STRING }
                },
                required: ["common_ground", "key_differences", "analysis", "recommendation"]
              }
            },
        });
        return JSON.parse(extractJson(response.text || "{}"));
    } catch (error) {
        return handleError(error, "compareTheories", lang);
    }
}

export const getFinalReport = async (
  title: string,
  level: AcademicLevel,
  type: ResearchType,
  theories: Theory[],
  userSelectedHypotheses: string[],
  lang: Language
): Promise<Report> => {
  try {
    const theoryNames = theories.map(t => t.name).join(", ");
    const hypothesesList = userSelectedHypotheses.join(" | ");
    
    const prompt = `
      Create a high-level research framework for title "${title}". Study Type: ${type}. Theories: "${theoryNames}". 
      Level: "${level}". Selected core axioms from the theories: "${hypothesesList}".

      REQUIREMENTS:
      1. Provide a detailed theory integration justification specialized for ${type} methodology.
      2. Identify the Independent Variable (IV) and Dependent Variable (DV) clearly. In ${type === ResearchType.Qualitative ? 'qualitative' : 'quantitative'} terms.
      3. Generate specific 'study_hypotheses' that reflect the chosen core axioms and the research title.
      4. For each study hypothesis, fill 'derived_from' with specific axioms.
      
      ADDITIONAL TASK: Generate a Mermaid.js diagram (graph TD).
      CRITICAL MERMAID SYNTAX RULES:
      - Use ONLY simple alphanumeric IDs for nodes (e.g., IV, DV, T1, T2).
      - Wrap ALL node labels in double quotes (e.g., IV["Independent Variable Text"]).
      - Use TOP-DOWN layout.
      - Ensure the path is: IV -> Theories/Axioms -> DV.
      
      Language: ${lang === 'ar' ? 'Arabic' : 'English'}.
      Format: JSON ONLY.
    `;

    const response = await ai.models.generateContent({
      model: REPORT_MODEL,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            theory_integration: { type: Type.STRING },
            independent_variable: { type: Type.STRING },
            dependent_variable: { type: Type.STRING },
            theory_hypotheses: { type: Type.ARRAY, items: { type: Type.STRING } },
            study_hypotheses: { 
              type: Type.ARRAY, 
              items: { 
                type: Type.OBJECT,
                properties: {
                  text: { type: Type.STRING },
                  derived_from: { type: Type.ARRAY, items: { type: Type.STRING } }
                },
                required: ["text", "derived_from"]
              } 
            },
            mermaid_diagram: { type: Type.STRING, description: "Valid Mermaid graph TD code" }
          },
          required: ["theory_integration", "independent_variable", "dependent_variable", "theory_hypotheses", "study_hypotheses", "mermaid_diagram"],
        },
      },
    });
    return JSON.parse(extractJson(response.text || "{}")) as Report;
  } catch (error) {
    return handleError(error, "getFinalReport", lang);
  }
};
