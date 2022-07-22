---
title: Introduction
description: Learn about precompiled contracts
---

On top of having a set of opcodes to choose from, the EVM also offers a set of more advanced functionalities through precompiled contracts. These are a special kind of contracts that are bundled with the EVM at fixed addresses, and can be called with a determined gas cost.

{% callout title="Did you know?" %}
Precompiles are used to implement cryptographic operations and other functions that would be difficult and inefficient to implement with Solidity.
{% /callout %}

Subnet EVM can provide custom functionalities with precompiled contracts. These precompiled contracts can be activated through `ChainConfig` (in genesis or as an upgrade).

## Getting Started

Stateful precompiles are defined by the developers of a customized EVM, they have much greater flexibility and privileges _(which comes with great responsibility for their developers)_.

### Stateful precompiles can:

1. Modify balances
2. Read/write the storage of other contracts
3. and could even hook into external storage outside of the bounds of the EVM’s merkle trie _(NOTE: This would come with repercussions for fast sync since part of the state would be moved off of the merkle trie)_.

The only real limitation for stateful precompiles is that their execution functions must be deterministic so that every node in the network will compute the same result.

{% callout title="Did you know?" %}
The precompiled addresses start from 1 `0x0000...0001`, and increment for each new contract.
{% /callout %}

Ava's DAO will introduce several precompiled contracts to the EVM subnets running on top of Avalanche, which will enable more efficient smart contracts.

---

## Avalanche Precompiled Contracts

These are the (default) pre-defined contracts available in the C-chain.

### 0x00 — Contract Deployer Allow List

`0x0200000000000000000000000000000000000000`

### 0x01 — Contract Native Minter Config

`0x0200000000000000000000000000000000000001`

### 0x02 — Tx Allow List Config

`0x0200000000000000000000000000000000000002`

### 0x03 — Fee Manager Config

`0x0200000000000000000000000000000000000003`

---

## ETH v1 Precompiled Contracts

0x01 — Recovery of ECDSA signature  
0x02 — Hash function SHA256  
0x03 — Hash function RIPEMD160  
0x04 — Identity  
0x05 — Modular exponentiation ([EIP 198](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-198.md))  
0x06 — Addition on elliptic curve alt_bn128 ([EIP 196](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-196.md))  
0x07 — Scalar multiplication on elliptic curve alt_bn128 ([EIP 196](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-196.md))  
0x08 — Checking a pairing equation on curve alt_bn128 ([EIP 197](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-197.md))  
0x09 — BLAKE2b hash function ([EIP 152](https://eips.ethereum.org/EIPS/eip-152))

_* A definitive list and specification is the Ethereum [Yellow Paper](https://github.com/ethereum/yellowpaper)._

---

## Ava's Contract Proposals

Our team at Ava's DAO aims to additionally implement precompiled contracts from `0x539` thru `0x53B` to support all-NEW products &amp; services being introduced in Ava's web &amp; mobile dApps.

### 0x539 - Confidential Assets

This will reside at `0x539`, and perform privacy protection for sensitive assets and data, taking as input, in order:
- asset id
- asset title
- asset filename
- asset length / size
- asset description _(optional)_
- encryption key _(optional)_

[Click here for more info..](confidential-assets)

### 0x53A - Introspection

This will reside at `0x53A`, and enable EVM queries from within contracts, providing several functions:

#### Block

- getBlockHeader — `[number: uint256]`
- getBlock — `[number: uint256]`
- getBlockByHash — `[hash: bytes32]`
- getFromBlock — `[number: uint256], [field: string]`
- getTxsFromBlock — `[number: uint256]`

#### Transactions

- getTransaction — `[blockNumber: uint256], [txIndex: uint256]`
- getTransactionByHash — `[hash: bytes32]`
- getFromTransaction — `[blockNumber: uint256], [txIndex: uint256], [field: string]`

#### Receipt

- getReceiptsFromBlock — `[number: uint256]`
- getTransactionReceipt — `[hash: bytes32]`

[Click here for more info..](introspection)

### 0x53B - Storage Gateway

This will reside at `0x53B`, and provide a bridge to the requested storage network, taking as input, in order:

- __CID__ [`uint`] _(content identifier)_
- __Network__ [`string`] _(ie. IPFS, AWS, Dropbox etc)_
- __IsClustered__ [`bool`] _(default is 2-of-3 nodes)_

[Click here for more info..](storage-gateway)

{% callout title="Use Case" %}
dApp builders will have the ability to integrate with the hundreds of NFT projects currently utilizing IPFS for their storage needs directly from within their smart contracts.
{% /callout %}

We expect this to be a big deal for dApps that require lots of storage space, eg. NFT galleries.
