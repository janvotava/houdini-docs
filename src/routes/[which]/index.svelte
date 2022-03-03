<!--
    redirect / to /tour/welcome
-->
<script context="module">
	export async function load({ fetch, params }) {
		// load the page meta data by reading from the groups endpoint
		const response = await fetch(`/${params.which}.json`)
		const { files } = await response.json()

		// if we aren't looking at a valid category
		if (!files[params.which]) {
			return {
				error: 'invalid url',
				status: 404
			}
		}

		// redirect the user to the category index page
		return {
			redirect: files[params.which].index,
			status: 302
		}
	}
</script>
