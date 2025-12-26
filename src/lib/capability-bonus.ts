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

    return flags;
}
