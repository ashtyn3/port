import { createMemo, createSignal, For, type Accessor } from "solid-js";
import { useWindowManager } from "../hooks/useWindowManager";
import type { WindowData } from "../types";
import { Menu } from "./menu";

export const ToolBarButton = ({
    window,
    onClick,
    isPressed,
}: {
    window: WindowData;
    onClick?: () => void;
    isPressed?: Accessor<boolean>;
}) => {
    const { bringToFront, toggleHidden } = useWindowManager();
    const [isButtonPressed, setIsButtonPressed] = createSignal(false);
	const shouldShowPressed = createMemo(() => {
		return isPressed ? isPressed() : window.isFocused;
	});
	const showPressed = createMemo(() => isButtonPressed() || shouldShowPressed());
	const bg = createMemo(() => {
		return showPressed() ? "bg-tool-bar-highlight" : "bg-tool-bar-bg";
	});
	const border = createMemo(() => {
		return showPressed()
			? "border-2 border-t-window-shadow border-l-window-shadow border-b-window-highlight border-r-window-highlight"
			: "border-2 border-t-window-highlight border-l-window-highlight border-b-window-shadow border-r-window-shadow";
	});

    return (
        <button
            type="button"
            class={`w-[100px] h-[35px] ${bg()} ${showPressed() ? "" : "hover:bg-tool-bar-highlight"} ${border()} flex justify-center items-center cursor-pointer`}
            onPointerDown={(e) => {
                e.stopPropagation();
                setIsButtonPressed(true);
            }}
            onPointerUp={(e) => {
                e.stopPropagation();
                setIsButtonPressed(false);
            }}
            onPointerLeave={() => setIsButtonPressed(false)}
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

export const ToolBar = () => {
    const { windows } = useWindowManager();
    return (
        <div class="w-full absolute bottom-0 flex justify-center">
            <div class="flex w-full h-[35px] bg-tool-bar-bg gap-2 p-2 items-center">
                <Menu />
                <For each={windows()}>
                    {(window) => {
                        if (window.title === "Menu") {
                            return null;
                        }
                        return <ToolBarButton window={window} />;
                    }}
                </For>
            </div>
        </div>
    );
};
