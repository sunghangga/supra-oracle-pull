# Supra Oracle Pull Example

This project demonstrates how to consume Supra Oracle price data feeds in smart contracts and off-chain clients, following the ["Building with Supra: Powering Decentralized Applications with Better Data"](https://dev.to/tosynthegeek/building-with-supra-powering-decentralized-applications-with-better-data-5d3c) tutorial.

It includes:
- Solidity smart contracts for EVM chains
- Example JavaScript and Rust clients for gRPC and REST
- Scripts for deploying and interacting with contracts
- Mock contracts for local testing

---

## Table of Contents

- [Prerequisites](#prerequisites)
- [Project Structure](#project-structure)
- [Setup](#setup)
- [Compiling Contracts](#compiling-contracts)
- [Deploying Contracts](#deploying-contracts)
- [Running the Example Client](#running-the-example-client)
- [Using the Mock Oracle](#using-the-mock-oracle)
- [Troubleshooting](#troubleshooting)
- [References](#references)

---

## Prerequisites

- Node.js (v16+ recommended)
- npm
- Hardhat
- Rust (for Rust SDKs/examples)
- Metamask wallet (for deploying to testnets)
- Sepolia ETH (for gas)
- Alchemy/Infura Sepolia endpoint (for RPC)
- [Supra gRPC server address](https://supra.com/docs/) (e.g., `testnet-dora.supraoracles.com:443`)

---

## Project Structure

```
supra-oracle-pull/
├── contracts/                # Solidity contracts (Supra, Lock, MockOracle)
├── scripts/                  # Deployment and interaction scripts
├── oracle-pull-example/
│   ├── gRPC/
│   │   ├── javascript/       # JS gRPC clients for various chains
│   │   ├── resources/        # ABI, oracle proof, Rust SDKs
│   ├── rest/                 # REST clients and resources
│   ├── smart-contracts/      # CosmWasm contract example
├── test/                     # JS contract tests
├── package.json
├── hardhat.config.js
└── README.md
```

---

## Setup

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-username/supra-oracle-pull.git
   cd supra-oracle-pull
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Install dependencies for the EVM client:**
   ```sh
   cd oracle-pull-example/gRPC/javascript/evm_client
   npm install
   cd ../../../../../
   ```

4. **Set up environment variables:**

   Create a `.env` file in the project root:
   ```
   PRIVATE_KEY=your_metamask_private_key
   RPC_URL=https://sepolia.infura.io/v3/your_project_id
   ```

---

## Compiling Contracts

From the project root, run:
```sh
npx hardhat compile
```

---

## Deploying Contracts

To deploy the Supra contract to Sepolia (or another network), use the provided script:

```sh
npx hardhat run scripts/run-supra.js --network sepolia
```

- The script will print the deployed contract address.  
- Copy this address for use in your client code.

---

## Running the Example Client

1. **Set the correct contract and gRPC server address in your client code:**
   ```js
   // In oracle-pull-example/gRPC/javascript/evm_client/main.js
   const contractAddress = '0xYourDeployedContractAddress';
   const address = 'testnet-dora.supraoracles.com:443';
   ```

2. **Run the client:**
   ```sh
   cd oracle-pull-example/gRPC/javascript/evm_client
   node main.js
   ```

---

## Using the Mock Oracle

For local testing, you can use the `MockOracle.sol` contract.  
Deploy it using Hardhat, and point your client or Supra contract to its address.

---

## Troubleshooting

- **Stuck at "Getting proof..."**  
  - Check your gRPC server address and network connectivity.
  - Try running from a different network if behind a firewall or VPN.

- **Compilation errors in Solidity:**  
  - Ensure all arrays are declared and initialized before use.
  - See the [Solidity docs](https://docs.soliditylang.org/) for syntax help.

- **Contract address not found:**  
  - Make sure you deploy the contract and copy the address from the deployment output.

---

## References

- [Tutorial: Building with Supra](https://dev.to/tosynthegeek/building-with-supra-powering-decentralized-applications-with-better-data-5d3c)
- [Supra Docs](https://supra.com/docs/)
- [Hardhat Documentation](https://hardhat.org/getting-started/)

---

**Happy building with Supra Oracle!**

If you have issues or questions, feel free to open an issue or reach out via the Supra community.