import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import { mdsvex } from 'mdsvex';
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Pick up both .svelte and .svx files
	extensions: ['.svelte', '.svx'],

	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [mdsvex(), preprocess()],

	kit: {
		adapter: adapter(),
		vite: {
			optimizeDeps: {
				include: ['highlight.js/lib/core']
			},
			vite: {
				resolve: {
					alias: {
						// these are the aliases and paths to them
						$content: path.resolve('./src/content')
					}
				}
			}
		}
	}
};

export default config;
