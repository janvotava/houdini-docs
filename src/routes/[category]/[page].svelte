<script context="module">
	export async function load({ fetch, params }) {
		// load the page meta data by reading from the groups endpoint
		const response = await fetch(`/_content/${params.category}/${params.page}`)
		return {
			props: await response.json()
		}
	}
</script>

<script lang="ts">
	import { Icon, SEO } from '~/components'

	export let html: string
	export let previous = undefined
	export let next = undefined
	export let title = ''
	export let link = ''
</script>

<SEO {title} url={`https://www.houdinigraphql.com${link}`} />

<article id="doc-content">
	{@html html}
</article>
<footer>
	{#if previous}
		<a id="previous-page" class="pagination" href={previous.link} sveltekit:prefetch>
			<Icon name="chevron-left" class="icon" width="20px" height="20px" />
			<div>
				<h4>Previous</h4>
				<p href={previous.link}>
					{previous.title}
				</p>
			</div>
		</a>
	{:else}
		<div id="previous-page" />
	{/if}
	{#if next}
		<a id="next-page" class="pagination" href={next.link} sveltekit:prefetch>
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

<style>
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
	}
</style>
