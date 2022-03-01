import { getPage } from '~/content'

export async function get({ params }) {
	return {
		body: await getPage(params.which, params.page)
	}
}
