import { create } from 'zustand';
import { OpenRouterModel, ComparisonState } from '@/types/models';
import { openRouterAPI } from '@/lib/openrouter-api';

interface ComparisonStore extends ComparisonState {
  // Actions
  setSelectedModel: (index: number, model: OpenRouterModel | null) => void;
  addModel: (model: OpenRouterModel) => void;
  removeModel: (index: number) => void;
  setSearchTerm: (term: string) => void;
  setMaxModels: (count: number) => void;
  fetchModels: () => Promise<void>;
  searchModels: (query: string) => Promise<void>;
  clearAll: () => void;
  resetToDefaults: () => void;
}

const initialState: ComparisonState = {
  selectedModels: [null, null, null, null],
  maxModels: 3,
  searchTerm: '',
  filteredModels: [],
  isLoading: false,
  error: null,
};

export const useComparisonStore = create<ComparisonStore>((set) => ({
  ...initialState,

  setSelectedModel: (index: number, model: OpenRouterModel | null) => {
    set((state) => {
      const newSelectedModels = [...state.selectedModels];
      newSelectedModels[index] = model;
      return { selectedModels: newSelectedModels };
    });
  },

  addModel: (model: OpenRouterModel) => {
    set((state) => {
      const newSelectedModels = [...state.selectedModels];
      const emptyIndex = newSelectedModels.findIndex(m => m === null);
      
      if (emptyIndex !== -1 && emptyIndex < state.maxModels) {
        newSelectedModels[emptyIndex] = model;
      }
      
      return { selectedModels: newSelectedModels };
    });
  },

  removeModel: (index: number) => {
    set((state) => {
      const newSelectedModels = [...state.selectedModels];
      newSelectedModels[index] = null;
      return { selectedModels: newSelectedModels };
    });
  },

  setSearchTerm: (term: string) => {
    set({ searchTerm: term });
  },

  setMaxModels: (count: number) => {
    set((state) => {
      const newMaxModels = Math.min(Math.max(count, 2), 4);
      const newSelectedModels = [...state.selectedModels];
      
      // If reducing max models, clear models beyond the new limit
      if (newMaxModels < state.maxModels) {
        for (let i = newMaxModels; i < state.selectedModels.length; i++) {
          newSelectedModels[i] = null;
        }
      }
      
      return { 
        maxModels: newMaxModels,
        selectedModels: newSelectedModels
      };
    });
  },

  fetchModels: async () => {
    set({ isLoading: true, error: null });
    
    try {
      const models = await openRouterAPI.getModels();
      set({ 
        filteredModels: models,
        isLoading: false
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch models',
        isLoading: false
      });
    }
  },

  searchModels: async (query: string) => {
    set({ isLoading: true, error: null, searchTerm: query });
    
    try {
      if (query.trim() === '') {
        const models = await openRouterAPI.getModels();
        set({ 
          filteredModels: models,
          isLoading: false
        });
      } else {
        const models = await openRouterAPI.searchModels(query);
        set({ 
          filteredModels: models,
          isLoading: false
        });
      }
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to search models',
        isLoading: false
      });
    }
  },

  clearAll: () => {
    set({
      selectedModels: [null, null, null, null],
      searchTerm: '',
    });
  },

  resetToDefaults: () => {
    set({
      selectedModels: [null, null, null, null],
      maxModels: 3,
      searchTerm: '',
      error: null,
    });
  },
}));

// Selector hooks for better performance
export const useSelectedModels = () => useComparisonStore((state) => state.selectedModels);
export const useMaxModels = () => useComparisonStore((state) => state.maxModels);
export const useSearchTerm = () => useComparisonStore((state) => state.searchTerm);
export const useFilteredModels = () => useComparisonStore((state) => state.filteredModels);
export const useIsLoading = () => useComparisonStore((state) => state.isLoading);
export const useError = () => useComparisonStore((state) => state.error);

// Computed selectors
export const useActiveModels = () => useComparisonStore((state) => 
  state.selectedModels.filter(model => model !== null)
);

export const useAvailableSlots = () => useComparisonStore((state) => 
  state.selectedModels.slice(0, state.maxModels).filter(model => model === null).length
);

export const useCanAddModel = () => useComparisonStore((state) => 
  state.selectedModels.slice(0, state.maxModels).some(model => model === null)
); 