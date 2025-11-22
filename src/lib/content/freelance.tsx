import { createResource } from "solid-js";
import { StyledMarkdown } from "../../components/Markdown";
import { GenericButton } from "../../components/menu";
import { useWindowManager } from "../../hooks/useWindowManager";
import { isMobile } from "../../utils/constants";
import { getPost } from "../posts/post";

export const WayfinderAdvisor = () => {
	const [res, setGetPost] = createResource(() => {
		return getPost("WayfinderAdvisor");
	});

	return (
		<div>
			<StyledMarkdown content={res() || ""} />
		</div>
	);
};

export const Scrubbadub = () => {
	const [res, setGetPost] = createResource(() => {
		return getPost("Scrubbadub");
	});

	return (
		<div>
			<StyledMarkdown content={res() || ""} />
		</div>
	);
};

export const Freelance = () => {
	const { createWindow } = useWindowManager();
	return (
		<div class="flex flex-col items-center justify-center h-full w-full pb-8">
			<div class="flex flex-col items-center justify-center ">
				<h1 class="text-2xl font-bold">Freelance</h1>
				<GenericButton
					onClick={() => {
						createWindow("Wayfinder Advisor", () => <WayfinderAdvisor />, {
							customId: "wayfinder-advisor",
						});
					}}
				>
					Wayfinder Advisor
				</GenericButton>
				<GenericButton
					onClick={() => {
						createWindow("Scrubbadub", () => <Scrubbadub />, {
							customId: "scrubbadub",
						});
					}}
				>
					Scrubbadub
				</GenericButton>
			</div>
		</div>
	);
};

// No longer needed - window creation is now handled directly in Menu component
