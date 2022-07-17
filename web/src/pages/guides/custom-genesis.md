---
title: Customizing Your Genesis File
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

You will find your genesis file at:

`$HOME/.avalanche-cli/<subnet-name>_genesis.json`

along with another file:

`$HOME/.avalanche-cli/<subnet-name>_sidecar.json`

and finally a `/logs` folder:

`$HOME/.avalanche-cli/logs/avalanche.log`

sample output

```
[07-05|13:40:00.217] INFO ux/output.go:32 creating subnet HomemadeCrypto
[07-05|13:40:00.218] INFO ux/output.go:32 Enter your subnet's ChainId. It can be any positive integer.
[07-05|13:40:03.078] INFO ux/output.go:32 Select a symbol for your subnet's native token
[07-05|13:40:06.979] INFO ux/output.go:32 Successfully created genesis
```



```
{
    "config": {
        "chainId": 13370,
        "homesteadBlock": 0,
        "eip150Block": 0,
        "eip150Hash": "0x2086799aeebeae135c246c65021c82b4e15a2c451340993aacfd2751886514f0",
        "eip155Block": 0,
        "eip158Block": 0,
        "byzantiumBlock": 0,
        "constantinopleBlock": 0,
        "petersburgBlock": 0,
        "istanbulBlock": 0,
        "muirGlacierBlock": 0,
        "subnetEVMTimestamp": 0,
        "feeConfig": {
            "gasLimit": 8000000,
            "targetBlockRate": 2,
            "minBaseFee": 25000000000,
            "targetGas": 15000000,
            "baseFeeChangeDenominator": 36,
            "minBlockGasCost": 0,
            "maxBlockGasCost": 1000000,
            "blockGasCostStep": 200000
        },
        "contractDeployerAllowListConfig": {
            "blockTimestamp": null,
            "adminAddresses": null
        },
        "contractNativeMinterConfig": {
            "blockTimestamp": null,
            "adminAddresses": null
        },
        "txAllowListConfig": {
            "blockTimestamp": null,
            "adminAddresses": null
        }
    },
    "nonce": "0x0",
    "timestamp": "0x0",
    "extraData": "0x",
    "gasLimit": "0x7a1200",
    "difficulty": "0x0",
    "mixHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "coinbase": "0x0000000000000000000000000000000000000000",
    "alloc": {
        "8db97c7cece249c2b98bdc0226cc4c2a57bf52fc": {
            "balance": "0xd3c21bcecceda1000000"
        }
    },
    "airdropHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "airdropAmount": null,
    "number": "0x0",
    "gasUsed": "0x0",
    "parentHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "baseFeePerGas": null
}
```

## Let's break down each parameter

### chainId

This is a UNIQUE (integer) identifier for the subnet.

# Next steps

There are a couple of things to test and consider before going any further.

## Tests

- Does the direct buy working?
- Will the auction creator be able to withdraw the token if there are no bids and the auction times out?
- Does the minimum increment working correctly?
- ...

Before deploying a contract to production, we should test every possible scenario, and it is very hard to do the test one by one on the UI. Instead, we should use [hardhat tests](https://hardhat.org/tutorial/testing-contracts.html), where we can create different scenarios and test all of them in a matter of seconds.

## Things to consider

- If the user sends more AVAX than the direct buy price, it does not get refunded.
  - Refund the extra AVAX if `msg.value` is greater than direct buy price.
- The website won't work if the user does not connect a wallet or doesn't have one.
  - To be able to call the view functions (get a list of auctions etc.) you can use a `provider`, [learn more about it here](https://docs.ethers.io/v4/api-providers.html)
- React App does not handle the error when a transaction fails.
  - When the transaction fails, maybe show a pop-up and tell the reason.
- ...

It's always good to give the user clear instructions and make them feel comfortable. You should look from a user's point of view and try to think of every possible scenario & outcome.

# Deploying to the Avalanche Mainnet

Deploying to Mainnet is the same as deploying to [Testnet](#avax-fuji-testnet); the only difference is that you have to pay real funds instead of test funds.

Again, we have to get the configurations for the Avalanche Mainnet from [here](https://docs.avax.network/build/tutorials/smart-contracts/deploy-a-smart-contract-on-avalanche-using-remix-and-metamask#avalanche-mainnet-settings) and add the network in our hardhat config file [`hardhat.config.js`](NFT-Marketplace-dApp/hardhat.config.js).

```js
networks:{
    ...
    mainnet: {
      url: "https://api.avax.network/ext/bc/C/rpc",
      chainId: 43114,
      accounts: [
        "PRIVATE_KEY",
      ],
    },
}
```

After that, we will run the deploy script just like we did when deploying to the test net.

```shell
$ npx hardhat compile # Compiles the contracts
$ npx hardhat run scripts/deploy.js --network mainnet # runs the script on the Avalanche Mainnet, "mainnet" is specified inside the hardhat config file
```

# Conclusion

You now have the basic knowledge to start your NFT Marketplace. Congrats!

Do not forget that the react app is made for the demonstration of interacting with the contracts and fetching data from them. A good marketplace would need a better design and a lot of work.

Open an issue and let me know if you have any questions.
