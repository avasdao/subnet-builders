# Customizing Your Genesis File

Understand how to modify the configuration of your subnet.

You will find your genesis file at:

`$HOME/.avalanche-cli/<subnet-name>_genesis.json`

along with another file:

`$HOME/.avalanche-cli/<subnet-name>_sidecar.json`

and finally a `/logs` folder:

`$HOME/.avalanche-cli/logs/avalanche.log`

sample output

```
[07-05|13:40:00.217] INFO ux/output.go:32 creating subnet HomemadeCrypto
[07-05|13:40:00.218] INFO ux/output.go:32 Enter your subnet's ChainId. It can be any positive integer.
[07-05|13:40:03.078] INFO ux/output.go:32 Select a symbol for your subnet's native token
[07-05|13:40:06.979] INFO ux/output.go:32 Successfully created genesis
```



```
{
    "config": {
        "chainId": 13370,
        "homesteadBlock": 0,
        "eip150Block": 0,
        "eip150Hash": "0x2086799aeebeae135c246c65021c82b4e15a2c451340993aacfd2751886514f0",
        "eip155Block": 0,
        "eip158Block": 0,
        "byzantiumBlock": 0,
        "constantinopleBlock": 0,
        "petersburgBlock": 0,
        "istanbulBlock": 0,
        "muirGlacierBlock": 0,
        "subnetEVMTimestamp": 0,
        "feeConfig": {
            "gasLimit": 8000000,
            "targetBlockRate": 2,
            "minBaseFee": 25000000000,
            "targetGas": 15000000,
            "baseFeeChangeDenominator": 36,
            "minBlockGasCost": 0,
            "maxBlockGasCost": 1000000,
            "blockGasCostStep": 200000
        },
        "contractDeployerAllowListConfig": {
            "blockTimestamp": null,
            "adminAddresses": null
        },
        "contractNativeMinterConfig": {
            "blockTimestamp": null,
            "adminAddresses": null
        },
        "txAllowListConfig": {
            "blockTimestamp": null,
            "adminAddresses": null
        }
    },
    "nonce": "0x0",
    "timestamp": "0x0",
    "extraData": "0x",
    "gasLimit": "0x7a1200",
    "difficulty": "0x0",
    "mixHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "coinbase": "0x0000000000000000000000000000000000000000",
    "alloc": {
        "8db97c7cece249c2b98bdc0226cc4c2a57bf52fc": {
            "balance": "0xd3c21bcecceda1000000"
        }
    },
    "airdropHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "airdropAmount": null,
    "number": "0x0",
    "gasUsed": "0x0",
    "parentHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "baseFeePerGas": null
}
```

## Let's break down each parameter

### chainId

This is a UNIQUE (integer) identifier for the subnet.
