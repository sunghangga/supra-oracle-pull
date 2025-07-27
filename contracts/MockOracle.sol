// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./Supra.sol";

contract MockOracle is ISupraOraclePull {
    function verifyOracleProof(
        bytes calldata
    ) external pure override returns (PriceData memory) {
        uint256[] memory pairs = new uint256[](2);
        uint256[] memory prices = new uint256[](2);
        uint256[] memory decimals = new uint256[](2);

        pairs[0] = 21;
        prices[0] = 1500 * 1e8;
        decimals[0] = 8;

        pairs[1] = 61;
        prices[1] = 2500 * 1e8;
        decimals[1] = 8;

        return PriceData(pairs, prices, decimals);
    }
}
