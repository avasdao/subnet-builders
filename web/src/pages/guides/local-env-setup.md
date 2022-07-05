# Local Environment Setup

Step-by-step procedure for getting setup quickly and easily.

Installation is quick and easy.

## STEP 1: Install the Avalanche CLI

```bash
curl -sSfL \
https://raw.githubusercontent.com/ava-labs/avalanche-cli/main/scripts/install.sh \
| sh -s -- -b <relative directory>
```

### Example Response

```
ava-labs/avalanche-cli info checking GitHub for latest tag
ava-labs/avalanche-cli info found version: 0.1.3 for linux/amd64
ava-labs/avalanche-cli info installed ./bin/avalanche
```

## STEP 2: Configure your subnet's primary settings

```bash
export SUBNET_NAME="Awesome_Indie_Game"
export SUBNET_CHAIN="fuji"
export SUBNET_TOKEN_SYMBOL="AIG"
export SUBNET_TOKEN_SUPPLY="21000000"
export SUBNET_TOKEN_DECIMALS="18"
```

## STEP 3: Build & deploy your new subnet

```bash
avalanche subnet create $SUBNET_NAME && \
avalanche subnet deploy $SUBNET_NAME
```

### Wizard Steps

Select your type of Virtual Machine (VM):

```
Use the arrow keys to navigate: ↓ ↑ → ←
? Choose your VM:
  ▸ SubnetEVM
    Custom
```

Choose a chain id:

```
Enter your subnet's ChainId. It can be any positive integer.
✗ ChainId: █
```

Select a symbol for your token:

```
Select a symbol for your subnet's native token
✗ Token symbol: █
```

Set your fees:

```
Use the arrow keys to navigate: ↓ ↑ → ←
? How would you like to set fees:
  ▸ Low disk use    / Low Throughput    1.5 mil gas/s (C-Chain's setting)
    Medium disk use / Medium Throughput 2 mil   gas/s
    High disk use   / High Throughput   5 mil   gas/s
    Customize fee config
    Go back to previous step
```

Select you initial coin distribution:

```
Use the arrow keys to navigate: ↓ ↑ → ←
? How would you like to distribute funds:
  ▸ Airdrop 1 million tokens to the default address (do not use in production)
    Customize your airdrop
    Go back to previous step
```

Another:

```
Use the arrow keys to navigate: ↓ ↑ → ←
? Advanced: Would you like to add a custom precompile to modify the EVM?:
  ▸ No
    Yes
    Go back to previous step
```

Done!

```
Successfully created genesis
```
