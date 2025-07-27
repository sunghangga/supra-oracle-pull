const { ethers } = require("hardhat");
const PullServiceClient = require("../oracle-pull-example/gRPC/javascript/evm_client/pullServiceClient");
require("dotenv").config();

const address = "testnet-dora-2.supra.com";
const pairIndexes = [0, 21, 61, 49];
const sepoliaPullContractAddress = "0x6Cd59830AAD978446e6cc7f6cc173aF7656Fb917"; // Update for V1 or V2
const privateKey = process.env.PRIVATE_KEY;

async function main() {
    const client = new PullServiceClient(address);
    const request = {
        pair_indexes: pairIndexes,
        chain_type: "evm",
    };

    function getProofAsync(client, request) {
        return new Promise((resolve, reject) => {
            client.getProof(request, (err, response) => {
                if (err) return reject(err);
                resolve(response);
            });
        });
    }

    try {
        console.log("Getting proof....");

        const response = await getProofAsync(client, request);

        console.log("Calling contract to verify the proofs...");
        await callContract(response.evm);
    } catch (err) {
        console.error("Error getting proof:", err.message || err);
    }
}

async function callContract(response) {
    const Supra = await ethers.getContractFactory("Supra");
    const supra = await Supra.deploy(sepoliaPullContractAddress);
    const contractAddress = await supra.getAddress();

    console.log("Supra deployed to: ", contractAddress);

    const hex = ethers.hexlify(response);
    const txData = await supra.deliverPriceData.populateTransaction(hex);
    const gasEstimate = await supra.estimateGas.deliverPriceData(hex);
    const gasPrice = await ethers.provider.getGasPrice();

    console.log("Estimated gas for deliverPriceData:", gasEstimate.toString());
    console.log("Estimated gas price:", gasPrice.toString());

    const tx = {
        from: await ethers.provider.getSigner().getAddress(),
        to: contractAddress,
        data: txData.data,
        gas: gasEstimate,
        gasPrice: gasPrice,
    };

    const wallet = new ethers.Wallet(privateKey, ethers.provider);
    const signedTransaction = await wallet.signTransaction(tx);
    const txResponse = await wallet.sendTransaction(tx);

    console.log("Transaction sent! Hash:", txResponse.hash);

    // (Optional) Wait for transaction confirmation (e.g., 1 block confirmation)
    const receipt = await txResponse.wait(1);
    console.log("Transaction receipt:", receipt);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    }); 