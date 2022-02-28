import path from 'path';

export async function list(which: string): Promise<Page[]> {
	// return the cached value if its been computed
	const existing = readCache(which);
	if (existing) {
		return existing;
	}

	// this is the first time we are loading the list of pages
	// look it up and cache the value

	// load the files from the appropriate directory
	let fileModules = {
		tour: import.meta.glob('./tour/*.svx'),
		docs: import.meta.glob('./docs/*.svx'),
		api: import.meta.glob('./api/*.svx')
	};

	const files: typeof content = {};
	for (const [category, imported] of Object.entries(fileModules)) {
		files[category] = await Promise.all(
			Object.entries(imported).map(async ([filepath, module]) => {
				// look at the file meta data for the name
				const { metadata, default: mod } = await module();

				const fileName = path.basename(filepath);
				return {
					fileName,
					title: metadata.title,
					slug: fileName.substring(fileName.indexOf('_') + 1, fileName.indexOf('.')),
					content: mod.render().html
				};
			})
		);

		// sort the files by index
		files[category].sort((a, b) => {
			return a.fileName > b.fileName ? 1 : -1;
		});
	}

	// save the list so we dont have to compute it again
	cacheList(files);

	// return the files associated with the particular category
	return files[which];
}

export async function get(which: string, slug: string): Promise<Page> {
	return (await list(which)).find((page) => page.slug === slug);
}

type Page = {
	fileName: string;
	title: string;
	slug: string;
	content: string;
};

// cache the list in production
let content: { [which: string]: null | Page[] } = {};

// cache the list in production
function cacheList(value: typeof content) {
	// if we are disabled, dont do anything
	if (true) {
		return;
	}

	content = value;
}

// read the cached value
function readCache(which: string): null | Page[] {
	return content[which];
}
