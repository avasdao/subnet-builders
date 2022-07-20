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
                href: '/subnets-101'
            },
            {
                title: 'My Subnet Manager',
                href: '/my-subnet'
            },
            {
                title: 'Playground',
                href: '/playground'
            },
            {
                title: 'Marketplace',
                href: '/marketplace'
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
                title: 'Asset bridge security',
                href: '/guides/bridge-security',
            },
            {
                title: 'Use a C-chain token for Subnet gas fees',
                href: '/guides/erc20-gas-token',
            },
            {
                title: 'Initial Subnet Offering (ISO)',
                href: '/guides/iso',
            },
            {
                title: 'Extending the EVM',
                href: '/guides/extending-the-evm',
            },
            {
                title: 'Using the BlobVM for metadata and graphic data storage',
                href: '/guides/using-blobvm',
            },
        ],
    },
    {
        title: 'Precompiled Contracts',
        links: [
            {
                title: 'Introduction',
                href: '/precompiles/intro',
            },
            {
                title: 'Adding a stateful precompiled contract to a Subnet',
                href: '/precompiles/add-precompile',
            },
            {
                title: '0x539 - Confidential assets',
                href: '/precompiles/confidential-assets',
            },
            {
                title: '0x53A - Introspection',
                href: '/precompiles/introspection',
            },
            {
                title: '0x53B - Verifiable Random Function (VRF)',
                href: '/precompiles/vrf',
            },
            {
                title: '0x53C - Storage gateway',
                href: '/precompiles/storage-gateway',
            },
            {
                title: '0x53D - Cross-chain asset bridge',
                href: '/precompiles/asset-bridge',
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
        title: 'Additional Resources',
        links: [
            {
                title: 'FAQ',
                href: '/faq'
            },
            {
                title: 'Glossary',
                href: '/glossary'
            },
            {
                title: '$SUBS Token',
                href: '/subs'
            },
            {
                title: 'Contributing',
                href: '/contributing'
            },
            {
                title: 'Code of conduct',
                href: '/coc'
            },
            {
                title: 'Connect with us',
                href: '/contact'
            },
        ],
    },
    {
        title: 'Crowdfunding',
        links: [
            {
                title: 'Subnet Builders MVP',
                href: '/funding/mvp'
            },
            {
                title: 'My Subnet Manager MVP',
                href: '/funding/mysubnet-mvp'
            },
            {
                title: 'Playground MVP',
                href: '/funding/playground-mvp'
            },
            {
                title: 'Marketplace MVP',
                href: '/funding/marketplace-mvp'
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
