# Decentralized Star Notary

## Description
This project is a decentralized application (DApp) that allows users to create, sell, and exchange stars as non-fungible tokens (NFTs) on the Ethereum blockchain.

## Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/star-notary-dapp.git
    ```
2. Navigate to the project directory:
    ```bash
    cd star-notary-dapp
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Compile the smart contracts:
    ```bash
    truffle compile
    ```
5. Deploy the smart contracts:
    ```bash
    truffle migrate
    ```
6. Run the tests:
    ```bash
    truffle test
    ```

## Usage
1. Start the Truffle development console:
    ```bash
    truffle develop
    ```
2. Create a star:
    ```javascript
    await instance.createStar('Awesome Star!', 1, { from: accounts[0] })
    ```
3. Put a star up for sale:
    ```javascript
    await instance.putStarUpForSale(1, web3.utils.toWei(".01", "ether"), { from: accounts[0] })
    ```
4. Buy a star:
    ```javascript
    await instance.buyStar(1, { from: accounts[1], value: web3.utils.toWei(".01", "ether") })
    ```
    
## Features
- Create stars as NFTs
- Buy and sell stars
- Exchange stars between users
- Transfer stars to other users
- View star and token details

## ERC-721 Token Details

- Token Name: [Jagaban Token]
- Token Symbol: [JTK]

## Versions

- Truffle Version:[Truffle v5.0.2 (core: 5.0.2),
  Solidity v0.5.0 (solc-js),
  Node v16.9.0]
- OpenZeppelin Version: [openzeppelin-solidity@2.3.0]

## Deployment

- Token Address on the Sepholia Network: [0xA2d75ED98eEc7113c1c0ecED46EaFBC696934024]
