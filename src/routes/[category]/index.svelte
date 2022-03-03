<!--
    redirect / to /tour/welcome
-->
<script context="module">
	export async function load({ fetch, params }) {
		// load the page meta data by reading from the category endpoint
		const response = await fetch(`/_content/${params.category}`)
		const { index } = await response.json()

		// redirect the user to the category index page
		return {
			redirect: index,
			status: 302
		}
	}
</script>
