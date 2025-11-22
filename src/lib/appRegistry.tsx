import type { JSX } from "solid-js";
import type { CreateWindowOptions } from "../types";
import { Welcome } from "../components/Welcome";
import {
    AshtynsOwnTimer,
    ForMe,
    Iro,
} from "./content/forme";
import { Freelance, Scrubbadub, WayfinderAdvisor } from "./content/freelance";

/**
 * App definition for the registry
 */
export type App = {
    /** Unique identifier for the app */
    id: string;
    /** Display name shown in the menu */
    title: string;
    /** Optional description */
    description?: string;
    /** Category for organizing apps in the menu */
    category: string;
    /** The component to render in the window */
    component: () => JSX.Element;
    /** Window creation options */
    windowOptions?: Omit<CreateWindowOptions, "customId">;
    /** Optional icon (for future use) */
    icon?: string;
    /** Optional action to run when opening (e.g., opening multiple windows) */
    onOpen?: (createWindow: (
        title: string,
        content: () => JSX.Element,
        options?: CreateWindowOptions
    ) => string, bringToFront: (id: string) => void) => void;
};

/**
 * App category definition
 */
export type AppCategory = {
    id: string;
    title: string;
    order: number;
};

/**
 * App Registry
 * Add new apps here to make them available in the menu
 */
class AppRegistry {
    private apps: Map<string, App> = new Map();
    private categories: Map<string, AppCategory> = new Map();

    /**
     * Register a new app
     */
    register(app: App) {
        this.apps.set(app.id, app);
        return this;
    }

    /**
     * Register multiple apps
     */
    registerMultiple(apps: App[]) {
        apps.forEach((app) => this.register(app));
        return this;
    }

    /**
     * Register a category
     */
    registerCategory(category: AppCategory) {
        this.categories.set(category.id, category);
        return this;
    }

    /**
     * Get an app by ID
     */
    getApp(id: string): App | undefined {
        return this.apps.get(id);
    }

    /**
     * Get all apps
     */
    getAllApps(): App[] {
        return Array.from(this.apps.values());
    }

    /**
     * Get apps by category
     */
    getAppsByCategory(categoryId: string): App[] {
        return Array.from(this.apps.values()).filter(
            (app) => app.category === categoryId,
        );
    }

    /**
     * Get all categories sorted by order
     */
    getCategories(): AppCategory[] {
        return Array.from(this.categories.values()).sort(
            (a, b) => a.order - b.order,
        );
    }

    /**
     * Get category by ID
     */
    getCategory(id: string): AppCategory | undefined {
        return this.categories.get(id);
    }
}

// Create singleton instance
export const appRegistry = new AppRegistry();

// Register categories
appRegistry
    .registerCategory({
        id: "getting-started",
        title: "Getting started",
        order: 1,
    })
    .registerCategory({
        id: "freelance",
        title: "Freelance Projects",
        order: 2,
    })
    .registerCategory({
        id: "personal",
        title: "Personal Projects",
        order: 3,
    });

// Register apps
appRegistry.registerMultiple([
    {
        id: "welcome",
        title: "Welcome",
        description: "Welcome to my portfolio",
        category: "getting-started",
        component: Welcome,
    },
    {
        id: "freelance",
        title: "Freelance",
        description: "Freelance work overview",
        category: "freelance",
        component: Freelance,
        onOpen: (createWindow, bringToFront) => {
            // Open the freelance overview window
            const id = createWindow("Freelance", () => <Freelance />, {
                customId: "freelance",
            });

            // Also open the detail windows
            queueMicrotask(() => {
                createWindow("Wayfinder Advisor", () => <WayfinderAdvisor />, {
                    customId: "wayfinder-advisor",
                });
                createWindow("Scrubbadub", () => <Scrubbadub />, {
                    customId: "scrubbadub",
                });
                bringToFront(id);
            });
        },
    },
    // {
    // 	id: "wayfinder-advisor",
    // 	title: "Wayfinder Advisor",
    // 	description: "Fleet management system",
    // 	category: "freelance",
    // 	component: WayfinderAdvisor,
    // },
    // {
    // 	id: "scrubbadub",
    // 	title: "Scrubbadub",
    // 	description: "Car wash booking system",
    // 	category: "freelance",
    // 	component: Scrubbadub,
    // },
    {
        id: "for-me",
        title: "For myself",
        description: "Personal projects overview",
        category: "personal",
        component: ForMe,
    },
    // {
    // 	id: "ashtyns-own-timer",
    // 	title: "Ashtyn's Own Timer",
    // 	description: "Custom timer application",
    // 	category: "personal",
    // 	component: AshtynsOwnTimer,
    // },
    // {
    // 	id: "iro",
    // 	title: "Iro",
    // 	description: "Color puzzle game",
    // 	category: "personal",
    // 	component: Iro,
    // },
]);
