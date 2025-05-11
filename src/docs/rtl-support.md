# RTL Support Documentation

This document describes the Right-to-Left (RTL) text direction implementation for Arabic language support in the project.

## Overview

To ensure proper RTL text direction support for Arabic content, we've implemented several solutions:

1. **Language Detection**: The application automatically detects when the Arabic language is selected and applies the RTL direction to the entire document.

2. **CSS Support**: We've added comprehensive CSS rules to handle RTL text direction properly.

3. **Utility Components & Functions**: Custom components and utility functions help manage RTL-specific styling needs.

4. **Text Direction Demo**: A dedicated page to test and showcase proper RTL text rendering.

## Implementation Details

### 1. Document Direction Setting

In `LanguageContext.tsx`, we set the document's `dir` attribute to "rtl" when Arabic is selected:

```tsx
// Apply RTL attribute to document for proper text direction
if (typeof document !== 'undefined') {
  document.documentElement.setAttribute('dir', locale === 'ar' ? 'rtl' : 'ltr');
  document.documentElement.setAttribute('lang', locale);
  
  // Add a CSS class for additional RTL styling
  if (locale === 'ar') {
    document.documentElement.classList.add('rtl-mode');
  } else {
    document.documentElement.classList.remove('rtl-mode');
  }
}
```

### 2. CSS Handling

We've added RTL-specific CSS in two places:

- **globals.css**: Contains basic RTL overrides for text alignment, margins, and padding
- **rtl.css**: Contains additional comprehensive RTL styling rules

Key CSS rules:
```css
[dir="rtl"] {
  /* Text alignment */
  .text-left {
    text-align: right;
  }
  
  .text-right {
    text-align: left;
  }
  
  /* Margins and paddings */
  .mr-2 {
    margin-right: 0;
    margin-left: 0.5rem;
  }
}
```

### 3. RTL Utility Components

We've created specialized components for handling RTL text:

- **RTLText**: Ensures proper text direction for mixed content
- **RTLNumber**: Keeps numbers left-to-right even in RTL contexts

Example usage:
```tsx
<RTLText>هذا نص عربي مع أرقام 123</RTLText>
```

### 4. RTL Utility Functions

In `rtl.ts`, we've added helper functions:
- `getDirectionClass`: Returns the appropriate direction class
- `getTextAlignClass`: Returns text alignment based on locale
- `getFlexDirectionClass`: Handles flex direction in RTL contexts
- `getSpacingClass`: Ensures correct spacing in both directions
- `getMarginClass` & `getPaddingClass`: Apply correct margin/padding based on locale

Example usage:
```tsx
<div className={`flex ${getFlexDirectionClass(locale)} ${getSpacingClass(locale, 4)}`}>
  {/* Content */}
</div>
```

### 5. Common RTL Issues & Solutions

1. **Text alignment**: 
   - Use `text-right` for RTL languages
   - Use `getTextAlignClass(locale)` utility

2. **Margins & Paddings**:
   - Use logical properties (`ms-` instead of `ml-`) when possible
   - Use the utility functions for dynamic margins

3. **Images & Icons**:
   - Some icons need to be mirrored: use the `.rtl-flip` class

4. **Bidirectional text with numbers**:
   - Use the `<RTLNumber>` component for numbers in RTL text

## Testing

You can test RTL functionality by:
1. Switching language to Arabic using the language switcher
2. Visiting the Text Direction Demo page at `/[locale]/text-direction-demo`

## Troubleshooting

Common issues:

1. **Misaligned text**: Check if the parent element has conflicting alignment rules

2. **Incorrect margins**: Make sure margin utilities are properly mirrored for RTL

3. **Weird number rendering**: Use the `<RTLNumber>` component for numbers within Arabic text
