<script context="module">
	export async function load({ fetch, params }) {
		// load the page meta data by reading from the groups endpoint
		const response = await fetch(`/${params.which}/${params.page}.json`);
		return {
			props: await response.json()
		};
	}
</script>

<script lang="ts">
	export let content;
</script>

{@html content}

<style global>
	article {
		padding-top: 30px;
		padding-right: 100px;
	}

	article h1 {
		font-size: 40px;
		margin-bottom: 30px;
		font-family: 'Roboto', sans-serif;
	}

	article p {
		font-size: 18px;
		line-height: 24px;
		font-family: 'Roboto', sans-serif;
		margin-bottom: 30px;
	}

	article ul {
		margin-top: -30px;
		margin-bottom: 30px;
	}

	article li {
		font-size: 18px;
		font-family: 'Roboto', sans-serif;
		list-style: disc;
		margin-left: 45px;
		margin-top: 10px;
	}

	article a {
		color: #ff3e00;
		text-decoration: none;
	}
</style>
