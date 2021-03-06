import { Fragment } from 'react'
import Image from 'next/image'
import clsx from 'clsx'
import Highlight, { defaultProps } from 'prism-react-renderer'

import { ButtonLink } from '@/components/Button'
import { HeroBackground } from '@/components/HeroBackground'
import blurCyanImage from '@/images/blur-cyan.png'
import blurIndigoImage from '@/images/blur-indigo.png'

const codeLanguage = 'javascript'
const code = `# STEP 1: Install the Avalanche CLI
curl -sSfL \\
https://raw.githubusercontent.com/ava-labs/avalanche-cli/main/scripts/install.sh \\
| sh -s -- -b <relative directory>

# STEP 2: Configure your subnet's primary settings
export SUBNET_NAME="Awesome Indie Game"
export SUBNET_CHAIN="fuji"
export SUBNET_TOKEN_SYMBOL="AIG"
export SUBNET_TOKEN_SUPPLY="21000000"
export SUBNET_TOKEN_DECIMALS="18"

# STEP 3: Build & deploy your new subnet
avalanche subnet create $SUBNET_NAME && \\
avalanche subnet deploy $SUBNET_NAME`

const tabs = [
    { name: '3-Step Express Launch', isActive: true },
    { name: 'genesis.json', isActive: false },
    { name: 'other.json', isActive: false },
]

export function Hero() {
    return (
        <div className="overflow-hidden bg-slate-900 dark:-mb-32 dark:-mt-[4.5rem] dark:pb-32 dark:pt-[4.5rem] dark:lg:-mt-[4.75rem] dark:lg:pt-[4.75rem]">
            <div className="py-16 sm:px-2 lg:relative lg:py-20 lg:px-0">
                <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-y-16 gap-x-8 px-4 lg:max-w-8xl lg:grid-cols-2 lg:px-8 xl:gap-x-16 xl:px-12">
                    <div className="relative z-10 md:text-center lg:text-left">
                        <div className="absolute bottom-full right-full -mr-72 -mb-56 opacity-50">
                            <Image
                                src={blurCyanImage}
                                alt=""
                                layout="fixed"
                                width={530}
                                height={530}
                                unoptimized
                                priority
                            />
                        </div>

                        <div className="relative">
                            <h1 className="-ml-2 block bg-gradient-to-r from-indigo-200 via-sky-400 to-indigo-200 bg-clip-text font-display text-8xl text-transparent">
                                BYOB
                            </h1>

                            <h2 className="-ml-1 inline bg-gradient-to-r from-indigo-200 via-sky-400 to-indigo-200 bg-clip-text font-display text-5xl tracking-tight text-transparent">
                                Be Your Own Blockchain
                            </h2>

                            <p className="mt-5 text-3xl text-slate-400">
                                <strong className="text-yellow-200">Design &middot; Build &middot; Test &middot; Deploy &middot; Manage </strong>
                                your Avalanche subnets with a <strong className="">Free &amp; Open Source Software (FOSS)</strong> suite of advanced tools and services.
                            </p>

                            <div className="mt-8 flex space-x-8 md:justify-center lg:justify-start">
                                <ButtonLink href="/" className="px-4 text-2xl hidden">
                                    Get started
                                </ButtonLink>

                                <ButtonLink href="https://play.subnet.builders" className="px-4 text-2xl bg-pink-300 text-pink-900 hover:bg-pink-200 hover:text-pink-800">
                                    Playground
                                </ButtonLink>

                                <ButtonLink href="https://market.subnet.builders" className="px-4 text-2xl bg-indigo-300 text-indigo-900 hover:bg-indigo-200 hover:text-indigo-800">
                                    Marketplace
                                </ButtonLink>

                                <ButtonLink href="https://github.com/avasdao/subnet-builders" variant="secondary" className="px-4 text-2xl">
                                    View Source
                                </ButtonLink>
                            </div>
                        </div>
                    </div>

                    <div className="relative lg:static xl:pl-10">
                        <div className="absolute inset-x-[-50vw] -top-32 -bottom-48 [mask-image:linear-gradient(transparent,white,white)] dark:[mask-image:linear-gradient(transparent,white,transparent)] lg:left-[calc(50%+14rem)] lg:right-0 lg:-top-32 lg:-bottom-32 lg:[mask-image:none] lg:dark:[mask-image:linear-gradient(white,white,transparent)]">
                            <HeroBackground className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 lg:left-0 lg:translate-x-0 lg:-translate-y-[60%]" />
                        </div>

                        <div className="relative">
                            <div className="absolute -top-64 -right-64">
                                <Image
                                    src={blurCyanImage}
                                    alt=""
                                    layout="fixed"
                                    width={530}
                                    height={530}
                                    unoptimized
                                    priority
                                />
                            </div>

                            <div className="absolute -bottom-40 -right-44">
                                <Image
                                    src={blurIndigoImage}
                                    alt=""
                                    layout="fixed"
                                    width={567}
                                    height={567}
                                    unoptimized
                                    priority
                                />
                            </div>

                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-sky-300 via-sky-300/70 to-blue-300 opacity-10 blur-lg" />
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-sky-300 via-sky-300/70 to-blue-300 opacity-10" />
                            <div className="relative rounded-2xl bg-[#0A101F]/80 ring-1 ring-white/10 backdrop-blur">
                                <div className="absolute -top-px left-20 right-11 h-px bg-gradient-to-r from-sky-300/0 via-sky-300/70 to-sky-300/0" />
                                <div className="absolute -bottom-px left-11 right-20 h-px bg-gradient-to-r from-blue-400/0 via-blue-400 to-blue-400/0" />

                                <div className="pl-4 pt-4">
                                    <svg
                                        aria-hidden="true"
                                        className="h-2.5 w-auto stroke-slate-500/30"
                                        fill="none"
                                    >
                                        <circle cx="5" cy="5" r="4.5" />
                                        <circle cx="21" cy="5" r="4.5" />
                                        <circle cx="37" cy="5" r="4.5" />
                                    </svg>

                                    <div className="mt-4 flex space-x-2 text-xs">
                                        {tabs.map((tab) => (
                                            <div
                                                key={tab.name}
                                                className={clsx('flex h-6 rounded-full', {
                                                    'bg-gradient-to-r from-sky-400/30 via-sky-400 to-sky-400/30 p-px font-medium text-sky-300':
                                                    tab.isActive,
                                                    'text-slate-500': !tab.isActive,
                                                })}
                                            >
                                                <div
                                                    className={clsx(
                                                        'flex items-center rounded-full px-2.5',
                                                        { 'bg-slate-800': tab.isActive }
                                                    )}
                                                >
                                                    {tab.name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-6 flex items-start px-1 text-sm">
                                        <div
                                            aria-hidden="true"
                                            className="select-none border-r border-slate-300/5 pr-4 font-mono text-slate-600"
                                        >
                                            {Array.from({
                                                length: code.split('\n').length,
                                            }).map((_, index) => (
                                                <Fragment key={index}>
                                                    {(index + 1).toString().padStart(2, '0')}
                                                    <br />
                                                </Fragment>
                                            ))}
                                        </div>

                                        <Highlight
                                            {...defaultProps}
                                            code={code}
                                            language={codeLanguage}
                                            theme={undefined}
                                        >
                                            {({
                                                className,
                                                style,
                                                tokens,
                                                getLineProps,
                                                getTokenProps,
                                            }) => (
                                                <pre
                                                    className={clsx(
                                                        className,
                                                        'flex overflow-x-auto pb-6'
                                                    )}
                                                    style={style}
                                                >
                                                    <code className="px-4">
                                                        {tokens.map((line, index) => (
                                                            <div key={index} {...getLineProps({ line })}>
                                                            {line.map((token, index) => (
                                                                <span
                                                                key={index}
                                                                {...getTokenProps({ token })}
                                                            />
                                                        ))}
                                                            </div>
                                                        ))}
                                                    </code>
                                                </pre>
                                            )}
                                        </Highlight>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
