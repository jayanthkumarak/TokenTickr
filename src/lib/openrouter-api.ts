import { OpenRouterResponse, OpenRouterModel } from '@/types/models';

const OPENROUTER_API_BASE = 'https://openrouter.ai/api/v1';
const DEFAULT_TIMEOUT_MS = 15000; // 15 seconds

export class ApiError extends Error {
  constructor(message: string, public status?: number, public code?: string) {
    super(message);
    this.name = 'ApiError';
  }
}

export class OpenRouterAPI {
  private static instance: OpenRouterAPI;
  private baseURL: string;
  private apiKey?: string;

  private constructor() {
    this.baseURL = OPENROUTER_API_BASE;
    this.apiKey = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY;
  }

  public static getInstance(): OpenRouterAPI {
    if (!OpenRouterAPI.instance) {
      OpenRouterAPI.instance = new OpenRouterAPI();
    }
    return OpenRouterAPI.instance;
  }

  private async makeRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS);

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...((options.headers as Record<string, string>) || {}),
    };

    if (this.apiKey) {
      headers['Authorization'] = `Bearer ${this.apiKey}`;
    }

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'GET',
        headers,
        signal: controller.signal,
        ...options,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        let errorMessage = `API Error: ${response.status} - ${response.statusText}`;
        try {
          const errorBody = await response.json();
          if (errorBody.error && errorBody.error.message) {
            errorMessage = errorBody.error.message;
          }
        } catch {
          // Ignore json parse error for error body
        }
        throw new ApiError(errorMessage, response.status);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      clearTimeout(timeoutId);
      if (error instanceof ApiError) {
        throw error;
      }
      if (error instanceof Error && error.name === 'AbortError') {
        throw new ApiError('Request timed out', 408, 'TIMEOUT');
      }
      throw new ApiError(error instanceof Error ? error.message : 'Unknown network error');
    }
  }

  private validateModels(data: unknown): OpenRouterModel[] {
    if (
      !data ||
      typeof data !== 'object' ||
      !('data' in data) ||
      !Array.isArray((data as { data: unknown }).data)
    ) {
      throw new ApiError('Invalid API response format: expected data array', 500, 'INVALID_FORMAT');
    }

    // safe filter for valid minimal structure
    return (data as { data: unknown[] }).data.filter((model: unknown): model is OpenRouterModel => {
      const m = model as Partial<OpenRouterModel>;
      return (
        !!m &&
        typeof m.id === 'string' &&
        typeof m.name === 'string' &&
        !!m.pricing // ensure pricing object exists
      );
    });
  }

  public async getModels(): Promise<OpenRouterModel[]> {
    try {
      const response = await this.makeRequest<OpenRouterResponse>('/models');
      return this.validateModels(response);
    } catch (error) {
      console.error('Error fetching models:', error);
      throw error; // Re-throw to let store handle it, but now it's a typed error
    }
  }

  public async getModelById(modelId: string): Promise<OpenRouterModel | null> {
    try {
      const models = await this.getModels();
      return models.find(model => model.id === modelId) || null;
    } catch (error) {
      console.error(`Error fetching model ${modelId}:`, error);
      throw error;
    }
  }

  public async searchModels(query: string): Promise<OpenRouterModel[]> {
    try {
      const models = await this.getModels();
      if (!query.trim()) return models;

      const searchTerm = query.toLowerCase();

      return models.filter(model =>
        model.name.toLowerCase().includes(searchTerm) ||
        model.id.toLowerCase().includes(searchTerm) ||
        (model.description && model.description.toLowerCase().includes(searchTerm))
      );
    } catch (error) {
      console.error('Error searching models:', error);
      throw error;
    }
  }

  public static formatPrice(price: string): string {
    const priceNum = parseFloat(price);
    if (isNaN(priceNum) || priceNum === 0) return 'Free';

    // Convert to price per million tokens
    const pricePerMillion = priceNum * 1000000;

    if (pricePerMillion < 1) {
      return `$${pricePerMillion.toFixed(3)}/M`;
    } else {
      return `$${pricePerMillion.toFixed(2)}/M`;
    }
  }

  public static formatContextLength(contextLength: number): string {
    if (!contextLength || isNaN(contextLength)) return 'Unknown';

    if (contextLength >= 1000000) {
      return `${(contextLength / 1000000).toFixed(1)}M`;
    } else if (contextLength >= 1000) {
      return `${(contextLength / 1000).toFixed(0)}K`;
    } else {
      return contextLength.toString();
    }
  }
}

export const openrouterAPI = OpenRouterAPI.getInstance();
