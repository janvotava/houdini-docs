<script>
	import { page, navigating } from '$app/stores'
	import { Icon, SEO } from '~/components'
	import { onMount } from 'svelte'

	export let title = ''
	export let link = ''
	export let index

	// the list of files we can render
	// @ts-ignore
	let categories = REPLACE_WITH_FILES
	let categoryNames = Object.keys(categories)

	// some state to control the menu
	let menuOpen = false
	function toggleMenu() {
		menuOpen = !menuOpen
	}

	// we have to drive the current category off of state so that the responsive
	// layout can swap it around without relying on page transitions
	let currentCategory = $page.url.pathname.split('/')[1].toLowerCase()

	// when navigating, keep the current category in sync
	navigating.subscribe((nav) => {
		if (!nav) {
			return
		}
		menuOpen = false
	})

	// whenever the browser resizes above the thin breakpoint we need to
	// close the popup menu so there's no funky link/button mismatch
	onMount(() => {
		window.onresize = () => {
			// if the window is above the thin width
			if (window.innerWidth > 1000) {
				menuOpen = false
				currentCategory = $page.url.pathname.split('/')[1].toLowerCase()
			}
		}
	})

	// show the files associated with the current category
	$: currentFiles = categories[currentCategory]?.files || []
	$: previous = currentFiles[index]?.previous
	$: next = currentFiles[index]?.next
</script>

<svelte:head>
	<meta name="theme-color" content="#161b22" />
</svelte:head>

<main>
	<aside class:open={menuOpen}>
		<h1>
			<buton
				aria-haspopup="true"
				aria-expanded={menuOpen}
				class="menu-icon"
				tabindex="0"
				on:click={toggleMenu}
			>
				{#if menuOpen}
					<Icon name="x" width="20px" stroke="#ff3e00" />
				{:else}
					<Icon name="menu" width="20px" />
				{/if}
			</buton>
			<a href="/">Houdini</a>
		</h1>
		<div class:hidden={!menuOpen}>
			<nav>
				{#each categoryNames as category}
					<button
						on:click={() => (currentCategory = category)}
						class:current={currentCategory === category}
						aria-hidden
					>
						{categories[category].name}
					</button>
				{/each}
				{#each categoryNames as category}
					<a
						href={categories[category].index.slug}
						class:current={currentCategory === category}
						sveltekit:prefetch
					>
						{categories[category].name}
					</a>
				{/each}
			</nav>
			<ul>
				{#each currentFiles as file}
					<li class:current={$page.url.pathname.endsWith(file.slug)}>
						<a href={file.slug} sveltekit:prefetch>{file.title}</a>
					</li>
				{/each}
			</ul>
		</div>
	</aside>

	<SEO {title} url={`https://www.houdinigraphql.com${link}`} />

	<article id="doc-content">
		<slot />
	</article>
	<footer>
		{#if previous}
			<a id="previous-page" class="pagination" href={previous.slug} sveltekit:prefetch>
				<Icon name="chevron-left" class="icon" width="20px" height="20px" />
				<div>
					<h4>Previous</h4>
					<p>
						{previous.title}
					</p>
				</div>
			</a>
		{:else}
			<div id="previous-page" />
		{/if}
		{#if next}
			<a id="next-page" class="pagination" href={next.slug} sveltekit:prefetch>
				<Icon name="chevron-right" class="icon" width="20px" height="20px" />
				<div>
					<h4>Next</h4>
					<p>
						{next.title}
					</p>
				</div>
			</a>
		{:else}
			<div id="next-page" />
		{/if}
	</footer>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		background: #161b22;
		color: white;
		min-height: 100vh;
	}

	aside {
		padding: 20px 0px;
		padding-left: max(0px, env(safe-area-inset-left));
		padding-right: max(0px, env(safe-area-inset-right));
		margin-right: 50px;
		width: 300px;
		display: flex;
		flex-direction: column;
		flex-shrink: 0;
		top: 0;
		position: fixed;
		background-color: #161b22;
		z-index: 10;
	}

	:global(.menu-icon) {
		margin-right: 15px;
		display: none;
	}

	aside h1 {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	h1 {
		margin-left: 40px;
	}

	nav button:nth-child(1) {
		margin-left: 30px;
	}

	h1 {
		font-size: 30px;
		font-family: 'Hind', sans-serif;
		margin-top: 14px;
		margin-bottom: 14px;
		color: white;
		height: 45px;
	}

	a,
	a:visited {
		color: white;
		text-decoration: none;
		cursor: pointer;
	}

	nav a,
	nav button {
		background: none;
		border: none;
		padding-bottom: 10px;
		color: white;
		font-size: 18px;
		font-family: 'Hind', sans-serif;
		padding-left: 10px;
		padding-right: 10px;
		margin-right: 5px;
	}

	nav button {
		height: 32px;
		cursor: pointer;
	}

	nav a {
		height: 20px;
	}

	/* magic 4 is to offset the button list */
	nav a:nth-child(4) {
		margin-left: 30px;
	}

	nav {
		height: 30px;
		border-bottom: 3px solid #303a48;
		display: flex;
	}

	nav a:hover,
	nav button:hover {
		color: #ff3e00;
	}

	nav a.current,
	nav button.current {
		border-bottom: 3px solid #ff3e00;
	}

	ul {
		margin-top: 24px;
	}

	li {
		padding: 10px 0;
		font-size: 18px;
		font-family: 'Hind', sans-serif;
		padding-left: 40px;
		padding-right: 20px;
		margin-bottom: 5px;
	}

	li.current {
		background: #475465;
		border-top-right-radius: 10px;
		border-bottom-right-radius: 10px;
	}

	nav > button {
		display: none;
	}

	nav > a {
		display: flex;
	}

	footer {
		display: flex;
		flex-direction: row;
		width: calc(100% - 350px);
		margin-bottom: 100px;
		height: 30px;
		justify-content: space-between;
		gap: 100px;
	}

	#next-page {
		flex-direction: row-reverse;
	}

	article,
	footer {
		margin-left: 350px;
		max-width: 850px;
		box-sizing: border-box;
		padding-left: env(safe-area-inset-left);
		padding-right: calc(100px + env(safe-area-inset-right));
	}

	article {
		display: flex;
		flex-direction: column;

		overflow-y: auto;
		padding-top: 30px;
		margin-bottom: 50px;
	}

	.pagination {
		display: flex;
		flex-direction: row;
		align-items: center;
		font-size: 18px;
		font-family: 'Hind', sans-serif;
		font-weight: 500;
		text-decoration: none;
		justify-content: center;
		color: white;
		gap: 12px;
	}

	.pagination:hover {
		color: #ff3e00;
	}

	.pagination h4 {
		font-family: 'Hind', sans-serif;
		margin-bottom: 5px;
	}

	.pagination p {
		color: #ff3e00;
	}

	@media (max-width: 1000px) {
		article,
		footer {
			margin-left: 0px;
			padding-left: calc(55px + env(safe-area-inset-left));
			padding-right: calc(55px + env(safe-area-inset-right));
			padding-top: 20px;
			max-width: none;
		}

		footer {
			margin-left: 0;
			width: 100%;
		}

		main {
			flex-direction: column;
		}

		aside {
			width: 100%;
			padding-top: 0;
			padding-bottom: 0;
			padding-left: max(0px, env(safe-area-inset-left));
			padding-right: max(0px, env(safe-area-inset-right));
			box-sizing: border-box;
			margin-right: 0px;
			position: sticky;
		}

		aside.open {
			height: 100%;
			position: fixed;
		}

		h1 {
			margin-left: 20px;
		}

		:global(.menu-icon) {
			display: flex;
			cursor: pointer;
		}

		.hidden {
			display: none;
		}

		nav > a {
			display: none;
		}

		nav > button {
			display: flex;
		}

		li.current {
			border-top-right-radius: 0px;
			border-bottom-right-radius: 0px;
		}
	}
</style>
