import type { EntryGenerator } from "./$types";

export const entries: EntryGenerator = () => {
    const paths = import.meta.glob("../../../posts/*.md", { eager: true });
    const slugs = [];
    for (const path in paths) {
        const file = paths[path];
        const slug = path.split("/").at(-1)?.replace(".md", "");

        if (file && typeof file === "object" && "metadata" in file && slug) {
            const metadata = file.metadata as Omit<Post, "slug">;
            const post = { ...metadata } satisfies Post;
            slugs.push({ slug });
        }
    }
    return slugs;
};

export const prerender = true;
