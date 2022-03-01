<script context="module">
	export async function load({ fetch, params }) {
		// load the page meta data by reading from the groups endpoint
		const response = await fetch(`/${params.which}.json`);
		return {
			props: await response.json()
		};
	}
</script>

<script>
	import { page } from '$app/stores';
	import Icon from '~/components/Icon.svelte';
	import { derived } from 'svelte/store';

	// the list of files we can render
	export let files;

	// some state to control the menu
	let menuOpen = false;
	function toggleMenu() {
		menuOpen = !menuOpen;
	}

	// pull out the current page
	const currentPage = derived(page, ({ url }) => url.pathname);
</script>

<svelte:head>
	<link rel="stylesheet" href="/static/styles/md.css" />
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
				<Icon name="menu" width="20px" />
			</buton>
			<a href="/">Houdini</a>
		</h1>
		<div class:hidden={!menuOpen}>
			<nav>
				<a href="/tour" class:current={$currentPage.startsWith('/tour')}>Guided Tour</a>
				<a href="/docs" class:current={$currentPage.startsWith('/docs')}>Docs</a>
				<a href="/api" class:current={$currentPage.startsWith('/api')}>API</a>
			</nav>
			<ul>
				{#each files as file}
					<li class:current={$currentPage.endsWith(file.slug)}>
						<a href={file.slug} on:click={toggleMenu}>{file.title}</a>
					</li>
				{/each}
			</ul>
		</div>
	</aside>
	<article id="doc-content">
		<slot />
	</article>
</main>

<style>
	main {
		display: flex;
		flex-direction: row;
	}

	aside {
		padding: 20px 0px;
		margin-right: 50px;
		width: 300px;
		display: flex;
		flex-direction: column;
		flex-shrink: 0;
		top: 0;
		position: sticky;
		background-color: #161b22;
	}

	article {
		max-width: 850px;
		overflow-y: auto;
		padding-top: 30px;
		padding-right: 100px;
		margin-bottom: 50px;
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
	nav > a:first-child {
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
	}

	nav > a {
		padding-bottom: 10px;
		color: white;
		font-size: 18px;
		font-family: 'Roboto', sans-serif;
		padding-left: 10px;
		padding-right: 10px;
		margin-right: 5px;
	}

	nav {
		height: 30px;
		border-bottom: 3px solid #303a48;
	}

	nav > a:hover {
		color: #ff3e00;
	}

	nav > a.current {
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

	article {
		display: flex;
		flex-grow: 1;
		flex-direction: column;
	}

	@media (max-width: 1005px) {
		main {
			flex-direction: column;
		}

		article {
			margin-left: 0px;
			padding-left: 55px;
			padding-right: 48px;
			padding-top: 20px;
			max-width: none;
		}

		aside {
			width: 100%;
			padding: 0;
			margin-right: 0px;
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
	}
</style>
