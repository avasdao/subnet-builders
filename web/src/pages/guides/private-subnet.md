---
title: Private & Permissioned Subnets
description: Step by step tutorial to build your own NFT marketplace on Avalanche using Hardhat and React.
---

Step by step tutorial to build your own NFT marketplace on Avalanche using Hardhat and React.

# Table of contents

- [Introduction](#introduction)
  - [Prerequisites](#prerequisites)
  - [Requirements](#requirements)
- [Getting Started](#getting-started)
  - [Building the workspace](#building-the-workspace)
  - [Creating the NFT Token](#creating-the-nft-token)
- [Contracts for the marketplace](#contracts-for-the-marketplace)
  - [Auction Contract](#auction-contract)
    - [Starting with the functions](#starting-with-the-functions)
    - [Events](#events)
    - [Storage variables](#storage-variables)
- [Next steps](#next-steps)
  - [Tests](#tests)
  - [Things to consider](#things-to-consider)
- [Deploying to the Avalanche Mainnet](#deploying-to-the-avalanche-mainnet)
- [Conclusion](#conclusion)

## Introduction

Understand how to modify the configuration of your subnet.

### Prerequisites

...

### Requirements

...

## Getting Started

Sometimes you would rather NOT make your subnet available to the general public. It is possible to provide parameters for a subnet. Parameters here apply to all chains in the specified subnet.

> Avalanche Subnets are public by default. It means that every node can sync and listen ongoing transactions/blocks in subnets, even they're not validating the listened subnet.

AvalancheGo looks for files specified with `{subnetID}.json` under `--subnet-config-dir` as documented [here](https://docs.avax.network/nodes/maintain/avalanchego-config-flags#subnet-configs).

## Sample config file

```json
{
  "validatorOnly": true,
  "consensusParameters": {
    "k": 25,
    "alpha": 18
  },
  "appGossipNonValidatorSize": 10
}
```

## `validatorOnly` (bool)

If true this node does not expose Subnet blockchain contents to non-validators via P2P messages. Defaults to false.

Subnet validators can choose not to publish contents of blockchains via this configuration. If a node sets validatorOnly to true, the node exchanges messages only with this Subnet's validators. Other peers will not be able to learn contents of this Subnet from this node.

> __Pro tip:__ This is a node-specific configuration. Every validator of this Subnet has to use this configuration in order to create a full private Subnet.
