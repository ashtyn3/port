import type { Component } from "solid-js";
import { For, onMount } from "solid-js";
import { toggleMaximize } from "./components/TitleBar";
import { ToolBar } from "./components/ToolBar";
import { Window } from "./components/Window";
import { useWindowManager } from "./hooks/useWindowManager";
import { createWelcomeWindow } from "./lib/windows";
import { isMobile } from "./utils/constants";

// Welcome window moved to lib/windows
const App: Component = () => {
	const {
		windows,
		createWindow,
		updateWindow,
		removeWindow,
		bringToFront,
		toggleHidden,
	} = useWindowManager();

	onMount(async () => {
		createWelcomeWindow(createWindow);
		if (isMobile()) {
			toggleMaximize(windows()[0], updateWindow, bringToFront);
		}
	});

	return (
		<div>
			<div class="w-full h-[100dvh] overflow-hidden bg-red-100">
				<For each={windows()}>
					{(windowData) => {
						if (windowData.isHidden) return null;

						return (
							<Window
								windowData={windowData}
								onUpdate={updateWindow}
								onRemove={removeWindow}
								onBringToFront={bringToFront}
								toggleHidden={toggleHidden}
							/>
						);
					}}
				</For>
			</div>
			<ToolBar
				windows={windows}
				bringToFront={bringToFront}
				toggleHidden={toggleHidden}
				createWindow={createWindow}
			/>
		</div>
	);
};

export default App;
