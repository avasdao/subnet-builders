---
title: Local Environment Setup
description: Step by step tutorial to build your own NFT marketplace on Avalanche using Hardhat and React.
---

Step by step tutorial to build your own NFT marketplace on Avalanche using Hardhat and React.

# Table of contents

- [Introduction](#introduction)
  - [Prerequisites](#prerequisites)
  - [Requirements](#requirements)
- [Getting Started](#getting-started)
  - [Downloading needed packages](#downloading-needed-packages)
  - [Installation procedures](#installation-procedures)
- [A simple "hello world" local Subnet deployment](#a-simple-hello-world-local-subnet-deployment)
  - [Troubleshoot common issues](#auction-contract)
    - [Connecting](#starting-with-the-functions)
    - [Missing libraries](#events)
  - [Add node Validators to the Subnet](#contracts-for-the-marketplace)
  - [Access funded accounts](#contracts-for-the-marketplace)
  - [Deploy smart contracts](#contracts-for-the-marketplace)
  - [Interact with contracts](#contracts-for-the-marketplace)
- [Next steps](#next-steps)
  - [Experiment with different customization](#tests)
    - [Creating](#things-to-consider)
    - [Tearing down](#things-to-consider)
    - [Recreating](#things-to-consider)
- [Conclusion](#conclusion)

## Introduction

Understand how to modify the configuration of your subnet.

### Prerequisites

...

### Requirements

...

## Getting Started

Step-by-step procedure for getting setup quickly and easily.

Installation is quick and easy.

## Install the Avalanche CLI

```bash
curl -sSfL \
https://raw.githubusercontent.com/ava-labs/avalanche-cli/main/scripts/install.sh \
| sh -s -- -b <relative directory>
```

### Example Response

```bash
ava-labs/avalanche-cli info checking GitHub for latest tag
ava-labs/avalanche-cli info found version: 0.1.3 for linux/amd64
ava-labs/avalanche-cli info installed ./bin/avalanche
```

## A simple "hello world" local Subnet deployment

```bash
export SUBNET_NAME="Awesome_Indie_Game"
export SUBNET_CHAIN="fuji"
export SUBNET_TOKEN_SYMBOL="AIG"
export SUBNET_TOKEN_SUPPLY="21000000"
export SUBNET_TOKEN_DECIMALS="18"
```

### Build & deploy

```bash
avalanche subnet create $SUBNET_NAME && \
avalanche subnet deploy $SUBNET_NAME
```

### Select your type of Virtual Machine (VM)

```bash
Use the arrow keys to navigate: ↓ ↑ → ←
? Choose your VM:
  ▸ SubnetEVM
    Custom
```

#### Choose a chain id:

```bash
Enter your subnet's ChainId. It can be any positive integer.
✗ ChainId: █
```

Select a symbol for your token:

```bash
Select a symbol for your subnet's native token
✗ Token symbol: █
```

Set your fees:

```bash
Use the arrow keys to navigate: ↓ ↑ → ←
? How would you like to set fees:
  ▸ Low disk use    / Low Throughput    1.5 mil gas/s (C-Chain's setting)
    Medium disk use / Medium Throughput 2 mil   gas/s
    High disk use   / High Throughput   5 mil   gas/s
    Customize fee config
    Go back to previous step
```

Select you initial coin distribution:

```bash
Use the arrow keys to navigate: ↓ ↑ → ←
? How would you like to distribute funds:
  ▸ Airdrop 1 million tokens to the default address (do not use in production)
    Customize your airdrop
    Go back to previous step
```

Another:

```bash
Use the arrow keys to navigate: ↓ ↑ → ←
? Advanced: Would you like to add a custom precompile to modify the EVM?:
  ▸ No
    Yes
    Go back to previous step
```

Done!

```bash
Successfully created genesis
```

## Conclusion

That’s it! That’s the entire implementation of a Virtual Machine which defines a blockchain-based timestamp server.

### In this tutorial we learned

- The `snowman.ChainVM` interface, which all Virtual Machines that define a linear chain must implement
- The `snowman.Block` interface, which all blocks that are part of a linear chain must implement
- The `core.SnowmanVM` and core.Block library types, which make defining Virtual Machines faster

If you had any difficulties following this tutorial or simply want to discuss Avalanche tech with us you can join our community today!
