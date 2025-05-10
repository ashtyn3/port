<script lang="ts">
type Post = {
	title: string;
	type: string;
	slug: string;
};

const paths = import.meta.glob("/src/posts/*.md", { eager: true });
const data = { you: [], me: [] };
for (const path in paths) {
	const file = paths[path];
	const slug = path.split("/").at(-1)?.replace(".md", "");

	if (file && typeof file === "object" && "metadata" in file && slug) {
		const metadata = file.metadata as Omit<Post, "slug">;
		if (metadata.type != "blog") {
			const post = { ...metadata, slug } satisfies Post;
			data[post.type].push(post);
		}
	}
}
</script>

<main
    class="h-screen w-full bg-[#0022FF] text-white flex justify-center items-center flex-col"
>
    <p class="text-5xl tracking-widest">ASHTYN</p>
    <div class="flex flex-row gap-7">
        <a href="#projects" class="hover:underline">Projects</a>
        <a href="/writing" class="hover:underline">Writing</a>
    </div>
</main>

<article
    class="h-screen w-full flex justify-center items-center flex-col"
    id="projects"
>
    <p class="w-[85%] text-left py-5">My space.</p>
    <div
        class="w-3/4 bg-gray-200 h-3/4 flex justify-center items-center flex-col"
    >
        <label for="window" class="text-left w-[80%] font-serif">Window:</label>
        <div id="window" class="w-[80%] border h-[80%]">
            <div class="flex justify-between p-5 flex-wrap">
                <div>
                    <div>To me</div>
                    <div>
                        {#each data.me as p}
                            <div
                                class="bg-black h-fit p-6 w-[100%] text-white mb-2"
                            >
                                <a href={`/p/${p.slug}`}>{p.title}</a>
                            </div>
                        {/each}
                    </div>
                </div>
                <div>
                    <div>To you</div>
                    <div>
                        {#each data.you as p}
                            <div
                                class="bg-black h-fit p-6 w-[100%] text-white mb-2"
                            >
                                <a href={`/p/${p.slug}`}>{p.title}</a>
                            </div>
                        {/each}
                    </div>
                </div>
            </div>
        </div>
    </div>
</article>
