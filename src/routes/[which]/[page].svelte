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
	#doc-content {
		padding-top: 30px;
		padding-right: 100px;
		margin-bottom: 200px;
	}

	#doc-content h1,
	h2,
	h3 {
		margin-bottom: 30px;
		font-family: 'Roboto', sans-serif;
	}

	#doc-content h1 {
		font-size: 40px;
	}

	#doc-content h2 {
		margin-top: 20px;
		font-size: 30px;
	}

	#doc-content h3 {
		margin-top: 20px;
		font-size: 24px;
	}

	#doc-content p {
		font-size: 18px;
		line-height: 24px;
		font-family: 'Roboto', sans-serif;
		margin-bottom: 30px;
	}

	#doc-content ul,
	ol {
		margin-top: -30px;
		margin-bottom: 30px;
	}

	#doc-content li {
		font-size: 18px;
		font-family: 'Roboto', sans-serif;
		margin-left: 45px;
		margin-top: 5px;
		line-height: 24px;
	}

	#doc-content ol > li {
		list-style: numbers;
	}

	#doc-content ul > li {
		list-style: disc;
	}

	#doc-content a {
		color: #fc602d;
		text-decoration: none;
		white-space: nowrap;
	}

	#doc-content pre {
		margin-bottom: 30px;
	}

	p > code {
		/* background: #ffffff; */
		/* padding: 2px 6px; */
		border-radius: 5px;
		font-size: 16px;
		padding-bottom: 1px;
		font-family: 'Roboto Mono', monospace;
		white-space: nowrap;
		color: #a1c5f8;
	}
</style>
