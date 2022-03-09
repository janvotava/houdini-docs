import adapter from '@sveltejs/adapter-auto'
import preprocess from 'svelte-preprocess'
import { mdsvex } from 'mdsvex'
import path from 'path'
import hljs from 'highlight.js'
import hljs_svelte from 'highlightjs-svelte'

// add svelte support
hljs_svelte(hljs)

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
					let code = str

					if (lang && hljs.getLanguage(lang)) {
						try {
							code = hljs
								.highlight(str.replace(/\t/g, '    '), {
									language: lang
								})
								.value.replace(/`/g, '&#96;')
						} catch (__) {}
					}

					return `<pre class="hljs" data-language="${lang}"><code class="hljs">{@html \`${code}\`}</code></pre>`
				}
			}
		}),
		preprocess()
	],

	kit: {
		routes: () => true,
		adapter: adapter(),
		vite: {
			optimizeDeps: {
				include: ['highlight.js/lib/core']
			},
			resolve: {
				alias: {
					// these are the aliases and paths to them
					'~': path.resolve('./src')
				}
			}
		}
	}
}

// add graphql support to highlight js
hljs.registerLanguage('graphql', function (e) {
	return {
		aliases: ['gql'],
		keywords: {
			keyword:
				'query mutation subscription|10 type input schema directive interface union scalar fragment|10 enum on ...',
			literal: 'true false null'
		},
		contains: [
			e.HASH_COMMENT_MODE,
			e.QUOTE_STRING_MODE,
			e.NUMBER_MODE,
			{
				className: 'type',
				begin: '[^\\w][A-Z][a-z]',
				end: '\\W',
				excludeEnd: !0
			},
			{
				className: 'literal',
				begin: '[^\\w][A-Z][A-Z]',
				end: '\\W',
				excludeEnd: !0
			},
			{
				className: 'variable',
				begin: '\\$',
				end: '\\W',
				excludeEnd: !0
			},
			{
				className: 'keyword',
				begin: '[.]{2}',
				end: '\\.'
			},
			{
				className: 'meta',
				begin: '@',
				end: '\\W',
				excludeEnd: !0
			}
		],
		illegal: /([;<']|BEGIN)/
	}
})

export default config
