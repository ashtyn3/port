import type { JSX } from "solid-js";

export type WindowData = {
	id: string;
	title: string;
	zIndex: number;
	position: { x: number; y: number };
	size: { width: number; height: number };
	lastSize?: { width: number; height: number };
	lastPosition?: { x: number; y: number };
	content: () => JSX.Element;
	isFocused: boolean;
	isHidden: boolean;
	isMaximized: boolean;
	titleBar: boolean;
	resizable?: boolean;
};

export type CreateWindowOptions = {
	initialSize?: { width: number; height: number };
	initialPosition?: { x: number; y: number };
	titleBar?: boolean;
	initialHidden?: boolean;
	resizable?: boolean;
	customId?: string;
};

export type CreateWindow = (
	title: string,
	content: () => JSX.Element,
	options?: CreateWindowOptions,
) => string;
