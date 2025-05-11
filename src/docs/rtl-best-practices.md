# RTL Best Practices

This document provides guidance on how to properly support Right-to-Left (RTL) languages in our application, particularly for Arabic.

## Key Principles

1. **Text Direction**: All text should follow the correct reading direction (RTL for Arabic, LTR for English/Finnish)
2. **Layout Direction**: UI elements should be mirrored for RTL languages
3. **Icon Direction**: Directional icons should be flipped in RTL mode
4. **Consistency**: The entire UI should be consistent in its directional behavior

## Debugging RTL Issues

To debug RTL layout issues, add `?debug=rtl` to any URL in development. This will:
- Show outlines around RTL elements
- Add a background color to RTL text components
- Log RTL status information to the console

You can also manually trigger RTL debugging with:

```tsx
import { debugRTLStatus, enableRTLDebugOutlines } from '@/utils/rtlDebug';

// In your component:
enableRTLDebugOutlines();
debugRTLStatus();
```

## Using Built-in RTL Utilities

### CSS Classes

Our application has RTL support built into the CSS with directional classes:

```css
/* These are handled automatically when [dir="rtl"] is set */
.text-left, .text-right
.ml-*, .mr-*
.pl-*, .pr-*
.left-*, .right-*
.flex-row, .flex-row-reverse
```

### TypeScript Utility Functions

Use the utility functions in `src/utils/rtl.ts` to apply the correct classes based on current locale:

```tsx
import { getMarginClass, getPaddingClass, getFlexDirectionClass } from '@/utils/rtl';

// In your component:
<div className={getMarginClass(locale, 4, 'start')}>...</div>
<div className={getFlexDirectionClass(locale)}>...</div>
```

### RTL Components

Use the RTL components for text handling:

```tsx
import RTLText, { RTLNumber, RTLDate, RTLIcon } from '@/components/ui/RTLText';

// For general text that should respect language direction
<RTLText>Your text here</RTLText>

// For numbers in RTL context
<RTLNumber>12345</RTLNumber>

// For dates in RTL context
<RTLDate>May 11, 2025</RTLDate>

// For icons that should flip in RTL
<RTLIcon><IconComponent /></RTLIcon>
```

## Common RTL Issues and Solutions

### Text Alignment

- Text should be right-aligned in RTL mode
- Use the `getTextAlignClass` utility or the built-in RTL CSS overrides

### Spacing

- Margins and padding should be flipped in RTL mode
- Use the `getMarginClass` and `getPaddingClass` utilities

### Icons

- Directional icons (arrows, back/forward) should be flipped
- Use the `RTLIcon` component with `flip={true}` prop

### Form Elements

- Form elements should be right-aligned in RTL mode
- Labels should appear to the right of checkboxes/radio buttons

### Lists

- Bullet points and numbers should appear on the right side
- Use the built-in RTL CSS overrides

## Testing RTL Support

1. Change the language to Arabic
2. Verify that:
   - Text is right-aligned
   - Layout flows right-to-left
   - Icons are correctly oriented
   - Form elements are right-aligned
   - Numbers and dates display correctly

## References

- [MDN Web Docs: RTL Text](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Writing_Modes/Handling_different_text_directions)
- [Tailwind CSS RTL Support](https://tailwindcss.com/docs/hover-focus-and-other-states#rtl-support)
