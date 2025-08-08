import type { Component, JSX } from "solid-js";

export const TitleBarButton: Component<{
	children: JSX.Element;
	onClick: (e: MouseEvent) => void;
	"aria-label"?: string;
}> = (props) => {
	return (
		<button
			type="button"
			class="bg-button-face font-bold border-l-button-shadow border-l-2 border-b-button-shadow border-b-2 border-r-button-highlight border-r-2 border-t-button-highlight border-t-2 text-sm transition-colors px-1.5 w-4 h-4 text-[11px] flex items-center justify-center ml-0.5 hover:cursor-pointer"
			onClick={props.onClick}
			onMouseDown={(e) => e.stopPropagation()}
			aria-label={props["aria-label"]}
		>
			{props.children}
		</button>
	);
};
