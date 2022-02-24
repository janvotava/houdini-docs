<script>
    import { HighlightAuto, HighlightSvelte } from 'svelte-highlight';
    
  const heroExample = `<script>
    import { query, graphql } from '$houdini'

    const { data } = query(graphql\`
        query AllTodoItems {
            items {
                text
            }
        }
    \`)
<\/script>

{#each $data.items as item}
    <div>{item.text}</div>
{/each}
`;

    const sellingPoints = [ 
        {
        header: 'Composable',
        text: 'Your components can define what data they need to do their job by and you can mix them together however you want.',
        example: `<script>
    import { query, graphql } from '$houdini'
    import { UserAvatar } from '~/components'

    const { data } = query(graphql\`
        query AllUsers {
            users {
                ...UserAvatar
            }
        }
    \`)
<\/script>

{#each $data.users as user}
    <UserAvatar />
{/each}`,
    }, {
        header: "Performant",
        text: 'Houdini shifts what is traditionally handled by a bloated runtime into a compile step that facilitates an incredibly lean application.',
        example: heroExample,
    }, { 
        header: 'Type Safe',
        text: 'Generate TypeScript definitions for every document in your application.',
        example: `<script lang="ts">
    import { query, graphql } from '$houdini'
    import type { AllTodoItems } from '$houdini'

    const { data } = query<AllTodoItems>(graphql\`
        query AllTodoItems {
            items {
                text
            }
        }
    \`)
<\/script>

{#each $data.items as item}
    <div>{item.text}</div>
{/each}
`,
    }, { 
        header: 'Declarative',
        text: 'Updates to your application cache are made with a set of declarative fragments that the avoids surgical logic necessary to keep your application up to date.',
        example: `<script>
    import { mutation, graphql } from '$houdini'

    const addProject = mutation(graphql\`
            mutation AddProject {
                addUser(name: "houdini") { 
                    ...All_Projects_insert
                }
            }
    \`)
<\/script>

<button onClick={addProject} />`,
    }, {
        header: 'Consistent',
        text: 'The command line tool validates your documents so you can feel confident before you deploy your code.',
        example: heroExample,
    }, { 
        header: 'SvelteKit Ready',
        text: 'Automatically generated loaders let you focus on what matters: your business needs.',
        example: heroExample,
    }]

</script>


<svelte:head>
    <title>Houdini</title>
</svelte:head>

<a id="skip-nav" href="#main">
    Skip to Content
</a>

<header class="content">
    <a href="/">
        <img src="/static/images/logo.svg" alt="Houdini Logo" width="175px" />
    </a>
    <nav>
        <a href="/get-started">
            Get Started
        </a>
        <a href="/docs">
            Docs
        </a>
        <a href="/support">
            Support
        </a>
        <a href="https://www.github.com/AlecAivazis/houdini" target="_blank">
            <img src="/static/images/github.svg" alt="Github" height="20px" />
        </a>
    </nav>
</header>
<main id="main">
    <section id="hero" class="content">
        <div>
            <h1>
                The disappearing <span id="graphql-text">GraphQL</span> 
                client for the <span id="svelte-text">Svelte</span> 
                community
            </h1>
            <nav id="hero-buttons">
                <a href="/get-started" class="button-shadow">Get Started</a>
                <a href="/docs" class="button-shadow">Docs</a>
            </nav>
        </div>
        <pre class="shadow"><HighlightSvelte code={heroExample} /></pre>
    </section>
    <section id="info">
        <div id="angle"/>
        <article>
            <div id="showcase" class="content">
                {#each sellingPoints as point }
                <div class="showcase-item">
                    <div class="showcase-text">
                        <h2>{point.header}</h2> 
                        <p>
                            {point.text}
                        </p>
                    </div>
                    <pre class="showcase-example">
                        <HighlightAuto code={point.example} />
                    </pre>
                </div>
                {/each}
            </div>
        </article>
    </section>
</main>

<style>
    :global(body) {
        background-color: #F9FBFF;
        display: flex;
        flex-direction: column;
    }

    main { 
        flex-grow: 1;
        display: flex;
        flex-direction: column;
    }
    
    #skip-nav {
        border: 0;
        clip: rect(0 0 0 0);
        height: 1px;
        width: 1px;
        margin: -1px;
        padding: 0;
        overflow: hidden;
        position: absolute;
    }

    #skip-nav:focus {
        padding: 1rem;
        position: fixed;
        top: 10px;
        left: 10px;
        background: white;
        z-index: 1;
        width: auto;
        height: auto;
        clip: auto;
    }


    header { 
        height: 80px;
        position: sticky;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 15px 60px;
    }

    nav { 
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    nav a { 
        margin-left: 2rem;
    }

    .content { 
        max-width: 1100px;
        margin: 0 auto;
        width: 100%;
    }

    #hero { 
        display: flex;
        flex-direction: row;
        margin-top: 90px;
    }

    #hero div {
        width: 10px;
        flex-grow:1;
        margin-top: 24px;
    }

    #hero h1 { 
        flex-grow:1;
        font-size: 3rem;
        margin-right: 4rem;
        font-family: 'Roboto', sans-serif;
        font-weight: bold;
        line-height: 4rem;
        color: #161B22;
    }

    #hero pre { 
        width: 10px;
        flex-grow:1;
        background: #161B22;
        border-radius: 32px;
        color: white;
        height: 410px;
        font-family: 'Roboto Mono', monospace;
    }

    #graphql-text { 
        color: #E10098;
    }

    #svelte-text { 
        color: #FF3E00;
    }

    .shadow {
        box-shadow: 10px 12px 25px 3px rgba(23, 40, 102, .25);
    }

    .button-shadow {
        box-shadow: 1px 2px 25px 3px rgba(23, 40, 102, .1);
    }

    #info { 
        display: flex;
        flex-direction: column;
        margin-top: 80px;
        flex-grow:1;
    }

    #angle { 
        width: 100%;
        height: 100px;
        background: #161B22;
        clip-path: polygon(-1% 101%, 100% 0%, 100% 101%);
    }

    article { 
        flex-grow: 1;
        background: #161B22;
    }

    #hero-buttons { 
        display: flex;
        flex-direction: row;
        margin-top: 40px;
    }

    #hero-buttons a { 
        font-family: 'Roboto', sans;
        font-weight: 500;
        color: white;
        background-color: #FF3E00;
        height: 35px;
        width: 150px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 13px;
        text-decoration: none;
    }

    #showcase { 
        display: grid;
        width: 100%;
        margin-top: 75px;
        margin-bottom: 100px;
    }

    .showcase-item { 
        display: flex;
        flex-direction: row;
        margin-bottom: 100px;
    }
    
    h2 { 
        font-family: 'Roboto', sans;
        color: white;
        font-size: 40px;
        margin-bottom: 16px;
    }

    p { 
        font-family: 'Roboto', sans;
        color: white;
        font-size: 28px;
        line-height: 1.3;
    }

    .showcase-text { 
        width: 10px;
        flex-grow: 3;
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-right: 24px;
    }

    .showcase-example { 
        width: 10px;
        flex-grow: 4;
        font-size: 20px;
        font-family: 'Roboto Mono', monospace;
    }

</style>