<script context="module">
	export async function load({ fetch, params }) {
		// load the page meta data by reading from the groups endpoint
		const response = await fetch(`/${params.which}/${params.page}.json`)
		return {
			props: await response.json()
		}
	}
</script>

<script lang="ts">
	export let content
</script>

{@html content}
