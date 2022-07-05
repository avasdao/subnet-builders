import Head from 'next/head'
import { slugifyWithCounter } from '@sindresorhus/slugify'

import { Layout } from '@/components/Layout'

import 'focus-visible'
import '@/styles/tailwind.css'

const navigation = [
    {
        title: 'Introduction',
        links: [
            { title: 'Getting started', href: '/' },
            { title: 'Subnets 101', href: '/guides/subnets-101' },
        ],
    },
    {
        title: 'Beginner guides (2)',
        links: [
            { title: 'Local Environment Setup', href: '/guides/understanding-caching' },
            {
                title: 'Customizing Your Genesis File',
                href: '/guides/predicting-user-behavior',
            },
        ],
    },
    {
        title: 'Intermediate guides (1)',
        links: [
            {
                title: 'Private & Permissioned Subnets',
                href: '/guides/predictive-data-generation',
            },
        ],
    },
    {
        title: 'Advanced guides (1)',
        links: [
            {
                title: 'Bridge Management',
                href: '/guides/predictive-data-generation',
            },
        ],
    },
    {
        title: 'API reference (v1)',
        links: [
            {
                title: 'Profiles',
                href: '/guides/cacheadvance-predict'
            },
            {
                title: 'Subnets',
                href: '/guides/cacheadvance-predict'
            },
            {
                title: 'Validators',
                href: '/guides/cacheadvance-predict'
            },
        ],
    },
    {
        title: 'Resources',
        links: [
            {
                title: 'Subnet Show',
                href: 'https://www.youtube.com/channel/UCG2jVL2_XRoorkRn0j-HBBg'
            },
            {
                title: 'Contributing',
                href: '/guides/how-to-contribute'
            },
            {
                title: 'FAQ',
                href: '/guides/architecture-guide'
            },
            {
                title: 'Contact Us',
                href: '/guides/design-principles'
            },
        ],
    },
]

function getNodeText(node) {
    let text = ''

    for (let child of node.children ?? []) {
        if (typeof child === 'string') {
            text += child
        }

        text += getNodeText(child)
    }

    return text
}

function collectHeadings(nodes, slugify = slugifyWithCounter()) {
    let sections = []

    for (let node of nodes) {
        if (/^h[23]$/.test(node.name)) {
            let title = getNodeText(node)

            if (title) {
                let id = slugify(title)
                node.attributes.id = id
                if (node.name === 'h3') {
                    sections[sections.length - 1].children.push({
                        ...node.attributes,
                        title,
                    })
                } else {
                    sections.push({ ...node.attributes, title, children: [] })
                }
            }
        }

        sections.push(...collectHeadings(node.children ?? [], slugify))
    }

    return sections
}

export default function App({ Component, pageProps }) {
    let title = pageProps.markdoc?.frontmatter.title

    let pageTitle =
        pageProps.markdoc?.frontmatter.pageTitle ||
        `${pageProps.markdoc?.frontmatter.title} - Docs`

    let description = pageProps.markdoc?.frontmatter.description

    let tableOfContents = pageProps.markdoc?.content
        ? collectHeadings(pageProps.markdoc.content)
        : []

    return (
        <>
            <Head>
                <title>{pageTitle}</title>
                {description && <meta name="description" content={description} />}
            </Head>

            <Layout
                navigation={navigation}
                title={title}
                tableOfContents={tableOfContents}
            >
                <Component {...pageProps} />
            </Layout>
        </>
    )
}
