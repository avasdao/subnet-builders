---
title: Precompiled IPFS Gateway
description: Provides a gateway to IPFS data directly from within a contract call.
---

This precompiled IPFS gateweay exists at contract address:

This will allow developers to save and retrieve content to and from IPFS.

Creates proofs and allows Avalanche to interact with a decentralized storage system that can hold a bigger data load that the on-chain.

`0x0000000000000000000000000000000000000016`

On-chain: as a precompiled contract, in geth.

This IPFS contract becomes an oracle for information that comes from IPFS.

Abilities to:

- Save and load information from IPFS
- Use immutable or named (mutable) files
- Perform caching/memoization on-chain

There are several functions available within this precompile.

```js
// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0

library precompiles {
	/**
	 * EC Recovery Add
	 */
	function ecadd(
		uint ax,
		uint ay,
		uint bx,
		uint by,
	) public view returns(uint[2] memory p) {
		uint[4] memory input;
		input[0] = ax;
		input[1] = ay;
		input[2] = bx;
		input[3] = by;

		/* Performs assembly operation. */
		assembly {
			if iszero(staticcall(gas, 0x06, input, 0x80, p, 0x40)) {
				revert(0,0);
			}
		}

		/* Return the calculated `p` value. */
		return p;
	}
}
```

## Save

Saves to IPFS.

## loadByCID

Retrieves data by its CID.

## loadByName

Retrieves data by its name.

## resolveName

Retrieves the CID by its name.

## createName

Saves a CID to a specific name.

---

The ABI is:

```
[
	{
		"constant": false,
		"inputs": [
			{
				"name": "_eventId",
				"type": "bytes32"
			},
			{
				"name": "_body",
				"type": "string"
			}
		],
		"name": "notify",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"payable": true,
		"stateMutability": "payable",
		"type": "fallback"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "eventId",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "body",
				"type": "string"
			}
		],
		"name": "Event",
		"type": "event"
	}
]
```

---

## Issues

There are still issues that need to be solved, related to:

1. Data availability
2. Pinning
3. Data expiration

Any chain that has a virtual machine  
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

---

We can assign variables previously stored in storage to memory in the following way:

```
uint256[2] memory inputToPrecompile;
input[0] = somePreviouslyStoredValue;
input[1] = someOtherPreviouslyStoredValue;
```

This is, in fact, exactly what we’re doing with the first four lines in `ecmul`. We are pushing the values `ax`, `ay`, and `k` to the top of the virtual stack. The precompile is then immediately called, by invoking the address where the code necessary to perform a `bn256ScalarMul` operation is sat. Looking at the next section of code, we see:

```
assembly {
   if iszero(staticcall(gas, 0x07, input, 0x60, p, 0x40)) {
       revert(0,0)
   }
 }
```

The staticcall opcode is called with the following:

```
staticcall(gasLimit, to, inputOffset, inputSize, outputOffset, outputSize)
```

We see then that, in the case of the `bn256ScalarMul`-calling code above, we are:

- Sending the amount of gas currently available to us, after subtracting 2000;
- Calling the contract at address `0x07`, which the mapping at the top tells us corresponds to bn256ScalarMul;
- Defining the input offset as `input`, as we have just declared in memory;
- Declaring the input size as `0x60`, corresponding to a value of three 256 bit words, exactly the size of an elliptic curve point and one 256 bit scalar;
- the output will be stored at value `p`; and
- the output size is `0x40`, corresponding to the elliptic curve point that will be returned to us.

And that’s it!
The return value of the function `ecmul` will now be the return value of the `bn256ScalarMul` precompile!
