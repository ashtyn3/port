import { createResource } from "solid-js";
import { StyledMarkdown } from "../../components/Markdown";
import { GenericButton } from "../../components/menu";
import type { CreateWindow } from "../../types";
import { isMobile } from "../../utils/constants";
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

export const ForMe = ({ createWindow }: { createWindow: CreateWindow }) => {
	return (
		<div class="flex flex-col items-center justify-center h-full w-full pb-8">
			<div class="flex flex-col items-center justify-center ">
				<h1 class="text-2xl font-bold">For me</h1>
				<GenericButton
					onClick={() => {
						createWindow("Ashtyn's Own Timer", () => <AshtynsOwnTimer />, {
							customId: "ashtyns-own-timer",
						});
					}}
				>
					Ashtyn's Own Timer
				</GenericButton>
				<GenericButton
					onClick={() => {
						createWindow("Iro", () => <Iro />, {
							customId: "iro",
						});
					}}
				>
					Iro
				</GenericButton>
			</div>
		</div>
	);
};

export const createForMeWindow = (
	createWindow: CreateWindow,
	bringToFront: (window: string) => void,
) => {
	const id = createWindow(
		"For me",
		() => <ForMe createWindow={createWindow} />,
		{
			customId: "for-me",
			initialMaximized: isMobile(),
		},
	);
	bringToFront(id);
};
