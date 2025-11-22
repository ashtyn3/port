import {
    createEffect,
    createMemo,
    createSignal,
    type JSX,
    onMount,
    Show,
    For,
} from "solid-js";
import { useWindowManager } from "../hooks/useWindowManager";
import { appRegistry } from "../lib/appRegistry";
import { isMobile } from "../utils/constants";
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

export const MenuWindow = () => {
    const { createWindow, bringToFront } = useWindowManager();
    const categories = appRegistry.getCategories();

    const handleAppClick = (appId: string) => {
        const app = appRegistry.getApp(appId);
        if (!app) return;

        // If the app has a custom onOpen handler, use it
        if (app.onOpen) {
            app.onOpen(createWindow, bringToFront);
            return;
        }

        // Otherwise, create a standard window
        createWindow(app.title, app.component, {
            customId: app.id,
            initialMaximized: isMobile(),
            ...app.windowOptions,
        });
    };

    return (
        <div class="w-full h-full p-0 m-0 bg-white flex flex-col justify-center gap-2">
            <For each={categories}>
                {(category) => {
                    const apps = appRegistry.getAppsByCategory(category.id);
                    if (apps.length === 0) return null;

                    return (
                        <MenuSection heading={category.title}>
                            <For each={apps}>
                                {(app) => (
                                    <GenericButton
                                        class="w-full"
                                        onClick={() => handleAppClick(app.id)}
                                        aria-label={app.description || app.title}
                                    >
                                        {app.title}
                                    </GenericButton>
                                )}
                            </For>
                        </MenuSection>
                    );
                }}
            </For>
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
            class={`w-fit p-1 h-[35px] bg-tool-bar-bg flex justify-center items-center cursor-pointer transition-colors duration-100 ${props.disabled
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-tool-bar-highlight"
                } ${isPressed()
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

export const Menu = () => {
    const { windows, bringToFront, toggleHidden, createWindow } =
        useWindowManager();
    const [menuId, setMenuId] = createSignal<string | null>(null);
    const [suppressAutoHide, setSuppressAutoHide] = createSignal(false);
    const [isMenuOpen, setIsMenuOpen] = createSignal(false);
    onMount(() => {
        const id = createWindow("Menu", () => <MenuWindow />,
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

    const menuWindow = createMemo(() => {
        const id = menuId();
        if (!id) return undefined;
        return windows().find((w) => w.id === id);
    });

    // Auto-hide the menu when any other window becomes focused
    createEffect(() => {
        const menu = menuWindow();
        if (!menu) return;
        if (menu.isHidden) {
            setIsMenuOpen(false);
            return;
        }
        if (suppressAutoHide()) return;
        const id = menuId();
        if (!id) return;
        const focused = windows().find((w) => w.isFocused);
        if (focused && focused.id !== id && !menu.isHidden) {
            toggleHidden(id);
            setIsMenuOpen(false);
        }
    });

    // Do not auto-hide the menu on other focus; ensure user-initiated focus rules
    return (
        <Show when={menuWindow()}>
            {(window) => (
                <ToolBarButton
                    window={window()}
                    isPressed={isMenuOpen}
                    onClick={() => {
                        const id = menuId();
                        if (!id) return;
                        const menu = windows().find((w) => w.id === id);
                        if (!menu) return;
                        setSuppressAutoHide(true);
                        const wasHidden = menu.isHidden;
                        bringToFront(id);
                        toggleHidden(id);
                        setIsMenuOpen(wasHidden); // Toggle the open state
                        queueMicrotask(() => setSuppressAutoHide(false));
                    }}
                />
            )}
        </Show>
    );
};
