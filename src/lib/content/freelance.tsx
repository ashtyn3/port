import booking from "../../assets/scrubbadub/booking.png";
import details from "../../assets/scrubbadub/details.png";
import landing from "../../assets/scrubbadub/landing.png";
import { GenericButton } from "../../components/menu";
import type { CreateWindow } from "../../types";

export const WayfinderAdvisor = () => {
	return (
		<div class="">
			<h1 class="text-2xl font-bold">Wayfinder Advisor</h1>
			<p>
				Check them out:{" "}
				<a
					href="https://www.thewayfinder.co/"
					target="_blank"
					rel="noopener noreferrer"
					class="text-blue-500 hover:text-blue-700 underline"
				>
					wayfinderadvisor.com
				</a>
			</p>
			<p>
				A consulting and coaching company that helps guide business owners to
				success and plan their future.
			</p>
			<img
				src="https://www.thewayfinder.co/_app/immutable/assets/primary_logo.gV_fSH3q.svg"
				alt="Wayfinder Advisor"
				class="w-1/2"
			/>
		</div>
	);
};

export const Scrubbadub = () => {
	return (
		<div class="">
			<h1 class="text-2xl font-bold">Scrubbadub</h1>
			<p>No longer public ):</p>
			<p>
				Scrubbadub Mobile Detailing is a car detailing company that comes to
				you!
			</p>
			<div class="flex flex-col items-center justify-center">
				<img src={landing} alt="Scrubbadub" class="w-3/4" />
				<img src={booking} alt="Scrubbadub" class="w-3/4" />
				<img src={details} alt="Scrubbadub" class="w-3/4" />
			</div>
		</div>
	);
};

export const Freelance = ({ createWindow }: { createWindow: CreateWindow }) => {
	return (
		<div class="flex flex-col items-center justify-center h-full w-full">
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

export const createFreelanceWindow = (createWindow: CreateWindow) => {
	const id = createWindow(
		"Freelance",
		() => <Freelance createWindow={createWindow} />,
		{
			customId: "freelance",
			initialPosition: {
				x: 100,
				y: 100,
			},
			initialSize: {
				width: 200,
				height: 300,
			},
		},
	);
	// Open related windows after Freelance is created to avoid recursive mount issues
	queueMicrotask(() => {
		createWindow("Wayfinder Advisor", () => <WayfinderAdvisor />, {
			customId: "wayfinder-advisor",
		});
		createWindow("Scrubbadub", () => <Scrubbadub />, {
			customId: "scrubbadub",
		});
	});
	return id;
};
