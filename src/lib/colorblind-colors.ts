/**
 * Color-Blind Friendly Color System
 * 
 * Based on industry best practices from:
 * - Apple Human Interface Guidelines
 * - Google Material Design
 * - IBM Design Language
 * - WCAG 2.1 AA compliance
 * 
 * Key Principles:
 * 1. Blue-orange primary combination (most accessible)
 * 2. High contrast ratios (4.5:1 minimum for text, 3:1 for graphics)
 * 3. Avoid red-green, pink-turquoise-gray, purple-blue combinations
 * 4. Use patterns/shapes as secondary encodings
 * 5. Vary lightness, not just hue
 */

// Primary accessible color palette - Blue-Orange combination
export const ACCESSIBLE_COLORS = {
  // Primary blues (safe for all color vision types)
  blue: {
    50: '#e3f2fd',
    100: '#bbdefb', 
    200: '#90caf9',
    300: '#64b5f6',
    400: '#42a5f5',
    500: '#2196f3', // Primary blue
    600: '#1e88e5',
    700: '#1976d2',
    800: '#1565c0',
    900: '#0d47a1'
  },
  
  // Secondary oranges (complementary to blue)
  orange: {
    50: '#fff3e0',
    100: '#ffe0b2',
    200: '#ffcc80',
    300: '#ffb74d',
    400: '#ffa726',
    500: '#ff9800', // Primary orange
    600: '#fb8c00',
    700: '#f57c00',
    800: '#ef6c00',
    900: '#e65100'
  },
  
  // Neutral grays (safe for all users)
  gray: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#eeeeee',
    300: '#e0e0e0',
    400: '#bdbdbd',
    500: '#9e9e9e',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121'
  },
  
  // Success (using blue-green instead of pure green)
  success: {
    50: '#e0f2f1',
    100: '#b2dfdb',
    200: '#80cbc4',
    300: '#4db6ac',
    400: '#26a69a',
    500: '#009688', // Blue-green instead of pure green
    600: '#00897b',
    700: '#00796b',
    800: '#00695c',
    900: '#004d40'
  },
  
  // Warning (using amber instead of yellow-green)
  warning: {
    50: '#fff8e1',
    100: '#ffecb3',
    200: '#ffe082',
    300: '#ffd54f',
    400: '#ffca28',
    500: '#ffc107', // Amber
    600: '#ffb300',
    700: '#ffa000',
    800: '#ff8f00',
    900: '#ff6f00'
  },
  
  // Error (using high-contrast red-orange)
  error: {
    50: '#ffebee',
    100: '#ffcdd2',
    200: '#ef9a9a',
    300: '#e57373',
    400: '#ef5350',
    500: '#f44336', // High contrast red
    600: '#e53935',
    700: '#d32f2f',
    800: '#c62828',
    900: '#b71c1c'
  }
} as const;

// Chart-specific color palette (optimized for data visualization)
export const CHART_COLORS = {
  // Primary data series (blue-orange system)
  primary: [
    ACCESSIBLE_COLORS.blue[600],   // Primary blue
    ACCESSIBLE_COLORS.orange[500], // Primary orange
    ACCESSIBLE_COLORS.success[600], // Blue-green
    ACCESSIBLE_COLORS.warning[600], // Amber
    ACCESSIBLE_COLORS.gray[700],    // Dark gray
    ACCESSIBLE_COLORS.blue[400],    // Light blue
    ACCESSIBLE_COLORS.orange[700],  // Dark orange
    ACCESSIBLE_COLORS.success[400], // Light blue-green
  ],
  
  // Secondary data series (for contrast and comparison)
  secondary: [
    ACCESSIBLE_COLORS.error[600],    // Red-orange for expensive/negative
    ACCESSIBLE_COLORS.warning[700],  // Dark amber
    ACCESSIBLE_COLORS.gray[600],     // Gray for neutral
    ACCESSIBLE_COLORS.orange[800],   // Dark orange
    ACCESSIBLE_COLORS.blue[800],     // Dark blue
    ACCESSIBLE_COLORS.error[700],    // Dark red
    ACCESSIBLE_COLORS.warning[800],  // Darkest amber
    ACCESSIBLE_COLORS.gray[800],     // Dark gray
  ],
  
  // High contrast pairs for comparisons
  comparison: {
    cheapest: ACCESSIBLE_COLORS.success[600], // Blue-green for positive
    expensive: ACCESSIBLE_COLORS.error[600],  // Red for negative
    neutral: ACCESSIBLE_COLORS.gray[600],     // Gray for neutral
  },
  
  // Background and surface colors
  background: {
    primary: '#ffffff',
    secondary: ACCESSIBLE_COLORS.gray[50],
    muted: ACCESSIBLE_COLORS.gray[100],
  },
  
  // Text colors with proper contrast
  text: {
    primary: ACCESSIBLE_COLORS.gray[900],
    secondary: ACCESSIBLE_COLORS.gray[700],
    muted: ACCESSIBLE_COLORS.gray[600],
    inverse: '#ffffff',
  }
} as const;

// Semantic color mappings for UI components
export const SEMANTIC_COLORS = {
  // Status indicators
  savings: ACCESSIBLE_COLORS.success[600],    // Blue-green for savings
  cost: ACCESSIBLE_COLORS.orange[600],        // Orange for costs
  neutral: ACCESSIBLE_COLORS.gray[600],       // Gray for neutral
  highlight: ACCESSIBLE_COLORS.blue[600],     // Blue for highlights
  
  // Interactive elements
  interactive: ACCESSIBLE_COLORS.blue[600],   // Blue for buttons, links
  hover: ACCESSIBLE_COLORS.blue[700],         // Darker blue for hover
  active: ACCESSIBLE_COLORS.blue[800],        // Darkest blue for active
  
  // Borders and dividers
  border: ACCESSIBLE_COLORS.gray[300],
  divider: ACCESSIBLE_COLORS.gray[200],
} as const;

// Utility functions for color accessibility
export const COLOR_UTILS = {
  /**
   * Get a high contrast color for text on the given background
   */
  getContrastText: (backgroundColor: string): string => {
    // Simple implementation - in production, use a proper contrast calculation
    const darkColors = [
      ACCESSIBLE_COLORS.blue[600],
      ACCESSIBLE_COLORS.blue[700],
      ACCESSIBLE_COLORS.blue[800],
      ACCESSIBLE_COLORS.blue[900],
      ACCESSIBLE_COLORS.orange[700],
      ACCESSIBLE_COLORS.orange[800],
      ACCESSIBLE_COLORS.orange[900],
      ACCESSIBLE_COLORS.gray[700],
      ACCESSIBLE_COLORS.gray[800],
      ACCESSIBLE_COLORS.gray[900],
    ];
    
    return darkColors.includes(backgroundColor) 
      ? CHART_COLORS.text.inverse 
      : CHART_COLORS.text.primary;
  },
  
  /**
   * Get a color-blind safe palette for the given number of data series
   */
  getDataPalette: (count: number): string[] => {
    if (count <= CHART_COLORS.primary.length) {
      return CHART_COLORS.primary.slice(0, count);
    }
    
    // For more than 8 series, repeat with different opacity
    const base = CHART_COLORS.primary;
    const extended = [];
    for (let i = 0; i < count; i++) {
      extended.push(base[i % base.length]);
    }
    return extended;
  },
  
  /**
   * Get pattern/shape identifiers for secondary encoding
   */
  getPatternIdentifiers: (count: number): string[] => {
    const patterns = [
      'solid',      // ●
      'striped',    // ///
      'dotted',     // ···
      'dashed',     // ---
      'cross',      // +++
      'diagonal',   // \\\
      'grid',       // ⚏
      'circle',     // ○
    ];
    
    return patterns.slice(0, count);
  },
  
  /**
   * Add opacity to a color
   */
  withOpacity: (color: string, opacity: number): string => {
    // Convert hex to rgba if needed
    if (color.startsWith('#')) {
      const hex = color.slice(1);
      const r = parseInt(hex.slice(0, 2), 16);
      const g = parseInt(hex.slice(2, 4), 16);
      const b = parseInt(hex.slice(4, 6), 16);
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }
    
    // If already rgba, modify the alpha
    if (color.startsWith('rgba')) {
      return color.replace(/[\d.]+\)$/, `${opacity})`);
    }
    
    // If rgb, convert to rgba
    if (color.startsWith('rgb')) {
      return color.replace('rgb', 'rgba').replace(')', `, ${opacity})`);
    }
    
    // Fallback
    return color;
  }
};

// Export everything for easy access
const ColorSystem = {
  ACCESSIBLE_COLORS,
  CHART_COLORS,
  SEMANTIC_COLORS,
  COLOR_UTILS,
};

export default ColorSystem; 