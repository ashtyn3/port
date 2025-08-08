import { GenericButton } from "../components/menu";
import type { CreateWindow } from "../types";

const Welcome = () => {
	return (
		<div class="flex flex-col items-center justify-center h-full w-full">
			<div class="flex flex-col items-center justify-center ">
				<h1 class="text-2xl font-bold">Hello!</h1>
				<p class="text-sm">
					This is the portfolio of <b>Ashtyn Morel-Blake.</b>
				</p>
				<p>Click Menu to see my projects or other things.</p>
			</div>
		</div>
	);
};

export const createWelcomeWindow = (createWindow: CreateWindow) => {
	return createWindow("Welcome!", () => <Welcome />, {
		customId: "welcome",
	});
};
