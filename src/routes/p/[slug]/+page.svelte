<script lang="ts">
    import "./styles.css";
    let { data } = $props();
</script>

<article class="content mb-10">
    {#if data.meta.type == "blog"}
        <div class="w-full flex justify-center">
            <div class="w-1/2 font-serif">
                <div class="pb-3.5 font-mono">
                    <a href="/blog">(Back)</a>
                </div>
                <div class="tracking-wider w-full">
                    <p class="text-xs my-2 font-mono">
                        {new Date(data.meta.date).toDateString()}
                    </p>
                    <h1 class="mb-5">{data.meta.title}</h1>
                    <data.content />
                </div>
            </div>
        </div>
    {:else}
        <div class="w-full flex justify-center">
            <div class="w-1/2 font-mono">
                <div class="pb-3.5">
                    <a href="/">(Back)</a>
                </div>
                <div class="tracking-wider w-full">
                    <h1>{data.meta.title}</h1>
                    <data.content />
                </div>
            </div>
        </div>
    {/if}
</article>
