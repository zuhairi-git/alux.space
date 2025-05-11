# RTL Support Documentation

This document describes the Right-to-Left (RTL) text direction implementation for Arabic language support in the project.

## Overview

To ensure proper RTL text direction support for Arabic content, we've implemented several solutions:

1. **Language Detection**: The application automatically detects when the Arabic language is selected and applies the RTL direction to the entire document.

2. **CSS Support**: We've added comprehensive CSS rules to handle RTL text direction properly for text, layout, spacing, icons, and form elements.

3. **Utility Components & Functions**: Custom components and utility functions help manage RTL-specific styling needs, providing consistent and automated RTL support.

4. **Directional UI Components**: Specialized React components that automatically handle proper RTL layout and presentation.

5. **Text Direction Demo**: A dedicated page to test and showcase proper RTL text and layout rendering.

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

We've created specialized components for handling RTL text and layout:

#### Text Components
- **RTLText**: Ensures proper text direction for mixed content with options for forcing direction
- **RTLNumber**: Keeps numbers left-to-right even in RTL contexts
- **RTLDate**: Properly formats dates in RTL context
- **RTLIcon**: Handles icon flipping in RTL mode

Example usage:
```tsx
<RTLText>هذا نص عربي مع أرقام <RTLNumber>123</RTLNumber></RTLText>
<RTLDate>May 11, 2025</RTLDate>
<RTLIcon><ArrowBackIcon /></RTLIcon>
```

#### Directional UI Components
- **DirectionalFlex**: Automatically reverses flex direction in RTL mode
- **DirectionalGrid**: Handles grid layout in RTL context
- **DirectionalButton**: Ensures proper button layout with icons in RTL mode

Example usage:
```tsx
<DirectionalFlex className="bg-gray-100 p-4 rounded">
  <div>First Item</div>
  <div>Second Item</div>
  <div>Third Item</div>
</DirectionalFlex>

<DirectionalButton 
  iconStart={<ArrowBackIcon />}
  className="bg-blue-500 text-white px-4 py-2"
>
  Back
</DirectionalButton>
```

### 4. RTL Utility Functions

In `rtl.ts`, we've added comprehensive helper functions:
- `isRTLLocale`: Determines if a locale uses RTL
- `getDirectionClass`: Returns the appropriate direction class
- `getTextAlignClass`: Returns text alignment based on locale
- `getFlexDirectionClass`: Handles flex direction in RTL contexts
- `getSpacingClass`: Ensures correct spacing in both directions
- `getMarginClass` & `getPaddingClass`: Apply correct margin/padding based on locale
- `getPositionClass`: Returns left/right positioning class
- `getBorderClass`: Returns border class for the correct side
- `getIconFlipClass`: Returns transform class for icons

Example usage:
```tsx
<div 
  className={`
    flex 
    ${getFlexDirectionClass(locale)} 
    ${getSpacingClass(locale, 4)}
    ${getMarginClass(locale, 3, 'start')}
    ${getBorderClass(locale, 'end')}
  `}
>
  <span className={getIconFlipClass(locale)}>
    <ArrowIcon />
  </span>
  {/* Content */}
</div>
```

### 5. Common RTL Issues & Solutions

1. **Text alignment**: 
   - Use `text-right` for RTL languages
   - Use `getTextAlignClass(locale)` utility
   - Use the `RTLText` component for complex text

2. **Margins & Paddings**:
   - Use the utility functions `getMarginClass()` and `getPaddingClass()` for dynamic margins
   - Avoid hardcoding margin/padding sides in components that support multiple languages

3. **Layout Direction**:
   - Use `DirectionalFlex` and `DirectionalGrid` components
   - Use `getFlexDirectionClass()` utility when needed
   - Be careful with absolute positioning - use `getPositionClass()` utility

4. **Icons & Buttons**:
   - Use `RTLIcon` for directional icons
   - Use `DirectionalButton` for buttons with icons
   - Use `getIconFlipClass()` for custom icon flipping

5. **Form Elements**:
   - Use proper styling for form labels in RTL mode
   - Flip checkbox and radio button layouts using flex direction
   - Ensure input alignment is properly set for RTL

6. **Lists & Timelines**:
   - Reverse order in RTL mode when appropriate
   - Ensure bullet points and numbered lists are properly aligned

### 6. Testing RTL Support

Use the Text Direction Demo page at `/[locale]/text-direction-demo` to test and showcase RTL support for:
- Text direction and alignment
- Layout direction
- UI components in RTL mode
- Utility functions
- Special bidirectional text cases

### 7. Best Practices & Guidelines

1. **Always use built-in components** for text that might be displayed in RTL languages
2. **Use utility functions** instead of hardcoding margin/padding sides
3. **Test in both RTL and LTR** modes when making UI changes
4. **Avoid absolute positioning** when possible
5. **Use RTL-aware components** for layout 
6. **Consider mixed content** (numbers within Arabic text)
7. **Follow the guideline** in the [RTL Best Practices](./rtl-best-practices.md) document

### 8. References

- [RTL Best Practices](./rtl-best-practices.md) - Our internal best practices doc
- [MDN: CSS Logical Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties)
- [W3C: Inline Layout in Bidirectional Text](https://www.w3.org/International/articles/inline-bidi-markup/)
- [W3C: Structural markup and right-to-left text in HTML](https://www.w3.org/International/questions/qa-html-dir)

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
