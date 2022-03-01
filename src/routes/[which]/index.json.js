import { list } from '~/content';

export async function get({ params }) {
	const { which } = params;

	// return the file information
	return {
		body: {
			which,
			files: await list(which)
		}
	};
}
