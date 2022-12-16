// SPDX-License-Identifier: MIT
pragma solidity ^0.6.12;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface ETH is IERC20 {
    function addWhiteAccount(address whiteAccount) external;
}
