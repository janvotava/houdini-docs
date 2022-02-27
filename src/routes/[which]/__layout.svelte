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
	import { derived } from 'svelte/store';

	export let files;

	// pull out the current page
	const currentPage = derived(page, ({ url }) => url.pathname);
</script>

<svelte:head>
	<link rel="stylesheet" href="/styles/docs.css" />
</svelte:head>

<main>
	<aside>
		<h1><a href="/">Houdini</a></h1>
		<nav>
			<a href="/tour" class:current={$currentPage.startsWith('/tour')}>Guided Tour</a>
			<a href="/docs" class:current={$currentPage.startsWith('/docs')}>Docs</a>
			<a href="/api" class:current={$currentPage.startsWith('/api')}>API</a>
		</nav>
		<ul>
			{#each files as file}
				<li class:current={$currentPage.endsWith(file.slug)}>
					<a href={file.slug}>{file.title}</a>
				</li>
			{/each}
		</ul>
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
	}

	nav,
	h1 {
		margin-left: 40px;
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
		padding-bottom: 5px;
		color: white;
		font-size: 18px;
		font-family: 'Roboto', sans-serif;
		margin-right: 20px;
	}

	nav > a:hover {
		color: #ff3e00;
	}

	nav > a.current {
		border-bottom: 3px solid #ff3e00;
		margin-bottom: -3px;
	}

	ul {
		margin-top: 24px;
	}

	li {
		padding: 10px 0;
		font-size: 20px;
		font-family: 'Roboto', sans-serif;
		padding-left: 40px;
		padding-right: 40px;
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
</style>
