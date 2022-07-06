# Persistent Storage

The persistent memory associated with each address is called storage. This is a key-value store, mapping 256-bit words to 256-bit words. It cannot be enumerated from inside a contract, and contracts have no access or view of the storage associated with other addresses.

If you initialize variables as in `uint256 blah;`, this will save `blah` to storage. `uint` is an alias of `uint256`, and bytes can also be assigned on a more fine-grained level, using `uint8`, `uint16`, etc.
