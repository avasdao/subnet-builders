---
title: Introduction
description: Learn about precompiled contracts
---

Subnet EVM can provide custom functionalities with precompiled contracts. These precompiled contracts can be activated through `ChainConfig` (in genesis or as an upgrade). Ava's DAO will introduce several precompiled contracts to the EVM subnets running on top of Avalanche, which will enable more efficient smart contracts.

> __Did you know? —__ On top of having a set of opcodes to choose from, the EVM also offers a set of more advanced functionalities through precompiled contracts. These are a special kind of contracts that are bundled with the EVM at fixed addresses, and can be called with a determined gas cost. The addresses start from 1, and increment for each contract.

---

## Precompiled contracts

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

## Quis vel iste dicta

Sit commodi iste iure molestias qui amet voluptatem sed quaerat. Nostrum aut pariatur. Sint ipsa praesentium dolor error cumque velit tenetur.

### Et pariatur ab quas

Sit commodi iste iure molestias qui amet voluptatem sed quaerat. Nostrum aut pariatur. Sint ipsa praesentium dolor error cumque velit tenetur quaerat exercitationem. Consequatur et cum atque mollitia qui quia necessitatibus.

```js
/** @type {import('@tailwindlabs/lorem').ipsum} */
export default {
  lorem: 'ipsum',
  dolor: ['sit', 'amet', 'consectetur'],
  adipiscing: {
    elit: true,
  },
}
```

Possimus saepe veritatis sint nobis et quam eos. Architecto consequatur odit perferendis fuga eveniet possimus rerum cumque. Ea deleniti voluptatum deserunt voluptatibus ut non iste. Provident nam asperiores vel laboriosam omnis ducimus enim nesciunt quaerat. Minus tempora cupiditate est quod.

### Natus aspernatur iste

Sit commodi iste iure molestias qui amet voluptatem sed quaerat. Nostrum aut pariatur. Sint ipsa praesentium dolor error cumque velit tenetur quaerat exercitationem. Consequatur et cum atque mollitia qui quia necessitatibus.

Voluptas beatae omnis omnis voluptas. Cum architecto ab sit ad eaque quas quia distinctio. Molestiae aperiam qui quis deleniti soluta quia qui. Dolores nostrum blanditiis libero optio id. Mollitia ad et asperiores quas saepe alias.
