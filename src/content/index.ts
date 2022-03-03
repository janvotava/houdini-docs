import path from 'path'

export async function listAll(): Promise<{ [which: string]: Category }> {
	// return the cached value if its been computed
	const existing = readCache()
	if (existing) {
		return existing
	}

	// this is the first time we are loading the list of pages
	// look it up and cache the value

	// load the files from the appropriate directory
	let fileModules = {
		intro: import.meta.glob('./intro/*.svx'),
		guides: import.meta.glob('./guides/*.svx'),
		api: import.meta.glob('./api/*.svx')
	}

	const files: { [category: string]: Page[] } = {}
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

	// turn the list of files into the category description
	const categories = Object.fromEntries(
		Object.entries(files).map(([key, files]) => [
			key,
			{
				index: `/${key}/${files[0].slug}`,
				pages: files
			}
		])
	)

	// save the list so we dont have to compute it again
	cacheList(categories)

	// return the files associated with the particular category
	return categories
}

export async function list(which: string): Promise<Page[]> {
	const files = await listAll()
	// return the files associated with the particular category
	return files[which].pages
}

export async function getPage(which: string, slug: string): Promise<Page> {
	return (await list(which)).find((page) => page.slug === slug)
}

type Category = {
	index: string
	pages: Page[]
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
let content: { [which: string]: Category } | null = null

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
