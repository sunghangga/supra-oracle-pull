const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deployer:", deployer.address);

    // Deploy mock oracle
    const Oracle = await ethers.getContractFactory("MockOracle");
    const oracle = await Oracle.deploy();
    await oracle.waitForDeployment();

    console.log("Mock Oracle deployed to:", await oracle.getAddress());

    // Deploy Supra contract with oracle address
    const Supra = await ethers.getContractFactory("Supra");
    const supra = await Supra.deploy(await oracle.getAddress());
    await supra.waitForDeployment();

    const supraAddress = await supra.getAddress();
    console.log("Supra contract deployed to:", supraAddress);

    // Send dummy proof to Supra contract
    const dummyProof = "0xdeadbeef"; // Not used by MockOracle
    const tx = await supra.deliverPriceData(dummyProof);
    await tx.wait();

    console.log("deliverPriceData called.");

    // Read stored price
    const [price, decimals] = await supra.getLatestPrice(21);
    console.log(`Pair 21: Price = ${price}, Decimals = ${decimals}`);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
