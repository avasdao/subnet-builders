---
title: Leet Suite Collection (0x0539)
description: A curated collection of Six (6) best-in-class Precompile contracts for Avalanche Subnets.
---

A curated collection of __Six (6)__ best-in-class Precompile contracts for Avalanche Subnets.

# Table of contents

- [Introduction](#introduction)
  - [Prerequisites](#prerequisites)
  - [Requirements](#requirements)
- [Getting Started](#getting-started)
  - [Customizing your Subnet](#customizing-your-subnet)
  - [Setting up your Bridge manager](#setting-up-your-bridge-manager)
  - [Handling Bridge security](#handling-bridge-security)
- [Subnet-to-Subnet Bridges](#subnet-to-subnet-bridges)
- [Subnet-to-external-Network Bridges](#subnet-to-external-network-bridges)
- [Gotchas](#gotchas)
- [Next steps](#next-steps)
  - [Things to look out for](#things-to-look-out-for)
- [Conclusion](#conclusion)

## Introduction

Leet Suite (LS) is a collection of __Six (6)__ best-in-class Precompile contracts designed specifically for use on Avalanche Subnets.

### Prerequisites

To get the most out of this tutorial, you will need to have a basic understanding of:

- General understanding of the [__Remix IDE__](http://remix.ethereum.org/)  
_How to write and deploy a Solidity smart contract_
- General understanding of the [__Solidity language__](https://docs.soliditylang.org/)
- General understanding of [__Precompiles__](https://docs.avax.network/subnets/customize-a-subnet#precompiles)

To get started with these topics or for a comprehensive review, see the [Recommended Resources](#recommended-resources) to learn more.

### Requirements

- Ubuntu
- Metamask wallet

## Getting Started

TBD

```
0x053900000000...0000000000000000 - Cross-chain Asset Bridge
0x053900000000...0000000000000001 - Storage Gateway
0x053900000000...0000000000000002 - Introspection
0x053900000000...0000000000000003 - EOA assist
0x053900000000...0000000000000004 - Verifiable Random Function (VRF)
0x053900000000...0000000000000005 - Confidential assets
```

### Et pariatur ab quas

Sit commodi iste iure molestias qui amet voluptatem sed quaerat. Nostrum aut pariatur. Sint ipsa praesentium dolor error cumque velit tenetur quaerat exercitationem. Consequatur et cum atque mollitia qui quia necessitatibus.

```js
/** @type {import('@tailwindlabs/lorem').ipsum} */
export default {
  lorem: 'ipsum',
  dolor: ['sit', 'amet', 'consectetur'],
  adipiscing: {
    elit: true,
  },
}
```

Possimus saepe veritatis sint nobis et quam eos. Architecto consequatur odit perferendis fuga eveniet possimus rerum cumque. Ea deleniti voluptatum deserunt voluptatibus ut non iste. Provident nam asperiores vel laboriosam omnis ducimus enim nesciunt quaerat. Minus tempora cupiditate est quod.

### Natus aspernatur iste

Sit commodi iste iure molestias qui amet voluptatem sed quaerat. Nostrum aut pariatur. Sint ipsa praesentium dolor error cumque velit tenetur quaerat exercitationem. Consequatur et cum atque mollitia qui quia necessitatibus.

{% callout type="warning" title="Oh no! Something bad happened!" %}
This is what a disclaimer message looks like. You might want to include inline `code` in it. Or maybe you’ll want to include a [link](/) in it. I don’t think we should get too carried away with other scenarios like lists or tables — that would be silly.
{% /callout %}

Possimus saepe veritatis sint nobis et quam eos. Architecto consequatur odit perferendis fuga eveniet possimus rerum cumque. Ea deleniti voluptatum deserunt voluptatibus ut non iste. Provident nam asperiores vel laboriosam omnis ducimus enim nesciunt quaerat. Minus tempora cupiditate est quod.

{% callout title="You should know!" %}
This is what a disclaimer message looks like. You might want to include inline `code` in it. Or maybe you’ll want to include a [link](/) in it. I don’t think we should get too carried away with other scenarios like lists or tables — that would be silly.
{% /callout %}

---

Voluptas beatae omnis omnis voluptas. Cum architecto ab sit ad eaque quas quia distinctio. Molestiae aperiam qui quis deleniti soluta quia qui. Dolores nostrum blanditiis libero optio id. Mollitia ad et asperiores quas saepe alias.

## Conclusion

That’s it!

There are countless decentralized applications that can utilize the convenience of external storage providers directly connected to their contracts.

### In this tutorial we learned

- The `snowman.ChainVM` interface, which all Virtual Machines that define a linear chain must implement
- The `snowman.Block` interface, which all blocks that are part of a linear chain must implement
- The `core.SnowmanVM` and core.Block library types, which make defining Virtual Machines faster

If you had any difficulties following this tutorial or simply want to discuss Avalanche tech with us you can join our community today!

### Troubleshooting

There are still issues that need to be solved, related to:

1. Contract permissions
2. Data availability
2. Pinning
3. Data expiration

#### Contract permissions

It's important that you call either `setAdmin` OR `setEnabled` with your contract address, otherwise, your `mintNativeCoin` transaction will get rejected.

## What's Next?

Don't stop here! Let's move on to bigger and better things.

### Recommended use-cases

1. NFT artwork storage
2. Data archives
3. Rich-media (ie. photos &amp; videos)
4. other

### Recommended resources

- [Developer Documents](http://docs.avax.network/)  
  _Tap into the official Avalanche documentation_
- [Discord](http://chat.avax.network/)  
  _Join the official Avalanche Discord_
- [Support](http://support.avax.network/)
- [Github](https://github.com/ava-labs/subnet-evm)
- [Subnets as a Scaling solution](https://research.thetie.io/subnets/)
- [A Comparison of Heterogeneous Blockchain Networks](https://medium.com/@arikan/a-comparison-of-heterogeneous-blockchain-networks-4bf7ff2fe279)
- [DFK Subnet](https://twitter.com/_patrickogrady/status/1509683314017275919)
