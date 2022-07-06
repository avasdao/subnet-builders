# Precompiled Storage Gateway

This goal of this precompiled contract is to enable on-chain contracts the ability to save and retrieve content to and from the IPFS network. This precompiled "externally" stored gateway exists at contract address `0x53B`.

Allows Avalanche to interact with several decentralized storage systems that can hold a bigger data load that the on-chain, for example:

1. __IPFS__ — [https://ipfs.io](https://ipfs.io)
2. __AWS__ — [https://aws.amazon.com](https://aws.amazon.com)
3. __Storj__ — [https://www.storj.io](https://www.storj.io)
4. __Azure__ — [https://azure.microsoft.com/en-us/services/storage/files](https://azure.microsoft.com/en-us/services/storage/files)
5. __Sia__ — [https://sia.tech](https://sia.tech)
6. __Dropbox__ — [https://www.dropbox.com](https://www.dropbox.com)

On-chain: as a precompiled contract, in geth.

This IPFS contract becomes an oracle for information that comes from IPFS.

## Key Benefits

- Save and load information from multiple storage systems: IPFS, AWS, Storj, Azure, Sia, Dropbox and more..
- Use immutable or named (mutable) files.
- Perform caching on-chain.

## Contract Parameters

There are 3 required parameters and 1 optional available within this precompile

This will reside at `0x53B`, and provide a bridge to the requested storage network, taking as input, in order:
- __CID__ [`uint256`] _(content identifier)_
- __Network ID__ [`uint8`] _(ie. IPFS, Storj, Sia, etc)_
- __IsClustered__ [`bool`] _(default is 2-of-3 nodes)_
- __Data__ [`string`] _(content to store)_

```js
/**
 * Call Storage
 *
 * User specifies a data identifier and network to query. Validators will
 * connect to the respective network and retrieve the data.
 */
function callStorage(
    uint256 _cid,
    bytes8 memory _network,
	bool _isClustered,
    string calldata _data,
) public view returns (bytes32[2] memory) {
	/* Initialize response / output. */
	bytes32[2] memory output;

	/* Build request package. */
    bytes memory pkg = abi.encodePacked(
		_cid,
		_network,
		_isClustered,
		_data
	);

	/* Perform assembly action. */
    assembly {
        if iszero(staticcall(not(0), 0x53B, add(pkg, 32), 0xd5, output, 0x40)) {
            revert(0, 0)
        }
    }

	/* Return response / output. */
    return output;
}
```

### CID

__Content Identifier__

Type: `uint256`

This will be used to query the respective storage network for the user's requested data.

### Network ID

Type: `uint8`

Specifies which storage network to query.

### IsClustered

Type: `bool`

Will allow the request to be made to multiple nodes and validate the results before returning the data.

### Data

Type: `string`

This is the content that you wish to write to the external storage.

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

## Conclusion

Sit commodi iste iure molestias qui amet voluptatem sed quaerat. Nostrum aut pariatur. Sint ipsa praesentium dolor error cumque velit tenetur quaerat exercitationem. Consequatur et cum atque mollitia qui quia necessitatibus.

Voluptas beatae omnis omnis voluptas. Cum architecto ab sit ad eaque quas quia distinctio. Molestiae aperiam qui quis deleniti soluta quia qui. Dolores nostrum blanditiis libero optio id. Mollitia ad et asperiores quas saepe alias.
