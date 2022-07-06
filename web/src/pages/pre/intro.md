---
title: Introduction
description: Learn about precompiled contracts
---

On top of having a set of opcodes to choose from, the EVM also offers a set of more advanced functionalities through precompiled contracts. These are a special kind of contracts that are bundled with the EVM at fixed addresses, and can be called with a determined gas cost.

{% callout title="Did you know?" %}
Precompiles are used to implement cryptographic operations and other functions that would be difficult and inefficient to implement with Solidity.
{% /callout %}

Subnet EVM can provide custom functionalities with precompiled contracts. These precompiled contracts can be activated through `ChainConfig` (in genesis or as an upgrade).

{% callout title="Did you know?" %}
The precompiled addresses start from 1 `0x0000...0001`, and increment for each new contract.
{% /callout %}

Ava's DAO will introduce several precompiled contracts to the EVM subnets running on top of Avalanche, which will enable more efficient smart contracts.

---

## Existing Precompiled Contracts

0x01 - Recovery of ECDSA signature  
0x02 - Hash function SHA256  
0x03 - Hash function RIPEMD160  
0x04 - Identity  
0x05 - Modular exponentiation ([EIP 198](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-198.md))  
0x06 - Addition on elliptic curve alt_bn128 ([EIP 196](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-196.md))  
0x07 - Scalar multiplication on elliptic curve alt_bn128 ([EIP 196](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-196.md))  
0x08 - Checking a pairing equation on curve alt_bn128 ([EIP 197](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-197.md))  
0x09 - BLAKE2b hash function ([EIP 152](https://eips.ethereum.org/EIPS/eip-152))

_* A definitive list and specification is the Ethereum [Yellow Paper](https://github.com/ethereum/yellowpaper)._

#### The team at Ava's DAO aims to additionally implement precompiled contracts from `0x539` through `0x53B` to support new products &amp; services coming to Ava's web &amp; mobile dApps.

---

## Ava's Contract Proposals

Our team aims to introduce several new precompiled contracts for consideration by the Ava Labs team for inclusion in the "Official" Precompiles Registry.

### 0x539 - Confidential Assets

This will reside at `0x539`, and perform privacy protection for sensitive assets and data, taking as input, in order:
- length of the base
- length of the exponent
- length of the modulus
- the base itself (b above)
- the exponent itself (e)
- the modulus (m)

[Click here for more info..](confidential-assets)


### 0x53A - Introspection

This will reside at `0x53A`, and enable EVM queries from within contracts.

[Click here for more info..](introspection)

### 0x53B - Storage Gateway

This will reside at `0x53B`, and provide a bridge to the requested storage network, taking as input, in order:
- __CID__ [`uint`] _(content identifier)_
- __Network__ [`string`] _(ie. IPFS, AWS, Dropbox etc)_
- __IsClustered__ [`bool`] _(default is 2-of-3 nodes)_

```js
/**
 * Call Storage
 *
 * User specifies a data identifier and network to query. Validators will
 * connect to the respective network and retrieve the data.
 */
function callStorage(
    uint32 _cid,
    bytes8 memory _network,
    bool _isClustered,
) public view returns (bytes32[2] memory) {
    bytes32[2] memory output;

    bytes memory args = abi.encodePacked(rounds, h[0], h[1], m[0], m[1], m[2], m[3], t[0], t[1], f);

    assembly {
        if iszero(staticcall(not(0), 0x09, add(args, 32), 0xd5, output, 0x40)) {
            revert(0, 0)
        }
    }

    return output;
}
```

[Click here for more info..](storage-gateway)

{% callout title="Use Case" %}
dApp builders will have the ability to integrate with the hundreds of NFT projects currently utilizing IPFS for their storage needs directly from within their smart contracts.
{% /callout %}

We expect this to be a big deal for dApps that require lots of storage space, eg. NFT galleries.
