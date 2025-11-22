import {
	createContext,
	createSignal,
	type JSX,
	type ParentComponent,
	useContext,
} from "solid-js";
import type { CreateWindowOptions, WindowData } from "../types";

let nextZIndex = 1;

// Window Manager Context Type
export type WindowManagerContextType = {
	windows: () => WindowData[];
	updateWindow: (id: string, updates: Partial<WindowData>) => void;
	bringToFront: (id: string) => void;
	createWindow: (
		title: string,
		content: () => JSX.Element,
		options?: CreateWindowOptions,
	) => string;
	removeWindow: (id: string) => void;
	toggleHidden: (id: string) => void;
	toggleMaximize: (id: string) => void;
	getWindow: (id: string) => WindowData | undefined;
};

// Create the context
const WindowManagerContext = createContext<WindowManagerContextType>();

// Provider component
export const WindowManagerProvider: ParentComponent = (props) => {
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

		// Calculate initial size and position
		const initialSize = {
			width: options?.initialSize?.width || globalWindowSize.width * 0.5,
			height: options?.initialSize?.height || globalWindowSize.height * 0.5,
		};
		const initialPosition = {
			x:
				options?.initialPosition?.x ||
				(globalWindowSize.width - globalWindowSize.width * 0.5) / 2,
			y:
				options?.initialPosition?.y ||
				(globalWindowSize.height - globalWindowSize.height * 0.5) / 2,
		};

		const newWindow: WindowData = {
			id: options?.customId ?? Math.random().toString(36),
			title,
			zIndex: nextZIndex++,
			size: initialSize,
			position: initialPosition,
			content,
			isFocused: false,
			isHidden: options?.initialHidden ?? false,
			titleBar: options?.titleBar ?? true,
			resizable: options?.resizable ?? true,
			isMaximized: options?.initialMaximized ?? false,
			// Store the initial size and position for unmaximizing
			lastSize: options?.initialMaximized ? initialSize : undefined,
			lastPosition: options?.initialMaximized ? initialPosition : undefined,
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

	const toggleMaximize = (id: string) => {
		const windowData = windows().find((w) => w.id === id);
		if (!windowData) return;

		if (windowData.isMaximized) {
			// Fallback to default size/position if lastSize/lastPosition are not set
			const fallbackSize = windowData.lastSize || {
				width: window.innerWidth * 0.5,
				height: window.innerHeight * 0.5,
			};
			const fallbackPosition = windowData.lastPosition || {
				x: (window.innerWidth - fallbackSize.width) / 2,
				y: (window.innerHeight - fallbackSize.height) / 2,
			};

			updateWindow(id, {
				size: fallbackSize,
				position: fallbackPosition,
				isMaximized: false,
			});
		} else {
			const globalWindowSize = {
				width: window.innerWidth,
				height: window.innerHeight - 35, // BOTTOM_BAR_HEIGHT
			};
			const lastSize = windowData.size;
			const lastPosition = windowData.position;
			bringToFront(id);
			updateWindow(id, {
				size: {
					width: globalWindowSize.width * 0.98,
					height: globalWindowSize.height * 0.98,
				},
				lastSize,
				lastPosition,
				position: {
					x: globalWindowSize.width * 0.01,
					y: globalWindowSize.height * 0.01,
				},
				isMaximized: true,
			});
		}
	};

	const getWindow = (id: string) => {
		return windows().find((w) => w.id === id);
	};

	const value: WindowManagerContextType = {
		windows,
		updateWindow,
		bringToFront,
		createWindow,
		removeWindow,
		toggleHidden,
		toggleMaximize,
		getWindow,
	};

	return (
		<WindowManagerContext.Provider value={value}>
			{props.children}
		</WindowManagerContext.Provider>
	);
};

// Hook to use the window manager
export const useWindowManager = () => {
	const context = useContext(WindowManagerContext);
	if (!context) {
		throw new Error(
			"useWindowManager must be used within a WindowManagerProvider",
		);
	}
	return context;
};
