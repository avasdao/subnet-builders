import Head from 'next/head'
import { slugifyWithCounter } from '@sindresorhus/slugify'

import { Layout } from '@/components/Layout'

import 'focus-visible'
import '@/styles/tailwind.css'

const navigation = [
    {
        title: 'Introduction',
        links: [
            {
                title: 'Getting started',
                href: '/'
            },
            {
                title: 'Subnets 101',
                href: '/docs/subnets-101'
            },
            {
                title: 'My Subnet Manager',
                href: '/docs/my-subnet'
            },
            {
                title: 'Playground',
                href: '/docs/playground'
            },
            {
                title: 'Marketplace',
                href: '/docs/marketplace'
            },
        ],
    },
    {
        title: 'Beginner Guides',
        links: [
            {
                title: 'Creating a new subnet',
                href: '/guides/creating'
            },
            {
                title: 'Customizing your genesis file',
                href: '/guides/custom-genesis',
            },
            {
                title: 'Deploying a new subnet',
                href: '/guides/deploying'
            },
            {
                title: 'Setting up your (local) development environment',
                href: '/guides/local-env-setup'
            },
            {
                title: 'Subnet management',
                href: '/guides/managing'
            },
        ],
    },
    {
        title: 'Intermediate Guides',
        links: [
            {
                title: 'Subnet optimization techniques',
                href: '/guides/optimizing'
            },
            {
                title: 'Private & permissioned subnets',
                href: '/guides/private-subnet',
            },
            {
                title: 'Understanding log files',
                href: '/guides/logs',
            },
        ],
    },
    {
        title: 'Advanced Guides',
        links: [
            {
                title: 'Bridge management',
                href: '/guides/bridge-management',
            },
            {
                title: 'How to use an ERC-20 C-chain token for Subnet gas fees',
                href: '/guides/erc20-gas-token',
            },
            {
                title: 'Initial Subnet Offering (ISO)',
                href: '/guides/iso',
            },
        ],
    },
    {
        title: 'Precompiled Contracts',
        links: [
            {
                title: 'Introduction',
                href: '/pre/intro',
            },
            {
                title: '0x539 - Confidential Assets',
                href: '/pre/confidential-assets',
            },
            {
                title: '0x53A - Introspection',
                href: '/pre/introspection',
            },
            {
                title: '0x53B - Storage Gateway',
                href: '/pre/storage-gateway',
            },
        ],
    },
    {
        title: 'API Reference (v1)',
        links: [
            {
                title: 'Introduction',
                href: '/api_v1/intro'
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
        title: 'Recommended Links',
        links: [
            {
                title: 'Subnet Show (YouTube)',
                href: 'https://www.youtube.com/channel/UCG2jVL2_XRoorkRn0j-HBBg'
            },
            {
                title: 'Using a Ledger Nano + subnet',
                href: 'https://support.avax.network/en/articles/6150237-how-to-use-a-ledger-nano-s-or-nano-x-with-avalanche'
            },
        ],
    },
    {
        title: 'Resources',
        links: [
            {
                title: 'FAQ',
                href: '/docs/faq'
            },
            {
                title: 'Glossary',
                href: '/docs/glossary'
            },
            {
                title: '$SUBS Token',
                href: '/docs/SUBS'
            },
            {
                title: 'Contributing',
                href: '/docs/contributing'
            },
            {
                title: 'Code of conduct',
                href: '/docs/conduct'
            },
            {
                title: 'Connect with us',
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
