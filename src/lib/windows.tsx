import { Markdown, StyledMarkdown } from "../components/Markdown";
import { GenericButton } from "../components/menu";
import type { CreateWindow } from "../types";

const Welcome = () => {
	return (
		<div class="flex flex-col items-center justify-center h-full w-full">
			<div class="flex flex-col items-center justify-center ">
				<h1 class="text-2xl font-bold">Hello!</h1>
				<p class="text-sm">
					This is the portfolio of <b>Ashtyn Morel-Blake.</b>
				</p>
				<p>Click Menu to see my projects or other things.</p>
			</div>
		</div>
	);
};

export const createWelcomeWindow = (
	createWindow: CreateWindow,
	options?: { initialMaximized?: boolean },
) => {
	return createWindow("Welcome!", () => <Welcome />, {
		customId: "welcome",
		...options,
	});
};

// Test function to create a maximized window
export const createMaximizedTestWindow = (createWindow: CreateWindow) => {
	return createWindow(
		"Maximized Test",
		() => (
			<div class="flex flex-col items-center justify-center h-full w-full">
				<h1 class="text-2xl font-bold">Maximized Window Test</h1>
				<p>This window should start maximized!</p>
			</div>
		),
		{
			customId: "maximized-test",
			initialMaximized: true,
		},
	);
};

// Demo window showcasing the markdown component
export const createMarkdownDemoWindow = (createWindow: CreateWindow) => {
	const markdownContent = `# Markdown Demo

This is a **bold** text and this is *italic* text.

## Features

- [x] **Bold** and *italic* text
- [x] \`inline code\`
- [x] [Links](https://github.com/andi23rosca/solid-markdown)
- [x] Lists (like this one!)

## Code Block

\`\`\`typescript
function hello() {
  console.log("Hello, Markdown!");
}
\`\`\`

## Table

| Feature | Status | Notes |
|---------|--------|-------|
| Bold | ✅ | Works great |
| Italic | ✅ | Also works |
| Code | ✅ | Syntax highlighting |
| Lists | ✅ | Ordered and unordered |

> This is a blockquote that demonstrates the markdown rendering capabilities.

---

*Built with [solid-markdown](https://github.com/andi23rosca/solid-markdown)*`;

	return createWindow(
		"Markdown Demo",
		() => (
			<div class="h-full w-full p-4 overflow-auto">
				<StyledMarkdown content={markdownContent} variant="default" />
			</div>
		),
		{
			customId: "markdown-demo",
			initialSize: { width: 600, height: 500 },
		},
	);
};
