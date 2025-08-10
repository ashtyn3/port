import type { Component } from "solid-js";
import { SolidMarkdown } from "solid-markdown";

interface MarkdownProps {
	content: string;
	class?: string;
	renderingStrategy?: "memo" | "reconcile";
	// Additional props for customization
	components?: Record<string, any>;
	remarkPlugins?: any[];
	rehypePlugins?: any[];
}

export const Markdown: Component<MarkdownProps> = (props) => {
	return (
		<div class={props.class}>
			<SolidMarkdown
				renderingStrategy={props.renderingStrategy || "memo"}
				components={props.components}
				remarkPlugins={props.remarkPlugins}
				rehypePlugins={props.rehypePlugins}
			>
				{props.content}
			</SolidMarkdown>
		</div>
	);
};

// Convenience component for basic markdown rendering
export const SimpleMarkdown: Component<{ content: string; class?: string }> = (
	props,
) => {
	return <Markdown content={props.content} class={props.class} />;
};

// Component for markdown with custom styling
export const StyledMarkdown: Component<{
	content: string;
	class?: string;
	variant?: "default" | "prose" | "minimal";
}> = (props) => {
	const variantClasses = {
		default: "markdown-content",
		prose: "prose prose-sm max-w-none",
		minimal: "markdown-minimal",
	};

	return (
		<Markdown
			content={props.content}
			class={`${variantClasses[props.variant || "default"]} ${props.class || ""}`}
		/>
	);
};
