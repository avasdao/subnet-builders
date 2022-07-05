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
            { title: 'Subnets 101', href: '/docs/subnets-101' },
        ],
    },
    {
        title: 'Novice guides',
        links: [
            {
                title: 'Local Environment Setup',
                href: '/guides/local-env-setup'
            },
            {
                title: 'Customizing Your Genesis File',
                href: '/guides/custom-genesis',
            },
        ],
    },
    {
        title: 'Intermediate guides',
        links: [
            {
                title: 'Private & Permissioned Subnets',
                href: '/guides/private-subnet',
            },
            {
                title: 'Understanding Log Files',
                href: '/guides/logs',
            },
        ],
    },
    {
        title: 'Advanced guides',
        links: [
            {
                title: 'Bridge Management',
                href: '/guides/bridge-management',
            },
        ],
    },
    {
        title: 'Pre-compiled contracts',
        links: [
            {
                title: 'IPFS Gateway',
                href: '/pre/ipfs-gateway',
            },
        ],
    },
    {
        title: 'API reference (v1)',
        links: [
            {
                title: 'Getting Started',
                href: '/api_v1/getting-started'
            },
            {
                title: 'Profiles',
                href: '/api_v1/profiles'
            },
            {
                title: 'Subnets',
                href: '/api_v1/subnets'
            },
            {
                title: 'Validators',
                href: '/api_v1/validators'
            },
        ],
    },
    {
        title: 'Our staff picks',
        links: [
            {
                title: 'Subnet Show (YouTube)',
                href: 'https://www.youtube.com/channel/UCG2jVL2_XRoorkRn0j-HBBg'
            },
        ],
    },
    {
        title: 'Resources',
        links: [
            {
                title: 'Contributing',
                href: '/docs/contributing'
            },
            {
                title: 'FAQ',
                href: '/docs/faq'
            },
            {
                title: 'Code of Conduct',
                href: '/docs/conduct'
            },
            {
                title: 'Connect With Us',
                href: '/docs/contact'
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
