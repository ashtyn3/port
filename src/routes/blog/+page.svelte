<script lang="ts">
    type Post = {
        title: string;
        type: string;
        slug: string;
        date: string;
    };

    const paths = import.meta.glob("/src/posts/*.md", { eager: true });
    const data: Post[] = [];
    for (const path in paths) {
        const file = paths[path];
        const slug = path.split("/").at(-1)?.replace(".md", "");

        if (file && typeof file === "object" && "metadata" in file && slug) {
            const metadata = file.metadata as Omit<Post, "slug">;
            const post = { ...metadata, slug } satisfies Post;
            if (post.type === "blog") {
                data.push(post);
            }
        }
    }
</script>

<h1 class="p-5">Writing</h1>
<div class="flex flex-col w-full justify-center items-center my-8">
    {#each data as p}
        <a href={`/p/${p.slug}`} class="w-max">
            <div class="bg-black h-fit p-9 mx-auto text-white">
                <p>{p.title}</p>
                <p>{new Date(p.date).toDateString()}</p>
            </div>
        </a>
    {/each}
</div>
