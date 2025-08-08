import { createSignal, type JSX } from "solid-js";
import type { CreateWindowOptions, WindowData } from "../types";

let nextZIndex = 1;

export const useWindowManager = () => {
	const [windows, setWindows] = createSignal<WindowData[]>([]);

	const updateWindow = (id: string, updates: Partial<WindowData>) => {
		setWindows((ws) => ws.map((w) => (w.id === id ? { ...w, ...updates } : w)));
	};

	const bringToFront = (id: string) => {
		const currentWindow = windows().find((w) => w.id === id);
		if (currentWindow && currentWindow.zIndex < nextZIndex - 1) {
			updateWindow(id, { zIndex: nextZIndex++ });
		}
		setWindows((ws) => ws.map((w) => ({ ...w, isFocused: w.id === id })));
	};

	const createWindow = (
		title: string,
		content: () => JSX.Element,
		options?: CreateWindowOptions,
	): string => {
		const globalWindowSize = {
			width: window.innerWidth,
			height: window.innerHeight,
		};
		const newWindow: WindowData = {
			id: options?.customId ?? Math.random().toString(36),
			title,
			zIndex: nextZIndex++,
			size: {
				width: options?.initialSize?.width || globalWindowSize.width * 0.5,
				height: options?.initialSize?.height || globalWindowSize.height * 0.5,
			},
			position: {
				x:
					options?.initialPosition?.x ||
					(globalWindowSize.width - globalWindowSize.width * 0.5) / 2,
				y:
					options?.initialPosition?.y ||
					(globalWindowSize.height - globalWindowSize.height * 0.5) / 2,
			},
			content,
			isFocused: false,
			isHidden: options?.initialHidden ?? false,
			isMaximized: false,
			titleBar: options?.titleBar ?? true,
			resizable: options?.resizable ?? true,
		};
		const existing = windows().find((w) => w.id === newWindow.id);
		if (existing) {
			console.log("Window with id", newWindow.id, "already exists");
			bringToFront(existing.id);
			updateWindow(existing.id, {
				isFocused: true,
			});
			return existing.id;
		}
		setWindows((ws) => [...ws, newWindow]);
		return newWindow.id;
	};

	const removeWindow = (id: string) => {
		console.log("Removing window with id:", id);
		console.log("Current windows:", windows());
		setWindows((ws) => {
			const filtered = ws.filter((w) => w.id !== id);
			console.log("Filtered windows:", filtered);
			return filtered;
		});
	};

	const toggleHidden = (id: string) => {
		updateWindow(id, {
			isHidden: !windows().find((w) => w.id === id)?.isHidden,
			isFocused: !windows().find((w) => w.id === id)?.isFocused,
		});
	};

	return {
		windows,
		updateWindow,
		bringToFront,
		createWindow,
		removeWindow,
		toggleHidden,
	};
};
