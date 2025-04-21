# Themed Components

This directory contains reusable themed components that maintain consistent styling across the entire application.

## Available Components

### Card Component

`Card` is a container component that provides consistent styling across light, dark, and colorful themes.

```tsx
import Card from '@/components/Card';

// Usage
<Card 
  variant="primary" 
  slideDirection="left"
>
  {children}
</Card>
```

**Props:**
- `variant`: 'primary' | 'secondary' | 'tertiary' | 'muted' (default: 'primary')
- `slideDirection`: 'left' | 'right' | null - For animation, which direction to slide in from (default: null)
- `hoverEffect`: boolean - Whether to apply hover effects (default: true)
- `className`: string - Additional CSS classes

### CardContent Component

`CardContent` is designed to work with Card to provide consistent content layout.

```tsx
import Card from '@/components/Card';
import CardContent from '@/components/CardContent';

// Usage
<Card variant="primary">
  <CardContent
    icon="rocket_launch" 
    iconClassName="text-purple-400 bg-purple-400/10"
    title="Title Here"
    location="Location, City, Country"
    date="2023 - Present"
  >
    <p className="opacity-70">Content goes here...</p>
  </CardContent>
</Card>
```

**Props:**
- `icon`: React.ReactNode - Material icon name
- `iconClassName`: string - CSS classes for the icon
- `title`: string - Card title
- `titleClassName`: string - CSS classes for the title
- `subtitle`: string - Optional subtitle
- `subtitleClassName`: string - CSS classes for the subtitle
- `location`: string - Optional location (displays with location icon)
- `date`: string - Optional date (displays with clock icon)
- `children`: React.ReactNode - Card content

## Theme Support

The components automatically adapt to the current theme. Themes are implemented using CSS variables in globals.css:

- Light theme: `.theme-light`
- Dark theme: `.theme-dark`
- Colorful theme: `.theme-colorful`

## CSS Classes

These components use the following CSS classes:

- `.theme-card` - Base card container
- `.theme-card-glow` - Glow effect outside the card
- `.theme-card-content` - Card content area

## Creating New Themed Components

When creating new themed components, follow these guidelines:

1. Use CSS variables instead of hardcoded colors:
   ```css
   background: var(--card-from-bg);
   border-color: var(--card-border);
   ```

2. Use opacity modifiers instead of specific colors for text:
   ```tsx
   <p className="opacity-70">Text content</p>
   ```

3. Use `text-theme` for text color that should adapt to the theme:
   ```tsx
   <span className="text-theme">Themed text</span>
   ```

4. Use `text-primary` for accent colors:
   ```tsx
   <h3 className="text-primary">Heading</h3>
   ```

5. Use the `Card` component for consistent card styling:
   ```tsx
   <Card variant="primary">
     {/* Card content */}
   </Card>
   ```

This approach ensures that all UI elements maintain a consistent style across the application while correctly adapting to different themes. 