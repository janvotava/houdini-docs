<!--
    redirect / to /tour/welcome
-->
<script context="module">
	export async function load({ params }) {
		// if we aren't looking at the docs or the tour, there's a problem
		if (!['tour', 'docs', 'api'].includes(params.which)) {
			return {
				error: 'invalid url',
				status: 404
			};
		}

		return {
			redirect: params.which + '/welcome',
			status: 302
		};
	}
</script>
