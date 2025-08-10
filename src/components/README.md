# Markdown Components

This directory contains markdown rendering components built with [solid-markdown](https://github.com/andi23rosca/solid-markdown).

## Components

### `Markdown`
The main markdown component with full customization options.

```tsx
import { Markdown } from './Markdown';

<Markdown 
  content="# Hello World\nThis is **markdown** content"
  renderingStrategy="memo"
  class="custom-styles"
/>
```

**Props:**
- `content: string` - The markdown content to render
- `class?: string` - Additional CSS classes
- `renderingStrategy?: "memo" | "reconcile"` - Rendering strategy (default: "memo")
- `components?: Record<string, any>` - Custom component overrides
- `remarkPlugins?: any[]` - Remark plugins for markdown processing
- `rehypePlugins?: any[]` - Rehype plugins for HTML processing

### `SimpleMarkdown`
A simplified version for basic markdown rendering.

```tsx
import { SimpleMarkdown } from './Markdown';

<SimpleMarkdown content="# Simple markdown" />
```

### `StyledMarkdown`
A styled version with predefined variants.

```tsx
import { StyledMarkdown } from './Markdown';

<StyledMarkdown 
  content="# Styled content" 
  variant="prose" 
  class="additional-styles"
/>
```

**Variants:**
- `default` - Basic styling with `.markdown-content` class
- `prose` - Tailwind prose classes for rich typography
- `minimal` - Minimal styling with `.markdown-minimal` class

## Usage Examples

### Basic Usage
```tsx
const markdownText = `
# Welcome
This is a **bold** text and *italic* text.

## Features
- [x] Lists
- [x] **Formatting**
- [x] \`Code\`

> Blockquotes work too!
`;

<Markdown content={markdownText} />
```

### With Custom Styling
```tsx
<StyledMarkdown 
  content={markdownText} 
  variant="default" 
  class="p-6 bg-white rounded-lg shadow"
/>
```

### Advanced Usage with Plugins
```tsx
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

<Markdown 
  content={markdownText}
  remarkPlugins={[remarkGfm]}
  rehypePlugins={[rehypeHighlight]}
  renderingStrategy="reconcile"
/>
```

## Rendering Strategies

- **`memo`** (default): Generates a new AST tree each time, full DOM re-render
- **`reconcile`**: Uses SolidJS reconcile for efficient updates, only re-renders changed parts

Use `reconcile` for dynamic content that updates frequently, and `memo` for static content.

## Styling

The components come with built-in CSS classes:
- `.markdown-content` - Default styling
- `.markdown-minimal` - Minimal styling

You can override these styles in your CSS or use Tailwind classes via the `class` prop.

## Dependencies

- `solid-markdown` - Core markdown rendering
- `solid-js` - Component framework
- Tailwind CSS - Utility classes (optional)
