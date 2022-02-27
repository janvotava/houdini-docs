import path from 'path';

export async function get({ params }) {
	const { which } = params;

	// load the files from the appropriate directory
	// the glob expression has to be statically analyzable so we can't just
	// interpolate which into the path
	let fileModules;
	if (which === 'tour') {
		fileModules = import.meta.glob(`../../content/tour/*.svx`);
	} else if (which === 'docs') {
		fileModules = import.meta.glob(`../../content/docs/*.svx`);
	} else if (which === 'api') {
		fileModules = import.meta.glob(`../../content/api/*.svx`);
	}

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
