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
	import Icon from '~/components/Icon.svelte'

	export let content: string
	export let previous = undefined
	export let next = undefined
</script>

<article id="doc-content">
	{@html content}
</article>
<footer>
	{#if previous}
		<a id="previous-page" class="pagination" href={previous.link}>
			<Icon name="chevron-left" class="icon" width="20px" height="20px" />
			<div>
				<h4>Previous</h4>
				<p href={previous.link}>
					{previous.title}
				</p>
			</div>
		</a>
	{/if}
	{#if next}
		<a id="next-page" class="pagination" href={next.link}>
			<Icon name="chevron-right" class="icon" width="20px" height="20px" />
			<div>
				<h4>Next</h4>
				<p>
					{next.title}
				</p>
			</div>
		</a>
	{/if}
</footer>

<style>
	footer {
		display: flex;
		flex-direction: row;
		width: calc(100% - 350px);
		position: relative;
		margin-bottom: 100px;
		height: 30px;
	}
	#previous-page {
		position: absolute;
		left: 0;
	}

	#next-page {
		position: absolute;
		right: 100px;
		flex-direction: row-reverse;
	}

	article,
	footer {
		margin-left: 350px;
		max-width: 850px;
		padding-right: 100px;
		box-sizing: border-box;
	}

	article {
		display: flex;
		flex-grow: 1;
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
		font-family: 'Roboto';
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
		font-family: 'Roboto', sans-serif;
		margin-bottom: 5px;
	}

	.pagination p {
		color: #ff3e00;
	}

	@media (max-width: 1000px) {
		article,
		footer {
			margin-left: 0px;
			padding-left: 55px;
			padding-right: 55px;
			padding-top: 20px;
			max-width: none;
		}

		footer {
			margin-left: 0;
			width: 100%;
		}

		#previous-page {
			left: 55px;
		}

		#next-page {
			right: 48px;
		}
	}
</style>
