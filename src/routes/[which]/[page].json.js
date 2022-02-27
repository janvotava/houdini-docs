import path from 'path';

export async function get({ params }) {
	// load the files and their meta data
	const files = await Promise.all(
		Object.entries(import.meta.glob(`../../content/**/*.svx`)).map(async ([key, mod]) => {
			const { metadata, default: module } = await mod();

			const fileName = path.basename(key);

			return {
				filepath: key,
				metadata,
				module,
				slug: fileName.substring(fileName.indexOf('_') + 1, fileName.indexOf('.'))
			};
		})
	);

	const file = files.find(
		(file) => file.filepath.startsWith(`../../content/${params.which}`) && file.slug === params.page
	);

	if (!file) {
		return {
			error: 'could not find file'
		};
	}

	return {
		body: {
			content: file.module.render().html
		}
	};
}
