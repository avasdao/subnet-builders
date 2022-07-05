---
title: Precompiled Introspection
description: Retrieve ANY information required about a block.
---

This precompiled introspection exists at contract address:

This will allow developers to save and retrieve content to and from IPFS.

Creates proofs and allows Avalanche to interact with a decentralized storage system that can hold a bigger data load that the on-chain.

`0x0000000000000000000000000000000000000015`

On-chain: as a precompiled contract, in geth.

This IPFS contract becomes an oracle for information that comes from IPFS.

Abilities to:

- Save and load information from IPFS
- Use immutable or named (mutable) files
- Perform caching/memoization on-chain

There are several functions available within this precompile.

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

## Quos porro ut molestiae

Sit commodi iste iure molestias qui amet voluptatem sed quaerat. Nostrum aut pariatur. Sint ipsa praesentium dolor error cumque velit tenetur.

### Voluptatem quas possimus

Sit commodi iste iure molestias qui amet voluptatem sed quaerat. Nostrum aut pariatur. Sint ipsa praesentium dolor error cumque velit tenetur quaerat exercitationem. Consequatur et cum atque mollitia qui quia necessitatibus.

Possimus saepe veritatis sint nobis et quam eos. Architecto consequatur odit perferendis fuga eveniet possimus rerum cumque. Ea deleniti voluptatum deserunt voluptatibus ut non iste. Provident nam asperiores vel laboriosam omnis ducimus enim nesciunt quaerat. Minus tempora cupiditate est quod.

### Id vitae minima

Sit commodi iste iure molestias qui amet voluptatem sed quaerat. Nostrum aut pariatur. Sint ipsa praesentium dolor error cumque velit tenetur quaerat exercitationem. Consequatur et cum atque mollitia qui quia necessitatibus.

Voluptas beatae omnis omnis voluptas. Cum architecto ab sit ad eaque quas quia distinctio. Molestiae aperiam qui quis deleniti soluta quia qui. Dolores nostrum blanditiis libero optio id. Mollitia ad et asperiores quas saepe alias.

---

## Vitae laborum maiores

Sit commodi iste iure molestias qui amet voluptatem sed quaerat. Nostrum aut pariatur. Sint ipsa praesentium dolor error cumque velit tenetur.

### Corporis exercitationem

Sit commodi iste iure molestias qui amet voluptatem sed quaerat. Nostrum aut pariatur. Sint ipsa praesentium dolor error cumque velit tenetur quaerat exercitationem. Consequatur et cum atque mollitia qui quia necessitatibus.

Possimus saepe veritatis sint nobis et quam eos. Architecto consequatur odit perferendis fuga eveniet possimus rerum cumque. Ea deleniti voluptatum deserunt voluptatibus ut non iste. Provident nam asperiores vel laboriosam omnis ducimus enim nesciunt quaerat. Minus tempora cupiditate est quod.

### Reprehenderit magni

Sit commodi iste iure molestias qui amet voluptatem sed quaerat. Nostrum aut pariatur. Sint ipsa praesentium dolor error cumque velit tenetur quaerat exercitationem. Consequatur et cum atque mollitia qui quia necessitatibus.

Voluptas beatae omnis omnis voluptas. Cum architecto ab sit ad eaque quas quia distinctio. Molestiae aperiam qui quis deleniti soluta quia qui. Dolores nostrum blanditiis libero optio id. Mollitia ad et asperiores quas saepe alias.
