import type { Component } from "solid-js";
import { createMemo } from "solid-js";
import type { WindowData } from "../types";
import { BOTTOM_BAR_HEIGHT } from "../utils/constants";
import { TitleBarButton } from "./TitleBarButton";

interface TitleBarProps {
	windowData: WindowData;
	onMouseDown: (e: MouseEvent) => void;
	onClose: (id: string) => void;
	onUpdate: (id: string, updates: Partial<WindowData>) => void;
	onBringToFront: (id: string) => void;
	toggleHidden: (id: string) => void;
}

export const toggleMaximize = (
	windowData: WindowData,
	onUpdate: (id: string, updates: Partial<WindowData>) => void,
	onBringToFront: (id: string) => void,
) => {
	if (windowData.isMaximized) {
		onUpdate(windowData.id, {
			size: windowData.lastSize,
			position: windowData.lastPosition,
			isMaximized: false,
		});
	} else {
		const globalWindowSize = {
			width: window.innerWidth,
			height: window.innerHeight - BOTTOM_BAR_HEIGHT,
		};
		const lastSize = windowData.size;
		const lastPosition = windowData.position;
		onBringToFront(windowData.id);
		onUpdate(windowData.id, {
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

export const TitleBar: Component<TitleBarProps> = (props: TitleBarProps) => {
	const bg = createMemo(() => {
		return props.windowData.isFocused
			? "bg-gradient-to-b from-[#3875d7] to-[#274b8a]"
			: "bg-[#a5b6d7]";
	});

	return (
		<header
			class={`w-full h-[28px] border-b-window-border border-b-2 flex justify-evenly items-center ${bg()}`}
		>
			<div class="flex flex-row">
				<TitleBarButton
					aria-label={`Close ${props.windowData.title}`}
					onClick={(e) => {
						e.stopPropagation();
						props.onClose(props.windowData.id);
					}}
				>
					X
				</TitleBarButton>
				<TitleBarButton
					aria-label={`Minimize ${props.windowData.title}`}
					onClick={(e) => {
						e.stopPropagation();
						props.toggleHidden(props.windowData.id);
					}}
				>
					—
				</TitleBarButton>
				<TitleBarButton
					aria-label={`Maximize ${props.windowData.title}`}
					onClick={(e) => {
						e.stopPropagation();
						toggleMaximize(
							props.windowData,
							props.onUpdate,
							props.onBringToFront,
						);
					}}
				>
					□
				</TitleBarButton>
			</div>
			<button
				type="button"
				id={`window-title-${props.windowData.id}`}
				class="text-white font-medium text-sm px-2 flex-1 cursor-grab bg-transparent border-none outline-none text-left"
				onMouseDown={props.onMouseDown}
				aria-label={`Drag ${props.windowData.title} window`}
			>
				{props.windowData.title}
			</button>
		</header>
	);
};
