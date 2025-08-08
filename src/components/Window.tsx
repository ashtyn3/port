import type { Component } from "solid-js";
import { createEffect, createSignal, Show } from "solid-js";
import type { WindowData } from "../types";
import {
	BOTTOM_BAR_HEIGHT,
	MIN_WINDOW_HEIGHT,
	MIN_WINDOW_WIDTH,
} from "../utils/constants";
import { TitleBar } from "./TitleBar";

interface WindowProps {
	windowData: WindowData;
	onUpdate: (id: string, updates: Partial<WindowData>) => void;
	onRemove: (id: string) => void;
	onBringToFront: (id: string) => void;
	toggleHidden: (id: string) => void;
}

export const Window: Component<WindowProps> = (props) => {
	const [isDragging, setIsDragging] = createSignal(false);
	const [dragOffset, setDragOffset] = createSignal({ x: 0, y: 0 });
	const [isResizing, setIsResizing] = createSignal(false);
	const [resizeDirection, setResizeDirection] = createSignal("");
	const [resizeStart, setResizeStart] = createSignal({
		mouseX: 0,
		mouseY: 0,
		width: 0,
		height: 0,
		x: 0,
		y: 0,
	});

	const handleMouseDown = (e: MouseEvent) => {
		if (props.windowData.isMaximized) {
			return;
		}
		// Calculate offset relative to the window's current position, not the clicked element
		setDragOffset({
			x: e.clientX - props.windowData.position.x,
			y: e.clientY - props.windowData.position.y,
		});
		setIsDragging(true);
		props.onBringToFront(props.windowData.id);
		document.body.style.cursor = "grabbing";
	};

	const handleResizeMouseDown = (e: MouseEvent, direction: string) => {
		if (props.windowData.isMaximized) {
			return;
		}
		e.preventDefault();
		e.stopPropagation();
		setIsResizing(true);
		props.onBringToFront(props.windowData.id);

		setResizeDirection(direction);
		document.body.style.cursor = "nw-resize";
		setResizeStart({
			mouseX: e.clientX,
			mouseY: e.clientY,
			width: props.windowData.size.width,
			height: props.windowData.size.height,
			x: props.windowData.position.x,
			y: props.windowData.position.y,
		});
	};

	const handleMouseMove = (e: MouseEvent) => {
		if (isDragging()) {
			const newX = e.clientX - dragOffset().x;
			const newY = e.clientY - dragOffset().y;
			const constrainedX = Math.max(
				0,
				Math.min(newX, window.innerWidth - props.windowData.size.width),
			);
			const constrainedY = Math.max(
				0,
				Math.min(
					newY,
					window.innerHeight - props.windowData.size.height - BOTTOM_BAR_HEIGHT,
				),
			);
			props.onUpdate(props.windowData.id, {
				position: { x: constrainedX, y: constrainedY },
			});
		}
		if (isResizing()) {
			const deltaX = e.clientX - resizeStart().mouseX;
			const deltaY = e.clientY - resizeStart().mouseY;
			const direction = resizeDirection();

			let newWidth = resizeStart().width;
			let newHeight = resizeStart().height;
			let newX = resizeStart().x;
			let newY = resizeStart().y;

			// Handle horizontal resizing
			if (direction.includes("e")) {
				newWidth = Math.max(MIN_WINDOW_WIDTH, resizeStart().width + deltaX);
			} else if (direction.includes("w")) {
				newWidth = Math.max(MIN_WINDOW_WIDTH, resizeStart().width - deltaX);
				newX = resizeStart().x + deltaX;
				if (newWidth === MIN_WINDOW_WIDTH)
					newX = resizeStart().x + resizeStart().width - MIN_WINDOW_WIDTH;
			}

			// Handle vertical resizing
			if (direction.includes("s")) {
				newHeight = Math.max(MIN_WINDOW_HEIGHT, resizeStart().height + deltaY);
			} else if (direction.includes("n")) {
				newHeight = Math.max(MIN_WINDOW_HEIGHT, resizeStart().height - deltaY);
				newY = resizeStart().y + deltaY;
				if (newHeight === MIN_WINDOW_HEIGHT)
					newY = resizeStart().y + resizeStart().height - MIN_WINDOW_HEIGHT;
			}

			// Constrain to screen bounds
			const maxWidth = window.innerWidth - newX;
			const maxHeight = window.innerHeight - newY - BOTTOM_BAR_HEIGHT;

			props.onUpdate(props.windowData.id, {
				size: {
					width: Math.min(newWidth, maxWidth),
					height: Math.min(newHeight, maxHeight),
				},
				position: { x: Math.max(0, newX), y: Math.max(0, newY) },
			});
		}
	};

	const handleMouseUp = () => {
		setIsDragging(false);
		setIsResizing(false);
		document.body.style.cursor = "default";
		window.removeEventListener("mousemove", handleMouseMove);
		window.removeEventListener("mouseup", handleMouseUp);
	};

	// Add global mouse events only when dragging or resizing
	createEffect(() => {
		if (isDragging() || isResizing()) {
			window.addEventListener("mousemove", handleMouseMove);
			window.addEventListener("mouseup", handleMouseUp);
		}
	});

	return (
		<div
			role="dialog"
			aria-labelledby={`window-title-${props.windowData.id}`}
			class="absolute bg-window border-window-border border-2 overflow-hidden transition-none will-change-transform focus:outline-none"
			style={{
				left: `${props.windowData.position.x}px`,
				top: `${props.windowData.position.y}px`,
				width: `${props.windowData.size.width}px`,
				height: `${props.windowData.size.height}px`,
				"z-index": props.windowData.zIndex,
				transform: isDragging() ? "translateZ(0)" : "none",
			}}
			onMouseDown={(e) => {
				const target = e.target as HTMLElement | null;
				if (
					target &&
					target.closest('a,button,input,textarea,select,[role="button"]')
				) {
					return;
				}
				props.onBringToFront(props.windowData.id);
			}}
			onKeyDown={(e) => {
				if (e.key === "Escape") {
					props.onRemove(props.windowData.id);
				}
			}}
		>
			{props.windowData.titleBar && (
				<TitleBar
					windowData={props.windowData}
					onMouseDown={handleMouseDown}
					onClose={props.onRemove}
					onUpdate={props.onUpdate}
					onBringToFront={props.onBringToFront}
					toggleHidden={props.toggleHidden}
				/>
			)}
			<div class="flex-1 bg-window relative h-[calc(100%)]">
				<div class="p-2 h-full overflow-auto">{props.windowData.content()}</div>
			</div>
			<Show when={props.windowData.resizable ?? true}>
				<div
					role="button"
					aria-label="Resize window from bottom-right corner"
					tabIndex={-1}
					class="absolute -bottom-1 -right-1 w-3 h-3 cursor-se-resize z-20"
					onMouseDown={(e) => handleResizeMouseDown(e, "se")}
				/>
				<div
					role="button"
					aria-label="Resize window from bottom-left corner"
					tabIndex={-1}
					class="absolute -bottom-1 -left-1 w-3 h-3 cursor-sw-resize z-20"
					onMouseDown={(e) => handleResizeMouseDown(e, "sw")}
				/>
				<div
					role="button"
					aria-label="Resize window from top-right corner"
					tabIndex={-1}
					class="absolute -top-1 -right-1 w-3 h-3 cursor-ne-resize z-20"
					onMouseDown={(e) => handleResizeMouseDown(e, "ne")}
				/>
				<div
					role="button"
					aria-label="Resize window from bottom edge"
					tabIndex={-1}
					class="absolute -bottom-1 left-6 right-6 h-3 cursor-s-resize z-20"
					onMouseDown={(e) => handleResizeMouseDown(e, "s")}
				/>
				<div
					role="button"
					aria-label="Resize window from top edge"
					tabIndex={-1}
					class="absolute -top-1 left-6 right-6 h-3 cursor-n-resize z-20"
					onMouseDown={(e) => handleResizeMouseDown(e, "n")}
				/>
				<div
					role="button"
					aria-label="Resize window from left edge"
					tabIndex={-1}
					class="absolute -left-1 top-6 bottom-6 w-3 cursor-w-resize z-20"
					onMouseDown={(e) => handleResizeMouseDown(e, "w")}
				/>
				<div
					role="button"
					aria-label="Resize window from right edge"
					tabIndex={-1}
					class="absolute -right-1 top-6 bottom-6 w-3 cursor-e-resize z-20"
					onMouseDown={(e) => handleResizeMouseDown(e, "e")}
				/>
			</Show>
		</div>
	);
};
