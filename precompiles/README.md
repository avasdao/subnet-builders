# Precompiled Contracts

On top of having a set of opcodes to choose from, the EVM also offers a set of more advanced functionalities through precompiled contracts. These are a special kind of contracts that are bundled with the EVM at fixed addresses, and can be called with a determined gas cost.

Subnet EVM can provide custom functionalities with precompiled contracts. These precompiled contracts can be activated through `ChainConfig` (in genesis or as an upgrade). Ava's DAO will introduce several precompiled contracts to the EVM subnets running on top of Avalanche, which will enable more efficient smart contracts.

{% callout title="Did you know?" %}
The precompiled addresses start from 1 `0x0000...0001`, and increment for each new contract.
{% /callout %}

---

## What are precompiled contracts?

Please note that the numbering is also the address of the contract, eg. `ECRECOVER` is located at
`0x0000000000000000000000000000000000000001`

1. Recovery of ECDSA signature
2. Hash function SHA256
3. Hash function RIPEMD160
4. Identity
5. Modular exponentiation ([EIP 198](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-198.md))
6. Addition on elliptic curve alt_bn128 ([EIP 196](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-196.md))
7. Scalar multiplication on elliptic curve alt_bn128 ([EIP 196](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-196.md))
8. Checking a pairing equation on curve alt_bn128 ([EIP 197](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-197.md))
9. BLAKE2b hash function ([EIP 152](https://eips.ethereum.org/EIPS/eip-152))

A definitive list and specification is the Ethereum [Yellow Paper](https://github.com/ethereum/yellowpaper).

## Contract Proposals

We aim to introduce several new precompiled contracts for consideration by the Ava Labs team.

### Confidential Assets - 0x10

This will reside at `0x10`, and perform privacy protection for sensitive assets and data, taking as input, in order:
- length of the base
- length of the exponent
- length of the modulus
- the base itself (b above)
- the exponent itself (e)
- the modulus (m)

### Introspection - 0x11

This will reside at `0x11`, and enable EVM queries from within contracts.

### IPFS Gateway - 0x12

This will reside at `0x12`, and provide a bridge to the IPFS network.

We expect this to be a big deal for dApps that require lots of storage space, eg. NFT galleries.
