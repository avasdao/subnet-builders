---
title: Cross-chain Asset Bridge
description: Provides a gateway to externally stored data directly from within a smart contract call.
---

The aim of this lesson is to show you step-by-step how to deploy a cross-chain asset bridge to your local Subnet.

# Table of contents

- [Introduction](#introduction)
  - [Prerequisites](#prerequisites)
  - [Requirements](#requirements)
- [Getting Started](#getting-started)
  - [Supported Networks](#supported-networks)
  - [Installation](#installation)
- [Storage Gateway (Interface)](#storage-gateway-interface)
  - [Get Storage (Method)](#get-storage-method)
  - [Set Storage (Method)](#set-storage-method)
- [Next steps](#next-steps)
  - [Things to look out for](#things-to-look-out-for)
- [Conclusion](#conclusion)
  - [In this tutorial we learned](#in-this-tutorial-we-learned)
  - [Troubleshooting](#troubleshooting)
- [What's Next?](#whats-next)
  - [Popular use-cases](#popular-use-cases)
  - [Recommended Resources](#recommended-resources)

## Introduction

For this lesson, we will be using [__Ava's Exchange__](https://avas.exchange) (https://avas.exchange) to secure the digital asset held in the Bridge. AX has the following notable features &amp; benefits:

1. 100% __free &amp; open source__ software _(FOSS)_
2. 100% __non-custodial__
3. 100% of contracts are __fully audited__ _(WIP)_
4. __Multi-sig__ support _(using Gnosis Safes)_
5. Support is available for ALL major asset classes:
    - __ERC-20__ _(tokens)_
    - __ERC-721__ _(NFTs)_
    - __ERC-1155__ _(hybrids)_

:::info

__You should know! —__ You can use ANY compatible Bridge provider, eg.
- __ChainSafe —__ [https://chainsafe.io](https://chainsafe.io/)
- _TBD_

:::

### Prerequisites

- Docker, docker-compose
- chainbridge v1.1.1 binary (see [README]())
- cb-sol-cli (see [README]())

### Requirements

To get the most out of this tutorial, you will need to have a basic understanding of Docker, Chainlink, Javascript, Node, Solidity, and how to write dApps. If you do not yet know about these topics, see the [Recommended Resources](#recommended-resources) section at the end for links to learn more.

## Getting Started

This precomiled contract offers the following new EVM features &amp; benefits to your Subnet:

1. Contracts can read / write external data storage systems.
2. Save and load information from multiple storage systems, eg. IPFS, AWS, Storj, Azure, Sia, Dropbox and more..
3. Use immutable or named (mutable) files.
4. Perform caching on-chain.

:::info

__Did you know? —__ You can easily customize the user permissions, gas and precompiled contracts for your Subnet using the new Avalanche CLI.

:::

### Supported Networks

Allows Avalanche to interact with several decentralized storage systems that can hold a bigger data load that the on-chain, for example:

1. __IPFS__ — [https://ipfs.io](https://ipfs.io)
2. __AWS__ — [https://aws.amazon.com](https://aws.amazon.com)
3. __Storj__ — [https://www.storj.io](https://www.storj.io)
4. __Azure__ — [https://azure.microsoft.com/en-us/services/storage/files](https://azure.microsoft.com/en-us/services/storage/files)
5. __Sia__ — [https://sia.tech](https://sia.tech)
6. __Dropbox__ — [https://www.dropbox.com](https://www.dropbox.com)

On-chain: as a precompiled contract, in geth.

This IPFS contract becomes an oracle for information that comes from IPFS.

### Installation

Steps to install:

1. Download the repo -> https://github.com/ava-labs/subnet-evm/...

## Storage Gateway (Interface)

This will reside at `0x53B`, and provide a bridge to the requested storage network, taking as input, in order:

- __callStorage__ (`method`)
- __setStorage__ (`method`)

```js
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * Storage Gateway (Interface)
 *
 * This interface manages the precompile requests to the external
 * storage gateway.
 */
interface StorageGateway {
  bytes public memoryStored;

  /* Call Storage */
  function callStorage(
	uint256 _cid,
	bytes8 memory _network,
	bool _isClustered,
	string calldata _data
  ) public view returns (bytes memory);

  /* Save Storage */
  function saveStorage(
	uint256 _cid,
	bytes8 memory _network,
	bool _isClustered,
	string calldata _data
  ) public view returns (bytes memory);
}
```

### Get Storage (Method)

This will reside at `0x53B`, and provide a bridge to the requested storage network, taking as input, in order:
- __CID__ [`uint256`] _(content identifier)_
- __Network ID__ [`uint8`] _(ie. IPFS, Storj, Sia, etc)_
- __IsClustered__ [`bool`] _(default is 2-of-3 nodes)_

```js
/**
 * Get Storage
 *
 * User specifies a data identifier and network to query. Validators will
 * connect to the respective network and retrieve the data.
 */
function getStorage(
  uint256 _cid,
  bytes8 memory _network,
  bool _isClustered
) public view returns (bytes memory) {
  /* Initialize stored data holder. */
  bytes memory stored;

  /* Build request package. */
  bytes memory pkg = abi.encodePacked(
	_cid,
	_network,
	_isClustered,
  );

  /* Perform assembly action. */
  assembly {
	/* Initialize free memory. */
	let freemem := mload(0x40)

	/* Append package to memory. */
	let pkg := add(freemem, 12)

	/* Call precompiled contract. */
	// if iszero(staticcall(not(0), 0x53B, add(pkg, 32), 0xd5, stored, 0x40)) {
	if iszero(call(gas(), 0x53b, 0, 0, 0, pkg, 20)) {
	  invalid()
	}

	/* Load stored data. */
	stored := mload(freemem)
  }

  /* Return stored data. */
  return stored;
}
```

#### CID

__Content Identifier__

Type: `uint256`

This will be used to query the respective storage network for the user's requested data.

#### Network ID

Type: `uint8`

Specifies which storage network to query.

#### IsClustered

Type: `bool`

Will allow the request to be made to multiple nodes and validate the results before returning the data.

### Set Storage (Method)

This will reside at `0x53B`, and provide a bridge to the requested storage network, taking as input, in order:
- __CID__ [`uint256`] _(content identifier)_
- __Network ID__ [`uint8`] _(ie. IPFS, Storj, Sia, etc)_
- __IsClustered__ [`bool`] _(default is 2-of-3 nodes)_
- __Data__ [`string`] _(content to store)_

```js
/**
 * Set Storage
 *
 * User specifies a data identifier and network to query. Validators will
 * connect to the respective network and retrieve the data.
 */
function setStorage(
  uint256 _cid,
  bytes8 memory _network,
  bool _isClustered,
  string calldata _data
) public view returns (bytes memory) {
  /* Initialize stored data holder. */
  bytes memory stored;

  /* Build request package. */
  bytes memory pkg = abi.encodePacked(
	_cid,
	_network,
	_isClustered,
	_data
  );

  /* Perform assembly action. */
  assembly {
	/* Initialize free memory. */
	let freemem := mload(0x40)

	/* Append package to memory. */
	let pkg := add(freemem, 12)

	/* Call precompiled contract. */
	// if iszero(staticcall(not(0), 0x53B, add(pkg, 32), 0xd5, stored, 0x40)) {
	if iszero(call(gas(), 0x53b, 0, 0, 0, pkg, 20)) {
	  invalid()
	}

	/* Load stored data. */
	stored := mload(freemem)
  }

  /* Return stored data. */
  return stored;
}
```

#### CID

__Content Identifier__

Type: `uint256`

This will be used to query the respective storage network for the user's requested data.

#### Network ID

Type: `uint8`

Specifies which storage network to query.

#### IsClustered

Type: `bool`

Will allow the request to be made to multiple nodes and validate the results before returning the data.

#### Data

Type: `string`

This is the content that you wish to write to the external storage.

---

We can assign variables previously stored in storage to memory in the following way:

```bash
uint256[2] memory inputToPrecompile;
input[0] = somePreviouslyStoredValue;
input[1] = someOtherPreviouslyStoredValue;
```

This is, in fact, exactly what we’re doing with the first four lines in `ecmul`. We are pushing the values `ax`, `ay`, and `k` to the top of the virtual stack. The precompile is then immediately called, by invoking the address where the code necessary to perform a `bn256ScalarMul` operation is sat. Looking at the next section of code, we see:

```asm
assembly {
   if iszero(staticcall(gas(), 0x07, input, 0x60, p, 0x40)) {
     revert(0,0)
   }
 }
```

The staticcall opcode is called with the following:

```asm
staticcall(gasLimit, to, inputOffset, inputSize, outputOffset, outputSize)
```

We see then that, in the case of the `bn256ScalarMul`-calling code above, we are:

- Sending the amount of gas currently available to us, after subtracting 2000;
- Calling the contract at address `0x07`, which the mapping at the top tells us corresponds to bn256ScalarMul;
- Defining the input offset as `input`, as we have just declared in memory;
- Declaring the input size as `0x60`, corresponding to a value of three 256 bit words, exactly the size of an elliptic curve point and one 256 bit scalar;
- the output will be stored at value `p`; and
- the output size is `0x40`, corresponding to the elliptic curve point that will be returned to us.

__And that’s it!__
The return value of the function `ecmul` will now be the return value of the `bn256ScalarMul` precompile!

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
