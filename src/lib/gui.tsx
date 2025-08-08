import type { JSX } from "solid-js";

export type Element = {
	type: "stack" | "text" | "button";
	props: string[];
	children: Element[];
	textContent?: string;
};

export const render = (element: Element) => {
	switch (element.type) {
		case "stack":
			return (
				<div class={element.props.join(" ")}>
					{element.children.map(render)}
				</div>
			);
		case "text":
			return <span>{element.textContent}</span>;
		case "button":
			return (
				<button type="button" class={element.props.join(" ")}>
					{element.children.map(render)}
				</button>
			);
	}
};

export const Text = (text: string): Element => {
	return {
		type: "text",
		props: [],
		children: [],
		textContent: text,
	};
};

export const attr = (name: string, value: string) => {
	return `${name}="${value}"`;
};

export const Stack = (children: Element[]): Element => {
	return {
		type: "stack",
		props: [attr("class", "flex flex-col")],
		children,
	};
};

export const renderRoot = (element: Element): JSX.Element => {
	return <div>{render(element)}</div>;
};
