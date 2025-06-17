// Color system for My Local LLC
export const colors = {
    // Primary brand colors
    primary: '#b8c54e',        // Main lime green
    primaryDark: '#9da944',    // Darker shade for pressed states
    primaryLight: '#c6d165',   // Lighter shade for backgrounds

    // Secondary colors
    secondary: '#10b981',      // Keep green for success/contact buttons
    secondaryDark: '#059669',  // Darker green

    // Button colors
    button: '#2d3949',         // Primary button color (dark gray-blue)
    buttonHover: '#1f2937',    // Darker shade for pressed states

    // Neutral colors
    white: '#ffffff',
    black: '#000000',
    gray: {
        50: '#f9fafb',
        100: '#f3f4f6',
        200: '#e5e7eb',
        300: '#d1d5db',
        400: '#9ca3af',
        500: '#6b7280',
        600: '#4b5563',
        700: '#374151',
        800: '#1f2937',
        900: '#111827',
    },

    // Status colors
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',

    // Background colors
    background: {
        primary: '#f8f9fa',      // Main app background
        card: '#ffffff',         // Card backgrounds
        header: '#b8c54e',       // Header background
    },

    // Text colors
    text: {
        primary: '#1f2937',      // Main text
        secondary: '#6b7280',    // Secondary text
        light: '#9ca3af',        // Light text
        inverse: '#ffffff',      // Text on colored backgrounds
        headerSubtitle: '#e8f5e8', // Subtitle on green header
    },

    // Border colors
    border: {
        light: '#e5e7eb',
        medium: '#d1d5db',
        dark: '#9ca3af',
    },

    // Shadow color
    shadow: '#000000',
};

// Helper function to get color with opacity
export const getColorWithOpacity = (color: string, opacity: number): string => {
    // Remove # if present
    const hex = color.replace('#', '');

    // Convert hex to RGB
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);

    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};
