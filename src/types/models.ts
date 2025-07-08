export interface ModelPricing {
  prompt: string;
  completion: string;
  image?: string;
  request?: string;
  web_search?: string;
  internal_reasoning?: string;
  input_cache_reads?: string;
  input_cache_writes?: string;
}

export interface ModelArchitecture {
  input_modalities: string[];
  output_modalities: string[];
  tokenizer: string;
  instruct_type?: string;
}

export interface ModelTopProvider {
  is_moderated: boolean;
}

export interface ModelPerRequestLimits {
  [key: string]: string;
}

export interface OpenRouterModel {
  id: string;
  name: string;
  created: number;
  description?: string;
  architecture: ModelArchitecture;
  top_provider: ModelTopProvider;
  pricing: ModelPricing;
  canonical_slug?: string;
  context_length: number;
  hugging_face_id?: string;
  per_request_limits?: ModelPerRequestLimits;
  supported_parameters?: string[];
}

export interface OpenRouterResponse {
  data: OpenRouterModel[];
}

export interface ComparisonState {
  selectedModels: (OpenRouterModel | null)[];
  maxModels: number;
  searchTerm: string;
  filteredModels: OpenRouterModel[];
  isLoading: boolean;
  error: string | null;
}

export interface ModelComparisonFeature {
  label: string;
  value: string | number;
  category: 'pricing' | 'performance' | 'features' | 'technical';
  unit?: string;
  description?: string;
} 