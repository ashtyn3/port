import { createResource } from "solid-js";
import { StyledMarkdown } from "../../components/Markdown";
import { GenericButton } from "../../components/menu";
import type { CreateWindow } from "../../types";
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

export const Freelance = ({ createWindow }: { createWindow: CreateWindow }) => {
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

export const createFreelanceWindow = (
	createWindow: CreateWindow,
	bringToFront: (window: string) => void,
) => {
	const id = createWindow(
		"Freelance",
		() => <Freelance createWindow={createWindow} />,
		{
			customId: "freelance",
			initialMaximized: isMobile(),
		},
	);
	// Open related windows after Freelance is created to avoid recursive mount issues
	queueMicrotask(() => {
		createWindow("Wayfinder Advisor", () => <WayfinderAdvisor />, {
			customId: "wayfinder-advisor",
			initialMaximized: isMobile(),
		});
		createWindow("Scrubbadub", () => <Scrubbadub />, {
			customId: "scrubbadub",
			initialMaximized: isMobile(),
		});
		bringToFront(id);
	});
	return id;
};
