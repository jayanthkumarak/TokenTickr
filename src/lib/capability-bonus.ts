/**
 * Capability Bonus Calculations
 * 
 * Detects model capabilities and returns bonuses to add to intelligence score.
 * These bonuses are applied before the geometric mean calculation.
 */

import { OpenRouterModel } from "@/types/models";

// Capability bonus values
const CAPABILITY_BONUSES = {
    THINKING: 20,      // o1, o3, DeepSeek R1 - reasoning models
    MULTIMODAL: 15,    // Image/audio/video input
    TOOL_CALLING: 5,   // Function calling support
} as const;

// Keywords that indicate thinking/reasoning models
const THINKING_KEYWORDS = ["o1", "o3", "r1", "thinking", "reasoning"];

/**
 * Detect if model is a "thinking" model with internal chain-of-thought.
 */
export function isThinkingModel(model: OpenRouterModel): boolean {
    // Primary: Check if internal_reasoning pricing exists
    if (model.pricing?.internal_reasoning) {
        return true;
    }

    // Fallback: Check model name/ID for thinking keywords
    const combined = `${model.id} ${model.name}`.toLowerCase();
    return THINKING_KEYWORDS.some(keyword => {
        // Use word boundary for accuracy (avoid matching "pro1" etc.)
        const regex = new RegExp(`\\b${keyword}\\b`, 'i');
        return regex.test(combined);
    });
}

/**
 * Detect if model supports multimodal input (image, audio, video).
 */
export function isMultimodalModel(model: OpenRouterModel): boolean {
    const inputModalities = model.architecture?.input_modalities || [];
    // Check for non-text input modalities
    return inputModalities.some(m =>
        m !== "text" && ["image", "audio", "video"].includes(m.toLowerCase())
    );
}

/**
 * Detect if model supports tool/function calling.
 */
export function supportsToolCalling(model: OpenRouterModel): boolean {
    const params = model.supported_parameters || [];
    return params.includes("tools") || params.includes("function_call");
}

/**
 * Detect if model supports structured outputs.
 */
export function supportsStructuredOutputs(model: OpenRouterModel): boolean {
    const params = model.supported_parameters || [];
    return params.includes("response_format") || params.includes("structured_outputs");
}

/**
 * Detect if model supports prompt caching.
 */
export function supportsPromptCaching(model: OpenRouterModel): boolean {
    return Boolean(model.pricing?.input_cache_reads);
}

/**
 * Ratio of completion to prompt price. Returns 0 when prompt is 0/NaN.
 */
export function getOutputPremiumRatio(model: OpenRouterModel): number {
    const prompt = Number(model.pricing?.prompt);
    const completion = Number(model.pricing?.completion);
    if (!prompt || Number.isNaN(prompt) || Number.isNaN(completion)) return 0;
    return completion / prompt;
}

export interface AgentCapabilitySummary {
    thinking: boolean;
    tools: boolean;
    structuredOutputs: boolean;
    promptCaching: boolean;
    multimodal: boolean;
    outputPremiumRatio: number;
}

/**
 * Summarize agent-relevant capabilities for a model.
 */
export function getAgentCapabilitySummary(model: OpenRouterModel): AgentCapabilitySummary {
    return {
        thinking: isThinkingModel(model),
        tools: supportsToolCalling(model),
        structuredOutputs: supportsStructuredOutputs(model),
        promptCaching: supportsPromptCaching(model),
        multimodal: isMultimodalModel(model),
        outputPremiumRatio: getOutputPremiumRatio(model),
    };
}

/**
 * Calculate total capability bonus for a model.
 * Returns a value to add to the base intelligence/performance score.
 */
export function calculateCapabilityBonus(model: OpenRouterModel): number {
    let bonus = 0;

    if (isThinkingModel(model)) {
        bonus += CAPABILITY_BONUSES.THINKING;
    }

    if (isMultimodalModel(model)) {
        bonus += CAPABILITY_BONUSES.MULTIMODAL;
    }

    if (supportsToolCalling(model)) {
        bonus += CAPABILITY_BONUSES.TOOL_CALLING;
    }

    return bonus;
}

/**
 * Get a list of detected capabilities for display.
 */
export function getCapabilityFlags(model: OpenRouterModel): string[] {
    const flags: string[] = [];

    if (isThinkingModel(model)) flags.push("Thinking");
    if (isMultimodalModel(model)) flags.push("Multimodal");
    if (supportsToolCalling(model)) flags.push("Tools");
    if (supportsStructuredOutputs(model)) flags.push("JSON Schema");
    if (supportsPromptCaching(model)) flags.push("Cache");

    return flags;
}
