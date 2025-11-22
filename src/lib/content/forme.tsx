import { createResource } from "solid-js";
import { StyledMarkdown } from "../../components/Markdown";
import { GenericButton } from "../../components/menu";
import { useWindowManager } from "../../hooks/useWindowManager";
import { getPost } from "../posts/post";

export const AshtynsOwnTimer = () => {
	const [res, setGetPost] = createResource(() => {
		return getPost("AOT");
	});

	return (
		<div>
			<StyledMarkdown content={res() || ""} />
		</div>
	);
};

export const Iro = () => {
	const [res, setGetPost] = createResource(() => {
		return getPost("Iro");
	});

	return (
		<div>
			<StyledMarkdown content={res() || ""} />
		</div>
	);
};

export const ForMe = () => {
	const { createWindow } = useWindowManager();
	return (
		<div class="p-4">
			<h1 class="text-2xl font-bold mb-4">For me</h1>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div class="flex flex-col items-center bg-window p-4 rounded border">
					<img src="/assets/AOT/sm-shot.png" alt="Ashtyn's Own Timer" class="w-24 h-24 object-cover mb-2 rounded" />
					<h2 class="text-lg font-semibold mb-2">Ashtyn's Own Timer</h2>
					<p class="text-sm text-center mb-4">Personal timer app</p>
					<GenericButton
						onClick={() => {
							createWindow("Ashtyn's Own Timer", () => <AshtynsOwnTimer />, {
								customId: "ashtyns-own-timer",
							});
						}}
					>
						Open
					</GenericButton>
				</div>
				<div class="flex flex-col items-center bg-window p-4 rounded border">
					<img src="/assets/Iro/game.png" alt="Iro" class="w-24 h-24 object-cover mb-2 rounded" />
					<h2 class="text-lg font-semibold mb-2">Iro</h2>
					<p class="text-sm text-center mb-4">Game project</p>
					<GenericButton
						onClick={() => {
							createWindow("Iro", () => <Iro />, {
								customId: "iro",
							});
						}}
					>
						Open
					</GenericButton>
				</div>
			</div>
		</div>
	);
};

// No longer needed - window creation is now handled directly in Menu component
