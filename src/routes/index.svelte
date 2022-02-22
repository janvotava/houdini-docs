<script>
    import { HighlightSvelte } from 'svelte-highlight';
    
  const example = `<script>
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
        text: 'Your components define what data they need to do their job and you can mix them together however you want.',
    }, {
        header: "Performant",
        text: 'Houdini shifts what is traditionally handled by a bloated runtime into a compile step that facilitates an incredibly lean application.',
    }, { 
        header: 'Type Safe',
        text: 'Generate TypeScript definitions for every document in your application.',
    }, { 
        header: 'Declarative',
        text: 'Updates to your application cache are made with a set of declarative fragments that the avoids surgical logic necessary to keep your application up to date.',
    }, {
        header: 'Consistent',
        text: 'The command line tool validates your documents so you can feel confident before you deploy your code.'
    }, { 
        header: 'SvelteKit Ready',
        text: 'Automatically generated loaders let you focus on what matters: your business needs.',
    }]

</script>


<svelte:head>
    <title>Houdini</title>
</svelte:head>

<a id="skip-nav" href="#main">
    Skip to Content
</a>

<header class="content">
    <img src="/static/images/logo.svg" alt="Houdini Logo" width="175px" />
    <nav>
        <a href="/get-started">
            Get Started
        </a>
        <a href="/docs">
            Docs
        </a>
        <a href="https://www.github.com/AlecAivazis/houdini">
            <img src="/static/images/github.svg" alt="Github" height="20px" />
        </a>
    </nav>
</header>
<main id="main">
    <section id="hero" class="content">
        <p>
            The disappearing <span id="graphql-text">GraphQL</span> 
            client for the <span id="svelte-text">Svelte</span> 
            community.
        </p>
        <pre class="shadow"><HighlightSvelte code={example} /></pre>
    </section>
    <section id="below-fold">
        <div id="angle"/>
        <article>
            <div class="content">
                hello
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
        padding: 0 60px;
    }

    nav { 
        display: flex;
        flex-direction: row;
        align-items: center;;
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

    #hero p { 
        width: 10px;
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

    #below-fold { 
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

</style>