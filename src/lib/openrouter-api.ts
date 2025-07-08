import { OpenRouterResponse, OpenRouterModel } from '@/types/models';

const OPENROUTER_API_BASE = 'https://openrouter.ai/api/v1';

export class OpenRouterAPI {
  private static instance: OpenRouterAPI;
  private baseURL: string;
  private apiKey?: string;

  private constructor() {
    this.baseURL = OPENROUTER_API_BASE;
    // API key is optional for getting model list
    this.apiKey = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY;
  }

  public static getInstance(): OpenRouterAPI {
    if (!OpenRouterAPI.instance) {
      OpenRouterAPI.instance = new OpenRouterAPI();
    }
    return OpenRouterAPI.instance;
  }

  private async makeRequest<T>(endpoint: string): Promise<T> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (this.apiKey) {
      headers['Authorization'] = `Bearer ${this.apiKey}`;
    }

    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} - ${response.statusText}`);
    }

    return response.json();
  }

  public async getModels(): Promise<OpenRouterModel[]> {
    try {
      const response = await this.makeRequest<OpenRouterResponse>('/models');
      return response.data;
    } catch (error) {
      console.error('Error fetching models:', error);
      throw new Error('Failed to fetch models from OpenRouter API');
    }
  }

  public async getModelById(modelId: string): Promise<OpenRouterModel | null> {
    try {
      const models = await this.getModels();
      return models.find(model => model.id === modelId) || null;
    } catch (error) {
      console.error('Error fetching model by ID:', error);
      throw new Error(`Failed to fetch model ${modelId}`);
    }
  }

  public async searchModels(query: string): Promise<OpenRouterModel[]> {
    try {
      const models = await this.getModels();
      const searchTerm = query.toLowerCase();
      
      return models.filter(model => 
        model.name.toLowerCase().includes(searchTerm) ||
        model.id.toLowerCase().includes(searchTerm) ||
        (model.description && model.description.toLowerCase().includes(searchTerm))
      );
    } catch (error) {
      console.error('Error searching models:', error);
      throw new Error('Failed to search models');
    }
  }

  public static formatPrice(price: string): string {
    const priceNum = parseFloat(price);
    if (priceNum === 0) return 'Free';
    
    // Convert to price per million tokens
    const pricePerMillion = priceNum * 1000000;
    
    if (pricePerMillion < 1) {
      return `$${pricePerMillion.toFixed(3)}/M`;
    } else {
      return `$${pricePerMillion.toFixed(2)}/M`;
    }
  }

  public static formatContextLength(contextLength: number): string {
    if (contextLength >= 1000000) {
      return `${(contextLength / 1000000).toFixed(1)}M`;
    } else if (contextLength >= 1000) {
      return `${(contextLength / 1000).toFixed(0)}K`;
    } else {
      return contextLength.toString();
    }
  }
}

export const openRouterAPI = OpenRouterAPI.getInstance(); 