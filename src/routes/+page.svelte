<script lang="ts">
	const selectedWork = [
		{
			year: "2023",
			title: "GTC",
			href: "https://github.com/ashtyn3/gtc",
			description:
				"An engine and interface for a board game I designed. The rules began as a twenty-page competition specification; the implementation became an exercise in bitboards, move generation, and turning an invented world into something playable."
		},
		{
			year: "2025",
			title: "Ashtyn Synth",
			href: "https://github.com/ashtyn3/ashtyn-synth",
			description:
				"A musical instrument made with a musician friend by turning an OpenSteno keyboard into a MIDI controller and browser synthesizer. The keyboard firmware scans its RP2040 matrix; the interface exposes chords, gain, octaves, and envelope controls."
		},
		{
			year: "2025",
			title: "Eigen",
			href: "https://github.com/ashtyn3/eigen",
			description:
				"An attempt to understand tensor frameworks by building one: tensors, broadcasting, lazy computational graphs, CPU and Metal runtimes, neural-network layers, and a graph visualizer. I stopped at the very educational cliff called backpropagation."
		},
		{
			year: "2025",
			title: "Iro",
			href: "https://github.com/ashtyn3/iro",
			description:
				"A simulated world with a custom entity system, procedural materials, atmosphere, seasons, bodily stress, machines, and an ASCII-style renderer driven by WebGPU compute shaders."
		},
		{
			year: "University",
			title: "Lecy",
			href: "https://lecy.ashtyn.land",
			description:
				"A lecture-rating and note-sharing platform made for students. It found real users and was featured in my university newspaper."
		}
	];

	const smallerHoles = [
		{
			title: "Log-slow-merge-tree",
			href: "https://github.com/ashtyn3/Log-slow-merge-tree",
			note: "WALs, recovery, tables, manifests, superblocks, and k-way merging."
		},
		{
			title: "Functional reactive fun",
			href: "https://github.com/ashtyn3/func-reactive-fun",
			note: "Dependency tracking, batched transactions, computed values, and functional combinators."
		},
		{
			title: "TigerBeetle Zig client",
			href: "https://github.com/ashtyn3/tigerbeetle-zig-client/tree/master",
			note: "My first serious attempt to contribute around an existing open-source system."
		},
		{
			title: "Ashtyn's Own Timer",
			href: "/p/AOT",
			note: "A deliberately small Pomodoro timer for macOS."
		}
	];
</script>

<svelte:head>
	<title>Ashtyn Morel-Blake</title>
	<meta
		name="description"
		content="Ashtyn Morel-Blake studies linguistics and philosophy at McGill University, with a particular interest in the intersection of formal systems and natural language."
	/>
</svelte:head>

<main class="site-shell">
	<header class="intro" aria-labelledby="page-title">
		<h1 id="page-title">Ashtyn Morel-Blake</h1>
		<p class="lede">
			I study linguistics at McGill University, where I minor in philosophy. I am most
			interested in the intersection of formal systems and natural language: how explicit
			structures can represent, explain, or fail to capture the way people make meaning. I
			explore adjacent questions through programming, writing, and building models from below.
		</p>
		<nav aria-label="Primary">
			<a href="#writing">Research &amp; writing</a>
			<a href="https://github.com/ashtyn3">GitHub</a>
			<a href="mailto:ashtynmorel@gmail.com">Email</a>
		</nav>
	</header>

	<section aria-labelledby="interests-title">
		<h2 id="interests-title">Research interests</h2>
		<ol class="amusements">
			<li>Natural language and formal representations of its structure and meaning.</li>
			<li>What formal models reveal—and erase—when applied to human language.</li>
			<li>The connections among linguistic theory, logic, type theory, and programming languages.</li>
		</ol>
	</section>

	<section id="writing" aria-labelledby="writing-title">
		<h2 id="writing-title">Research &amp; writing</h2>
		<p>
			I write about language, logic, computation, theology, material life, and questions
			that refuse to leave me alone.
		</p>
		<ul class="link-list">
			<li>
				<span><strong>On Will</strong> — freedom, omniscience, possibility, and responsibility.</span>
				<span>work in progress</span>
			</li>
			<li>
				<span><strong>Type Theory</strong> — from Russell's paradox through Church to Curry–Howard.</span>
				<span>2026</span>
			</li>
			<li>
				<a href="/p/a_material_exploration">An exploration of material</a>
				<span>2025</span>
			</li>
		</ul>
	</section>

	<section aria-labelledby="work-title">
		<h2 id="work-title">Earlier software work</h2>
		<p>
			Before turning more fully toward academic research, I spent a great deal of time
			learning by constructing systems from first principles.
		</p>
		<div class="work-list">
			{#each selectedWork as project}
				<article class="work-item">
					<div class="work-heading">
						<h3><a href={project.href}>{project.title}</a></h3>
						<span>{project.year}</span>
					</div>
					<p>{project.description}</p>
				</article>
			{/each}
		</div>
	</section>

	<section aria-labelledby="archive-title">
		<h2 id="archive-title">Software archive</h2>
		<ul class="archive-list">
			{#each smallerHoles as project}
				<li>
					<a href={project.href}>{project.title}</a>
					<span>{project.note}</span>
				</li>
			{/each}
		</ul>
	</section>

	<footer>
		<p>
			This is a deliberately plain website. The projects have already supplied enough
			complexity.
		</p>
	</footer>
</main>
