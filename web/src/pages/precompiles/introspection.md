---
title: Precompiled Introspection
description: Retrieve ANY information required about a block.
---

This precompiled introspection exists at contract address:

This will allow developers to save and retrieve content to and from IPFS.

Creates proofs and allows Avalanche to interact with a decentralized storage system that can hold a bigger data load that the on-chain.

`0x53A`

## All-NEW EVM Benefits

1. Verify Merkle proofs inside the EVM, about the chain itself.
2. Consume Logs in the EVM.
3. Perform conditional execution upon history.
4. Verify `calldata` for Rollups.

## Request Methods

### Block

- getBlockHeader — `[number: uint256]`
- getBlock — `[number: uint256]`
- getBlockByHash — `[hash: bytes32]`
- getFromBlock — `[number: uint256], [field: string]`
- getTxsFromBlock — `[number: uint256]`

### Transactions

- getTransaction — `[blockNumber: uint256], [txIndex: uint256]`
- getTransactionByHash — `[hash: bytes32]`
- getFromTransaction — `[blockNumber: uint256], [txIndex: uint256], [field: string]`

### Receipt

- getReceiptsFromBlock — `[number: uint256]`
- getTransactionReceipt — `[hash: bytes32]`

```js
/**
 * Get Data
 *
 * Allows a user/contract to request any data from the EVM,
 * eg. block * information.
 */
function GetData(
	address sender,
	bytes32 msgHash,
	bytes sigs
) public returns (bool) {
	require(sigs.length % 65 == 0);

	bytes memory data = new bytes(20+32+sigs.length);

	uint idx = 0;

	uint i;

	for (i = 0; i < 20; i++) {
		data[idx++] = (bytes20)(sender)[i];
	}

	for (i = 0; i < 32; i++ ) {
		data[idx++] = msgHash[i];
	}

	for (i = 0; i < sigs.length; i++) {
		data[idx++] = sigs[i];
	}

	assembly {
		// skip length header.
		let ptr := add(data, 0x20)
		if iszero(call(gas, 0x3ff, 0, ptr, idx, 31, 1)) {
		  invalid()
		}
		return(0, 32)
	}
}
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

```bash
uint256[2] memory inputToPrecompile;
input[0] = somePreviouslyStoredValue;
input[1] = someOtherPreviouslyStoredValue;
```

This is, in fact, exactly what we’re doing with the first four lines in `ecmul`. We are pushing the values `ax`, `ay`, and `k` to the top of the virtual stack. The precompile is then immediately called, by invoking the address where the code necessary to perform a `bn256ScalarMul` operation is sat. Looking at the next section of code, we see:

```asm
assembly {
   if iszero(staticcall(gas, 0x07, input, 0x60, p, 0x40)) {
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

And that’s it!
The return value of the function `ecmul` will now be the return value of the `bn256ScalarMul` precompile!
