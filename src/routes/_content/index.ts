import { listAll } from '~/content'

export async function get({ params }) {
	// return the file information
	return {
		body: {
			files: await listAll()
		}
	}
}
