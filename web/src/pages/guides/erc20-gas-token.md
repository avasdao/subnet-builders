---
title: Use a C-chain token for Subnet gas fees
description: Learn how to operate and secure your asset bridge, in production.
---

In this guide, we'll learn how to bridge your C-chain (ERC-20) token to your Subnet and use it to pay your transaction gas fees.

# Table of contents

- [Introduction](#introduction)
  - [Prerequisites](#prerequisites)
  - [Requirements](#requirements)
  - [Setting Up Environment Variables](#setting-up-environment-variables)
- [Getting Started](#getting-started)
  - [Building the workspace](#building-the-workspace)
  - [Creating the NFT Token](#creating-the-nft-token)
- [Contracts for the marketplace](#contracts-for-the-marketplace)
  - [Auction Contract](#auction-contract)
    - [Starting with the functions](#starting-with-the-functions)
    - [Events](#events)
    - [Storage variables](#storage-variables)
- [Gotchas](#gotchas)
- [Next steps](#next-steps)
  - [Things to look out for](#things-to-look-out-for)
- [Conclusion](#conclusion)

## Introduction

Understand how to modify the configuration of your subnet.

### Prerequisites

It is also helpful to have a basic understanding of [Solidity](https://docs.soliditylang.org/) and [Avalanche](https://docs.avax.network/).

### Requirements

__These are the requirement to follow this tutorial:__

- Add [WAGMI](https://docs.avax.network/subnets/wagmi#adding-wagmi-to-metamask) and [Fuji](https://docs.avax.network/quickstart/fuji-workflow#set-up-fuji-network-on-metamask-optional) chain on the MetaMask network
- Import wWGM token (asset) on the WAGMI network (MetaMask). Here is the address - `0x3Ee7094DADda15810F191DD6AcF7E4FFa37571e4`
- `WGM` coins on the WAGMI chain. Drip `1 WGM` from the [WAGMI Faucet](https://faucet.trywagmi.xyz/).
- `AVAX` coins on the Fuji chain. Drip `10 AVAX` from the [Fuji Faucet](https://faucet.avax.network/)
- Wrapped `WGM` tokens on the WAGMI chain. Send a few `WGM` coins to the `wWGM` token address (see 2nd point), to receive the same amount of `wWGM`. Always keep some `WGM` coins, to cover transaction fees.

### Setting Up Environment Variables

Let's set up environment variables, so that, we do not need to write their values every time we issue a command. Move back to the deploy-bridge directory (main project directory) and make a new file configVars. Put the following contents inside it -

```bash
SRC_GATEWAY=https://subnets.avax.network/wagmi/wagmi-chain-testnet/rpc
DST_GATEWAY=https://api.avax-test.network/ext/bc/C/rpc

SRC_ADDR="<Your address on WAGMI>"
SRC_PK="<your private key on WAGMI>"
DST_ADDR="<Your address on Fuji>"
DST_PK="<your private key on Fuji>"

SRC_TOKEN="0x3Ee7094DADda15810F191DD6AcF7E4FFa37571e4"
RESOURCE_ID="0x00"
```

- `SRC_ADDR` and `DST_ADDR` are the addresses that will deploy bridge contracts and will act as a relayer.
- `SRC_TOKEN` is the token that we want to bridge. Here is the address of the wrapped ERC20 version of the WGM coin aka wWGM.
- `RESOURCE_ID` could be anything. It identifies our bridged ERC20 tokens on both sides (WAGMI and Fuji).

## Getting Started

You will find your genesis file at:

## Conclusion

That’s it! That’s the entire implementation of a Virtual Machine which defines a blockchain-based timestamp server.

### In this tutorial we learned

- The `snowman.ChainVM` interface, which all Virtual Machines that define a linear chain must implement
- The `snowman.Block` interface, which all blocks that are part of a linear chain must implement
- The `core.SnowmanVM` and core.Block library types, which make defining Virtual Machines faster

If you had any difficulties following this tutorial or simply want to discuss Avalanche tech with us you can join our community today!

## Conclusion

Similar to the above process, you can deploy a bridge between any 2 EVM-based chains. We have used the command-line tool to make approvals and deposits. This can be further extended to build a frontend integrated with the bridge. Currently, it depends on a single relayer, which is not secure. We need a large set of relayers and a high threshold to avoid any kind of centralization.
