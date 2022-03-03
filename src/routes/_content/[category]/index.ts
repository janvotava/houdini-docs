import { list } from '~/content'

export async function get({ params }) {
	// return the file information
	return {
		body: await list(params.category)
	}
}
