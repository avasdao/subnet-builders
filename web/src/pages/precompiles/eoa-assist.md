---
title: Externally Owned Account (EOA) Assist
description: Provides assistance in efficiently completing complete contract executions.
---

Provides assistance in efficiently completing complete contract executions.

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

Understand how to modify the configuration of your subnet.

### Prerequisites

...

### Requirements

...

## Getting Started

TBD

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
