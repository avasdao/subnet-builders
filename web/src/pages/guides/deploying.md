# Deploying a Subnet

Step-by-step procedure for getting setup quickly and easily.

Installation is quick and easy.

## STEP 1: Install the Avalanche CLI

```bash
avalanche subnet deploy <subnet-name>
```

### Example Response

```
Use the arrow keys to navigate: ↓ ↑ → ←
? Choose a network to deploy on:
  ▸ Local Network
    Fuji
    Mainnet
```

then

```console
Deploying [HomemadeCrypto] to Local Network
Backend controller started, pid: 22649, output at: /root/.avalanche-cli/runs/deploy2022-07-05T14:02:41Z/avalanche-cli-backend
Installing avalanchego...
Avalanchego installation successful
VM binary does not exist locally, starting download...
.
VM ready. Trying to boot network...
Network has been booted. Wait until healthy. Please be patient, this will take some time...
...................................................................
Network ready to use. Local network node endpoints:
Endpoint at node node4 for blockchain "xhuEnYYTE7bJHkBcB33jpvtck17dw8Pq6oZY7th5N478nUGhq" with VM ID "xhuEnYYTE7bJHkBcB33jpvtck17dw8Pq6oZY7th5N478nUGhq": http://127.0.0.1:62476/ext/bc/xhuEnYYTE7bJHkBcB33jpvtck17dw8Pq6oZY7th5N478nUGhq/rpc
Endpoint at node node5 for blockchain "xhuEnYYTE7bJHkBcB33jpvtck17dw8Pq6oZY7th5N478nUGhq" with VM ID "xhuEnYYTE7bJHkBcB33jpvtck17dw8Pq6oZY7th5N478nUGhq": http://127.0.0.1:49323/ext/bc/xhuEnYYTE7bJHkBcB33jpvtck17dw8Pq6oZY7th5N478nUGhq/rpc
Endpoint at node node1 for blockchain "xhuEnYYTE7bJHkBcB33jpvtck17dw8Pq6oZY7th5N478nUGhq" with VM ID "xhuEnYYTE7bJHkBcB33jpvtck17dw8Pq6oZY7th5N478nUGhq": http://127.0.0.1:22171/ext/bc/xhuEnYYTE7bJHkBcB33jpvtck17dw8Pq6oZY7th5N478nUGhq/rpc
Endpoint at node node2 for blockchain "xhuEnYYTE7bJHkBcB33jpvtck17dw8Pq6oZY7th5N478nUGhq" with VM ID "xhuEnYYTE7bJHkBcB33jpvtck17dw8Pq6oZY7th5N478nUGhq": http://127.0.0.1:52980/ext/bc/xhuEnYYTE7bJHkBcB33jpvtck17dw8Pq6oZY7th5N478nUGhq/rpc
Endpoint at node node3 for blockchain "xhuEnYYTE7bJHkBcB33jpvtck17dw8Pq6oZY7th5N478nUGhq" with VM ID "xhuEnYYTE7bJHkBcB33jpvtck17dw8Pq6oZY7th5N478nUGhq": http://127.0.0.1:11316/ext/bc/xhuEnYYTE7bJHkBcB33jpvtck17dw8Pq6oZY7th5N478nUGhq/rpc

Metamask connection details (any node URL from above works):
RPC URL:          http://127.0.0.1:62476/ext/bc/xhuEnYYTE7bJHkBcB33jpvtck17dw8Pq6oZY7th5N478nUGhq/rpc
Funded address:   0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC with 1000000 (10^18) - private key: [hidden]
Network name:     HomemadeCrypto
Chain ID:         13370
Currency Symbol:  HOME
```

> You will likely have to wait quite a while for this process to complete.
