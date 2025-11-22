import type { Component } from "solid-js";
import { For, onMount } from "solid-js";
import { ToolBar } from "./components/ToolBar";
import { Window } from "./components/Window";
import {
	useWindowManager,
	WindowManagerProvider,
} from "./hooks/useWindowManager";
import { appRegistry } from "./lib/appRegistry";
import { isMobile } from "./utils/constants";

const AppContent: Component = () => {
	const { windows, createWindow } = useWindowManager();

	onMount(async () => {
		// Open the welcome app on startup
		const welcomeApp = appRegistry.getApp("welcome");
		if (welcomeApp) {
			createWindow(welcomeApp.title, welcomeApp.component, {
				customId: welcomeApp.id,
				initialMaximized: isMobile(),
				...welcomeApp.windowOptions,
			});
		}
	});

	return (
		<div>
			<div class="w-full h-[100dvh] overflow-hidden bg-red-100">
				<For each={windows()}>
					{(windowData) => {
						if (windowData.isHidden) return null;

						return <Window windowData={windowData} />;
					}}
				</For>
			</div>
			<ToolBar />
		</div>
	);
};

const App: Component = () => {
	return (
		<WindowManagerProvider>
			<AppContent />
		</WindowManagerProvider>
	);
};

export default App;
