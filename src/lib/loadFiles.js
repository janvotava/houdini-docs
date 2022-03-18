import path from 'path'
import fs from 'fs/promises'
import { compile } from 'mdsvex'

// grab the list of files
export async function loadFiles() {
	// the root directory
	const routeDir = path.resolve('src', 'routes')

	// build up an object from every directory in the routeDir
	const categories = Object.fromEntries(
		(
			await Promise.all(
				(
					await fs.readdir(routeDir)
				).map(async (category) => {
					const categoryDir = path.join(routeDir, category)
					// if the path is not a directory, ignore it
					if (!(await fs.lstat(categoryDir)).isDirectory()) {
						return null
					}

					/** @type {{ length: number; [key: number]: any }} */
					const list = { length: 0 }

					// look at every file in the category directory
					for (const file of await fs.readdir(categoryDir)) {
						// the file's path
						const filepath = path.join(categoryDir, file)

						// open the contents of the file so we can extract the frontmatter
						const { data } = await compile(await fs.readFile(filepath, 'utf-8'))
						/** @type { { [key: string]: any }} */
						const metadata = data.fm

						const fileName = file.split('.')[0]

						list[metadata.index] = {
							title: metadata.title,
							slug: `/${category}/${fileName}`,
							filepath
						}
					}

					// give it the appropriate length value
					list.length = Object.keys(list).length - 1

					return [category, Array.from(list)]
				})
			)
		).filter(Boolean)
	)

	// transform the keys of an object
	return Object.fromEntries(
		['intro', 'guides', 'api'].map((category) => {
			const files = categories[category]

			return [
				category,
				{
					files: files.map((file, i) => ({
						...file,
						previous: files[i - 1],
						next: files[i + 1]
					})),
					name:
						{
							intro: 'Introduction',
							guides: 'Guides',
							api: 'API'
						}[category] || category,
					index: files[0]
				}
			]
		})
	)
}
