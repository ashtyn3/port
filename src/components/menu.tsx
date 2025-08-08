import {
	type Accessor,
	createEffect,
	createMemo,
	createSignal,
	type JSX,
	onMount,
	Show,
} from "solid-js";
import { createFreelanceWindow } from "../lib/content/freelance";
import { createWelcomeWindow } from "../lib/windows";
import type { CreateWindow, WindowData } from "../types";
import { ToolBarButton } from "./ToolBar";

export const MenuSection = ({
	children,
	heading,
}: {
	children: JSX.Element;
	heading: string;
}) => {
	return (
		<div class="flex flex-col w-full">
			<h1 class="text-sm font-bold">{heading}</h1>
			{children}
		</div>
	);
};
export const MenuWindow = ({
	createWindow,
}: {
	createWindow: CreateWindow;
}) => {
	return (
		<div class="w-full h-full p-0 m-0 bg-white flex flex-col justify-center gap-2">
			<MenuSection heading="Getting started">
				<GenericButton
					class="w-full"
					onClick={() => {
						createWelcomeWindow(createWindow);
					}}
				>
					Welcome
				</GenericButton>
				<GenericButton class="w-full">Help</GenericButton>
			</MenuSection>
			<MenuSection heading="Projects">
				<GenericButton
					class="w-full"
					onClick={() => {
						createFreelanceWindow(createWindow);
					}}
				>
					Freelance
				</GenericButton>
				<GenericButton class="w-full">For myself</GenericButton>
			</MenuSection>
		</div>
	);
};
export const GenericButton = (props: {
	children: string | number | Node | HTMLElement | Element;
	onClick?: (e: MouseEvent) => void;
	class?: string;
	disabled?: boolean;
	"aria-label"?: string;
}) => {
	const [isPressed, setIsPressed] = createSignal(false);
	return (
		<button
			type="button"
			class={`w-fit p-1 h-[35px] bg-tool-bar-bg flex justify-center items-center cursor-pointer transition-colors duration-100 ${
				props.disabled
					? "opacity-50 cursor-not-allowed"
					: "hover:bg-tool-bar-highlight"
			} ${
				isPressed()
					? "border-2 border-t-window-shadow border-l-window-shadow border-b-window-highlight border-r-window-highlight"
					: "border-2 border-t-window-highlight border-l-window-highlight border-b-window-shadow border-r-window-shadow"
			} ${props.class ?? ""}`}
			onMouseDown={(e) => {
				e.stopPropagation();
			}}
			onMouseUp={(e) => {
				e.stopPropagation();
			}}
			onPointerDown={(e) => {
				e.stopPropagation();
				setIsPressed(true);
			}}
			onPointerUp={(e) => {
				e.stopPropagation();
				setIsPressed(false);
			}}
			onPointerLeave={() => setIsPressed(false)}
			onClick={(e) => {
				e.stopPropagation();
				if (!props.disabled) props.onClick?.(e);
			}}
			aria-label={props["aria-label"]}
			disabled={props.disabled}
		>
			{props.children}
		</button>
	);
};

export const Menu = ({
	windows,
	bringToFront,
	toggleHidden,
	createWindow,
}: {
	windows: Accessor<WindowData[]>;
	bringToFront: (window: string) => void;
	toggleHidden: (window: string) => void;
	createWindow: CreateWindow;
}) => {
	const [menuId, setMenuId] = createSignal<string | null>(null);
	const [suppressAutoHide, setSuppressAutoHide] = createSignal(false);
	onMount(() => {
		const id = createWindow(
			"Menu",
			() => <MenuWindow createWindow={createWindow} />,
			{
				initialSize: { width: 200, height: 300 },
				initialPosition: { x: 1, y: window.innerHeight - 340 },
				titleBar: false,
				initialHidden: true,
				resizable: false,
				customId: "menu",
			},
		);
		setMenuId(id);
	});
	const menuWindow = createMemo<WindowData | undefined>(() => {
		const id = menuId();
		if (!id) return undefined;
		return windows().find((w) => w.id === id);
	});
	// Auto-hide the menu when any other window becomes focused
	createEffect(() => {
		if (menuWindow()?.isHidden) return;
		if (suppressAutoHide()) return;
		const id = menuId();
		if (!id) return;
		const focused = windows().find((w) => w.isFocused);
		const menu = windows().find((w) => w.id === id);
		if (!menu) return;
		if (focused && focused.id !== id && !menu.isHidden) {
			toggleHidden(id);
		}
	});
	// Do not auto-hide the menu on other focus; ensure user-initiated focus rules
	return (
		<Show when={menuWindow()}>
			{(window) => (
				<ToolBarButton
					window={window()}
					bringToFront={bringToFront}
					toggleHidden={toggleHidden}
					onClick={() => {
						const id = menuId();
						if (!id) return;
						const menu = windows().find((w) => w.id === id);
						if (!menu) return;
						setSuppressAutoHide(true);
						bringToFront(id);
						toggleHidden(id);
						queueMicrotask(() => setSuppressAutoHide(false));
					}}
				/>
			)}
		</Show>
	);
};
