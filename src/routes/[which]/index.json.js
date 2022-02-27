import path from 'path';

export async function get({ params }) {
	const { which } = params;

	// load the files from the appropriate directory
	// the glob expression has to be statically analyzable so we can't just
	// interpolate which into the path
	const fileModules =
		which === 'tour'
			? import.meta.glob(`../../content/tour/*.svx`)
			: import.meta.glob(`../../content/docs/*.svx`);

	// load every file to grab its metadata
	const files = await Promise.all(
		Object.entries(fileModules).map(async ([filepath, module]) => {
			// look at the file meta data for the name
			const { metadata } = await module();

			const fileName = path.basename(filepath);
			return {
				fileName,
				title: metadata.title,
				slug: fileName.substring(fileName.indexOf('_') + 1, fileName.indexOf('.'))
			};
		})
	);

	// sort the files by index
	files.sort((a, b) => {
		return a.fileName > b.fileName ? 1 : -1;
	});

	// return the file information
	return { body: { which, files } };
}
