# Confidential Assets

The blockchain is an open distributed transaction ledger, allowing the data on the chain to be publicly visible. Although the sender and receiver of a transaction cannot directly be associated with real-life buyers and sellers, the data on the chain can be analyzed by Address clustering to derive some association information about addresses and identities. The amount of the transaction is also public on the chain.

{% callout type="warning" title="Hey! Something you should know.." %}
Transaction details can still be seen regardless of the privacy-level of the data. There is NO guarantee of true and tamper-resistant features of the ledger, it also makes many scenarios that require privacy impossible to be applied on the blockchain.
{% /callout %}

## All-NEW EVM Benefits

1. Contracts can read / write encrypted data stores.
2. Built-in zkSNARK proofs and verifications.

## What are confidential assets?

Under this condition, the concept of confidential assets was proposed. The sender, receiver, and transaction amount of the transaction are hidden by using techniques such as cryptography, and the miner (transaction verifier) can verify the legality of a transaction without knowing the specific data. Commonly used methods for implementing confidential assets include Mimble-Wimble, zk-SNARKs, etc.

## Precompiled Contract

### Concept

Because the EVM is a stack-based virtual machine, it calculates gas based on the content of the operation, so if it involves very complicated calculations, it can be very inefficient to execute the operation in EVM and consume a lot of gas. For example, in zk-snark, the addition and subtraction of the elliptic curve and the pairing operation are required. These operations are very complicated and unrealistic to be executed in the EVM. This is the original intention of Ethereum to propose a precompiled contract.

Precompiled contracts are a compromise used in the EVM to provide more complex library functions (usually used for complex operations such as encryption, hashing, etc.) that are not suitable for writing in opcode. They are applied to contracts that are simple but frequently called, or that are logically fixed but computationally intensive. Precompiled contracts are implemented on the client-side with client code, and because they do not require the EVM, they run fast. It also costs less for developers than using functions that run directly in the EVM.

The precompiled contracts that Ethereum has implemented now are as follows：

| Contract Name  | Features  | Address  |
|---|---|---|
| ecrecover() | Recovery of ECDSA signature | 0x01 |
| sha256hash() | Hash function SHA256 | 0x02 |
| ripemd160hash() | Hash function RIPEMD160 | 0x03 |
| dataCopy() | Identity | 0x04 |
| bigModeExp() | Modular exponentiation | 0x05 |
| bn256Add() | Addition on elliptic curve alt_bn128 | 0x06 |
| bn256ScalarMul() | Scalar multiplication on elliptic curve alt_bn128 | 0x07 |
| bn256Pairing() | Checking a paring equation on curve alt_bn128 | 0x08 |
| blake2b() | BLAKE2b hash function | 0x09 |

At the code level, the so-called address is actually the index of the contract array, and an index identifies a precompiled contract. The three precompiled contracts related to the confidential assets are `bn256Add()`, `bn256ScalarMul()`, `bn256Pairing()`.

## Implementation

In the evm.go file, the operating logic of EVM is encapsulated. There are 4 functions for calling smart contracts, `Call()`, `CallCode()`, `DelegateCall()`, `StaticCall()`. The work done by these four functions is to generate contract objects, but the specific details such as parameters will have some differences.

After the contract is instantiated, the run function in evm.go is called to run the smart contract. This function takes into account both the case of precompiled contracts and non-precompiled contract calls. In the following code, the first branch is to instantiate parameter p by specifying a precompiles index to specify a precompiled contract. The index of the array here actually corresponds to the concept of the address when the precompiled contract array is declared.

The `RunPrecompiledContract` function is then called to execute the precompiled contract. If it is a non-precompiled contract, you can see from the code that the interpreter of EVM is called.

### /core/vm/evm.go

```go
// run runs the given contract and takes care of running precompiles with a fallback to the byte code interpreter.
func run(evm *EVM, contract *Contract, input []byte, readOnly bool) ([]byte, error) {
  if contract.CodeAddr != nil {
    precompiles := PrecompiledContractsHomestead

    if evm.ChainConfig().IsByzantium(evm.BlockNumber) {
      precompiles = PrecompiledContractsByzantium
    }

    if p := precompiles[*contract.CodeAddr]; p != nil {
      return RunPrecompiledContract(p, input, contract)
    }
  }

  for _, interpreter := range evm.interpreters {
    if interpreter.CanRun(contract.Code) {
      if evm.interpreter != interpreter {
        // Ensure that the interpreter pointer is set back
        // to its current value upon return.
        defer func(i Interpreter) {
          evm.interpreter = i
        } (evm.interpreter)
          evm.interpreter = interpreter
        }

        return interpreter.Run(contract, input, readOnly)
      }
    }

    return nil, ErrNoCompatibleInterpreter
  }
}
```

In the RunPrecompiledContract function, you can see that the p variable implements the bn256 curve addition operation and then returns the result. It can be clearly seen that this part of the operation is calculated during the execution on the client’s end.

### /core/vm/contracts.go

```go
// RunPrecompiledContract runs and evaluates the output of a precompiled contract.
func RunPrecompiledContract(p PrecompiledContract, input []byte, contract *Contract) (ret []byte, err error) {
  gas := p.RequiredGas(input)

  if contract.UseGas(gas) {
    return p.Run(input)
  }

  return nil, ErrOutOfGas
}
```

### /core/vm/contracts.go

```go
// bn256Add implements a native elliptic curve point addition.
type bn256Add struct{}
// RequiredGas returns the gas required to execute the pre-compiled contract.
func (c *bn256Add) RequiredGas(input []byte) uint64 {
  return params.Bn256AddGas
}

func (c *bn256Add) Run(input []byte) ([]byte, error) {
  x, err := newCurvePoint(getData(input, 0, 64))

  if err != nil {
    return nil, err
  }

  y, err := newCurvePoint(getData(input, 64, 64))

  if err != nil {
    return nil, err
  }

  res := new(bn256.G1)

  res.Add(x, y)

  return res.Marshal(), nil
}
```

## Instructions

In smart contract code, the precompiled contract can be called directly in the contract file just like a normal contract, but the calling method is somewhat different. A precompiled contract call is made by an assembly code block in the .sol file. The specification and parameters of the call are as follows:

```c
assembly {
    if iszero(call(gasLimit, contractAddress, value, input, inputLength, output, outputLength)) {
        revert(0, 0)
    }
}
```

### An example of Elliptic Curve addition

```js
function ecadd(
    uint256 ax,
    uint256 ay,
    uint256 bx,
    uint256 by
) public constant returns(uint256[2] p) {
  uint256[4] memory input;
  input[0] = ax;
  input[1] = ay;
  input[2] = bx;
  input[3] = by;  

  assembly {
    // ecadd precompile!
    if iszero(call(not(0), 0x06, 0, input, 0x80, p, 0x40)) {
      revert(0, 0)
    }    
  }
}
```
