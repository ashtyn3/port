import type { Component } from "solid-js";
import { createMemo } from "solid-js";
import { useWindowManager } from "../hooks/useWindowManager";
import type { WindowData } from "../types";
import { TitleBarButton } from "./TitleBarButton";

interface TitleBarProps {
	windowData: WindowData;
	onMouseDown: (e: MouseEvent) => void;
}

export const TitleBar: Component<TitleBarProps> = (props: TitleBarProps) => {
	const { removeWindow, toggleHidden, toggleMaximize } = useWindowManager();
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
						removeWindow(props.windowData.id);
					}}
				>
					X
				</TitleBarButton>
				<TitleBarButton
					aria-label={`Minimize ${props.windowData.title}`}
					onClick={(e) => {
						e.stopPropagation();
						toggleHidden(props.windowData.id);
					}}
				>
					—
				</TitleBarButton>
				<TitleBarButton
					aria-label={`Maximize ${props.windowData.title}`}
					onClick={(e) => {
						e.stopPropagation();
						toggleMaximize(props.windowData.id);
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
