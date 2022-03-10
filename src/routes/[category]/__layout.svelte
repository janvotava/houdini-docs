<script context="module">
	export async function load({ fetch }) {
		// load the page meta data by reading from the groups endpoint
		const response = await fetch(`/_content`)
		return {
			props: await response.json()
		}
	}
</script>

<script>
	import { page, navigating } from '$app/stores'
	import Icon from '~/components/Icon.svelte'
	import { onMount } from 'svelte'

	// the list of files we can render
	export let files

	// some state to control the menu
	let menuOpen = false
	function toggleMenu() {
		menuOpen = !menuOpen
		currentCategory = $page.params.category
	}

	// pull out the current page
	$: currentPage = $page.url.pathname

	// we have to drive the current category off of state so that the responsive
	// layout can swap it around without relying on page transitions
	let currentCategory = $page.params.category
	const categories = Object.keys(files)

	// a more human readable version of each category
	const prettyName = {
		intro: 'Introduction',
		guides: 'Guides',
		api: 'API'
	}

	// when navigating, keep the current category in sync
	navigating.subscribe((nav) => {
		if (!nav) {
			return
		}
		menuOpen = false
		currentCategory = nav.to.pathname.split('/')[1].toLowerCase()
	})

	// whenever the browser resizes above the thin breakpoint we need to
	// close the popup menu so there's no funky link/button mismatch
	onMount(() => {
		window.onresize = () => {
			// if the window is above the thin width
			if (window.innerWidth > 1000) {
				menuOpen = false
				currentCategory = $page.params.category
			}
		}
	})

	// show the files associated with the current category
	$: currentFiles = files[currentCategory]?.pages || []
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
				{#each categories as category}
					<button
						on:click={() => (currentCategory = category)}
						class:current={currentCategory === category}
						aria-hidden
					>
						{prettyName[category]}
					</button>
				{/each}
				{#each categories as category}
					<a href={files[category].index} class:current={$page.params.category === category}>
						{prettyName[category]}
					</a>
				{/each}
			</nav>
			<ul>
				{#each currentFiles as file}
					<li class:current={currentPage.endsWith(file.slug)}>
						<a href={`/${currentCategory}/${file.slug}`}>{file.title}</a>
					</li>
				{/each}
			</ul>
		</div>
	</aside>
	<slot />
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
		font-family: 'Roboto', sans-serif;
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
		font-family: 'Roboto', sans-serif;
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
		font-size: 20px;
		font-family: 'Roboto', sans-serif;
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

	@media (max-width: 1000px) {
		main {
			flex-direction: column;
		}

		aside {
			width: 100%;
			padding: 0;
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
