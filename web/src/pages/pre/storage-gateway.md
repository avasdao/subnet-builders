---
title: Precompiled Storage Gateway
description: Provides a gateway to externally stored data directly from within a smart contract call.
---

This goal of this precompiled contract is to enable on-chain contracts the ability to save and retrieve content to and from the IPFS network. This precompiled "externally" stored gateway exists at contract address:

__`0x53B`__

Allows Avalanche to interact with several decentralized storage systems that can hold a bigger data load that the on-chain, for example:

1. __IPFS__ — [https://ipfs.io](https://ipfs.io)
2. __AWS__ — [https://aws.amazon.com](https://aws.amazon.com)
3. __Storj__ — [https://www.storj.io](https://www.storj.io)
4. __Azure__ — [https://azure.microsoft.com/en-us/services/storage/files](https://azure.microsoft.com/en-us/services/storage/files)
5. __Sia__ — [https://sia.tech](https://sia.tech)
6. __Dropbox__ — [https://www.dropbox.com](https://www.dropbox.com)

On-chain: as a precompiled contract, in geth.

This IPFS contract becomes an oracle for information that comes from IPFS.

Abilities to:

- Save and load information from IPFS
- Use immutable or named (mutable) files
- Perform caching/memoization on-chain

There are several functions available within this precompile.

This will reside at `0x53B`, and provide a bridge to the requested storage network, taking as input, in order:
- __CID__ [`uint`] _(content identifier)_
- __Network__ [`string`] _(ie. IPFS, Storj, Sia, etc)_
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
