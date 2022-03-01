import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import { mdsvex } from 'mdsvex';
import path from 'path';
import hljs from 'highlight.js';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Pick up both .svelte and .svx files
	extensions: ['.svelte', '.svx'],

	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		mdsvex({
			highlight: {
				highlighter(str, lang) {
					let code = str;

					if (lang && hljs.getLanguage(lang)) {
						try {
							code = hljs.highlight(str.replace(/\t/g, '    '), { language: lang }).value;
						} catch (__) {}
					}

					return `<pre class="hljs" data-language="${lang}"><code class="hljs">{@html \`${code}\`}</code></pre>`;
				}
			}
		}),
		preprocess()
	],

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
