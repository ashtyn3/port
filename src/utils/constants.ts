// UI Constants
export const BOTTOM_BAR_HEIGHT = 40; // Height of the bottom bar/taskbar in pixels

// Window constraints
export const MIN_WINDOW_WIDTH = 100;
export const MIN_WINDOW_HEIGHT = 80;
export const TITLE_BAR_HEIGHT = 28;

// Mobile detection
export const isMobile = () => {
	return window.innerWidth <= 768 || "ontouchstart" in window;
};
