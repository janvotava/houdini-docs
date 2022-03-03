import path from 'path'

export async function listAll(): Promise<{ [which: string]: Page[] }> {
	// return the cached value if its been computed
	const existing = readCache()
	if (existing) {
		return existing
	}

	// this is the first time we are loading the list of pages
	// look it up and cache the value

	// load the files from the appropriate directory
	let fileModules = {
		tour: import.meta.glob('./tour/*.svx'),
		docs: import.meta.glob('./docs/*.svx'),
		api: import.meta.glob('./api/*.svx')
	}

	const files: typeof content = {}
	for (const [category, imported] of Object.entries(fileModules)) {
		files[category] = await Promise.all(
			Object.entries(imported).map(async ([filepath, module]) => {
				// look at the file meta data for the name
				const { metadata, default: mod } = await module()

				const fileName = path.basename(filepath)
				return {
					fileName,
					title: metadata.title,
					slug: fileName.substring(fileName.indexOf('_') + 1, fileName.indexOf('.')),
					content: mod.render().html
				}
			})
		)

		// sort the files by index
		files[category].sort((a, b) => {
			return a.fileName > b.fileName ? 1 : -1
		})
	}

	// add previous and next references
	for (const [category, categoryFiles] of Object.entries(files)) {
		for (const [i, file] of Object.entries(categoryFiles)) {
			const previous = categoryFiles[parseInt(i, 10) - 1]
			const next = categoryFiles[parseInt(i, 10) + 1]

			if (previous) {
				file.previous = {
					title: previous.title,
					link: `/${category}/${previous.slug}`
				}
			}

			if (next) {
				file.next = {
					title: next.title,
					link: `/${category}/${next.slug}`
				}
			}
		}
	}

	// save the list so we dont have to compute it again
	cacheList(files)

	// return the files associated with the particular category
	return files
}

export async function list(which: string): Promise<Page[]> {
	const files = await listAll()
	// return the files associated with the particular category
	return files[which]
}

export async function getPage(which: string, slug: string): Promise<Page> {
	return (await list(which)).find((page) => page.slug === slug)
}

type Page = {
	fileName: string
	title: string
	slug: string
	content: string
	previous?: {
		title: string
		link: string
	}
	next?: {
		title: string
		link: string
	}
}

// cache the list in production
let content: { [which: string]: Page[] } | null = null

// cache the list in production
function cacheList(value: typeof content) {
	// if we are disabled, dont do anything
	if (true) {
		return
	}

	content = value
}

// read the cached value
function readCache(): typeof content {
	return content
}
