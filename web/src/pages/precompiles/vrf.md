---
title: On-chain Verification of Verifiable Random Function (VRF)
description: This precompiled contract can verify VRFs (Verifiable Random Functions).
---

This precompiled contract can verify VRFs (Verifiable Random Functions).

# Table of contents

- [Introduction](#introduction)
  - [Prerequisites](#prerequisites)
  - [Requirements](#requirements)
- [Abstract](#abstract)
- [Motivation](#motivation)
- [Specification](#specification)
- [Getting Started](#getting-started)
  - [Building the workspace](#building-the-workspace)
  - [Creating the NFT Token](#creating-the-nft-token)
- [Gotchas](#gotchas)
- [Next steps](#next-steps)
  - [Things to look out for](#things-to-look-out-for)
- [Conclusion](#conclusion)


## Introduction

This precompiled contract can verify VRFs (Verifiable Random Functions).

For each request, Avalanche VRF generates one or more random values and cryptographic proof of how those values were determined. The proof is published and verified on-chain before any consuming applications can use it. This process ensures that results cannot be tampered with or manipulated by any single entity including oracle operators, miners, users, or smart contract developers.

__Use Avalanche VRF to build reliable smart contracts for any applications that rely on unpredictable outcomes:__

- Building blockchain games and NFTs.
- Random assignment of duties and resources. For example, randomly assigning judges to cases.
- Choosing a representative sample for consensus mechanisms.

### Prerequisites

TBD

### Requirements

TBD

## Abstract

A [Verifiable Random Functions](https://tools.ietf.org/id/draft-irtf-cfrg-vrf-06.html) is the public-key version of a keyed cryptographic hash. Only the holder of the private key can compute the hash, but anyone with public key can verify the correctness of the hash. It is very hard to implmenent VRF using EVM's bytecode, since VRF needs a lot of computations on eliptic curves. So on smartBCH, we implement VRF using the native language (Golang) and expose its interface as a precompile contract, which has a predefined address: 10003.

## Motivation

Verifiable random functions are very useful in electing a random quorum in a fair way. They have been used in some blockchains, such as Algorand, VeChain and harmony.one.
If smart contracts can support VRFs, on-chain governance can also use them in electing quorems, which will benefit smartBCH's ecosystem.

## Specification

The smart contract at the address of `0x0000000000000000000000000000000000002713` can verify VRFs. It takes a byte string as input, which contains the following information:

1. Alpha (byte 0~31), this is the preimage to be hashed. Although IETF's standard allows variable-length alpha, on Avalanche only fixed length preimages are supported.
2. Public Key (byte 32~54), this is a 33-byte compress public key for the secp256k1 curve.
3. Pi (bytes 55~end), this is the proof for hashing.

It returns 32-byte output data and a status code. When Public Key and Pi are valid, the status code is 1 and the 32-byte output data is hash result of Alpha; when any of them is invalid, the status code is 0 and the output data are all zeros.

### Example usage in solidity

```js
/**
 * Verify
 *
 * Performs on-chain verification of a Verifiable Random Function (VRF).
 */
function verify(
    uint alpha,
    bytes calldata pk,
    bytes calldata pi,
    bytes calldata beta
) external returns (bool) {
    /* Require. */
    require(pk.length == 33, 'pk.length != 33');

    /* Retrieve. */
    (bool ok, bytes memory retData) = address(0x2713)
        .call(abi.encodePacked(alpha, pk, pi));

    /* Return. */
    return ok && keccak256(retData) == keccak256(beta);
}
```

## Getting Started

This will allow developers to save and retrieve content to and from IPFS.

Creates proofs and allows Avalanche to interact with a decentralized storage system that can hold a bigger data load that the on-chain.

`0x53C`

## All-NEW EVM Benefits

1. Verify Merkle proofs inside the EVM, about the chain itself.
2. Consume Logs in the EVM.
3. Perform conditional execution upon history.
4. Verify `calldata` for Rollups.

## Issues

There are still issues that need to be solved, related to:

1. Data availability
2. Pinning
3. Data expiration

### Natus aspernatur iste

Sit commodi iste iure molestias qui amet voluptatem sed quaerat. Nostrum aut pariatur. Sint ipsa praesentium dolor error cumque velit tenetur quaerat exercitationem. Consequatur et cum atque mollitia qui quia necessitatibus.

Voluptas beatae omnis omnis voluptas. Cum architecto ab sit ad eaque quas quia distinctio. Molestiae aperiam qui quis deleniti soluta quia qui. Dolores nostrum blanditiis libero optio id. Mollitia ad et asperiores quas saepe alias.

---

And that’s it!
The return value of the function `ecmul` will now be the return value of the `bn256ScalarMul` precompile!
