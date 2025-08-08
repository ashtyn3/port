import { type Accessor, createMemo, For } from "solid-js";
import type { CreateWindow, WindowData } from "../types";
import { Menu } from "./menu";

export const ToolBarButton = ({
	window,
	bringToFront,
	toggleHidden,
	onClick,
}: {
	window: WindowData;
	bringToFront: (window: string) => void;
	toggleHidden: (window: string) => void;
	onClick?: () => void;
}) => {
	const bg = createMemo(() => {
		return window.isFocused ? "bg-tool-bar-highlight" : "bg-tool-bar-bg";
	});
	const border = createMemo(() => {
		return window.isFocused
			? "border-2 border-t-window-shadow border-l-window-shadow border-b-window-highlight border-r-window-highlight"
			: "border-2 border-t-window-highlight border-l-window-highlight border-b-window-shadow border-r-window-shadow";
	});
	return (
		<button
			type="button"
			class={`w-[100px] h-[35px] ${bg()} ${border()} flex justify-center items-center cursor-pointer`}
			onClick={() => {
				if (onClick) {
					return onClick();
				}
				if (window.isHidden) {
					toggleHidden(window.id);
				}
				bringToFront(window.id);
			}}
		>
			<span class="truncate max-w-[90px] block" title={window.title}>
				{window.title}
			</span>
		</button>
	);
};

export const ToolBar = ({
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
	return (
		<div class="w-full absolute bottom-0 flex justify-center">
			<div class="flex w-full h-[35px] bg-tool-bar-bg gap-2 p-2 items-center">
				<Menu
					windows={windows}
					bringToFront={bringToFront}
					toggleHidden={toggleHidden}
					createWindow={createWindow}
				/>
				<For each={windows()}>
					{(window) => {
						if (window.title === "Menu") {
							return null;
						}
						return (
							<ToolBarButton
								window={window}
								bringToFront={bringToFront}
								toggleHidden={toggleHidden}
							/>
						);
					}}
				</For>
			</div>
		</div>
	);
};
