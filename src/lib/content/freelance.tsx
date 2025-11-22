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
        <div class="p-4">
            <h1 class="text-2xl font-bold mb-4">Freelance</h1>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="flex flex-col items-center bg-window p-4 rounded border">
                    <h2 class="text-lg font-semibold mb-2">Wayfinder Advisor</h2>
                    <p class="text-sm text-center mb-4">A website for a business advisor.</p>
                    <GenericButton
                        onClick={() => {
                            createWindow("Wayfinder Advisor", () => <WayfinderAdvisor />, {
                                customId: "wayfinder-advisor",
                            });
                        }}
                    >
                        Open
                    </GenericButton>
                </div>
                <div class="flex flex-col items-center bg-window p-4 rounded border">
                    <img src="/assets/scrubbadub/landing.png" alt="Scrubbadub" class="w-24 h-24 object-cover mb-2 rounded" />
                    <h2 class="text-lg font-semibold mb-2">Scrubbadub</h2>
                    <p class="text-sm text-center mb-4">Booking system and company portfolio.</p>
                    <GenericButton
                        onClick={() => {
                            createWindow("Scrubbadub", () => <Scrubbadub />, {
                                customId: "scrubbadub",
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
