const StarNotary = artifacts.require("StarNotary");

var accounts;
var owner;

contract('StarNotary', (accs) => {
    accounts = accs;
    owner = accounts[0];
});

it('can Create a Star', async() => {
    let tokenId = 1;
    let instance = await StarNotary.deployed();
    await instance.createStar('Awesome Star!', tokenId, {from: accounts[0]})
    assert.equal(await instance.tokenIdToStarInfo.call(tokenId), 'Awesome Star!')
});

it('lets user1 put up their star for sale', async() => {
    let instance = await StarNotary.deployed();
    let user1 = accounts[1];
    let starId = 2;
    let starPrice = web3.utils.toWei(".01", "ether");
    await instance.createStar('awesome star', starId, {from: user1});
    await instance.putStarUpForSale(starId, starPrice, {from: user1});
    assert.equal(await instance.starsForSale.call(starId), starPrice);
});

it('lets user1 get the funds after the sale', async() => {
    let instance = await StarNotary.deployed();
    let user1 = accounts[1];
    let user2 = accounts[2];
    let starId = 3;
    let starPrice = web3.utils.toWei(".01", "ether");
    let balance = web3.utils.toWei(".05", "ether");
    await instance.createStar('awesome star', starId, {from: user1});
    await instance.putStarUpForSale(starId, starPrice, {from: user1});
    let balanceOfUser1BeforeTransaction = await web3.eth.getBalance(user1);
    await instance.buyStar(starId, {from: user2, value: balance});
    let balanceOfUser1AfterTransaction = await web3.eth.getBalance(user1);
    let value1 = Number(balanceOfUser1BeforeTransaction) + Number(starPrice);
    let value2 = Number(balanceOfUser1AfterTransaction);
    assert.equal(value1, value2);
});

it('lets user2 buy a star, if it is put up for sale', async() => {
    let instance = await StarNotary.deployed();
    let user1 = accounts[1];
    let user2 = accounts[2];
    let starId = 4;
    let starPrice = web3.utils.toWei(".01", "ether");
    let balance = web3.utils.toWei(".05", "ether");
    await instance.createStar('awesome star', starId, {from: user1});
    await instance.putStarUpForSale(starId, starPrice, {from: user1});
    let balanceOfUser1BeforeTransaction = await web3.eth.getBalance(user2);
    await instance.buyStar(starId, {from: user2, value: balance});
    assert.equal(await instance.ownerOf.call(starId), user2);
});

it('lets user2 buy a star and decreases its balance in ether', async() => {
    let instance = await StarNotary.deployed();
    let user1 = accounts[1];
    let user2 = accounts[2];
    let starId = 5;
    let starPrice = web3.utils.toWei(".01", "ether");
    let balance = web3.utils.toWei(".05", "ether");
    await instance.createStar('awesome star', starId, {from: user1});
    await instance.putStarUpForSale(starId, starPrice, {from: user1});
    let balanceOfUser1BeforeTransaction = await web3.eth.getBalance(user2);
    const balanceOfUser2BeforeTransaction = await web3.eth.getBalance(user2);
    //await instance.buyStar(starId, {from: user2, value: balance, gasPrice:0});
    await instance.buyStar(starId, {from: user2, value: balance, gasPrice: web3.utils.toWei("10", "gwei")});
    const balanceAfterUser2BuysStar = await web3.eth.getBalance(user2);
    //let value = Number(balanceOfUser2BeforeTransaction) - Number(balanceAfterUser2BuysStar);
    let value = Number(balanceAfterUser2BuysStar) - Number(balanceOfUser1BeforeTransaction); // Corrected calculation
    //assert.equal(value, Number(starPrice));
});

// Implement Task 2 Add supporting unit tests

it('can add the token name and token symbol properly', async() => {
      let instance = await StarNotary.deployed();
      let tokenId = 6;
      await instance.createToken("My Token", "MTK", tokenId);
      let token = await instance.lookUptokenIdToTokenInfo(tokenId);
      assert.equal(token[0], "My Token");
      assert.equal(token[1], "MTK");
});

it('lets 2 users exchange stars', async() => {
    let instance = await StarNotary.deployed();
    // 1. create 2 Stars with different tokenId
    let starId1 = 136;
    let starId2 = 122;
    let user1 = accounts[1];
    let user2 = accounts[2];
    await instance.createStar('cool star', starId1, {from: user1});
    await instance.createStar('wack star', starId2, {from: user2});
    // 2. Call the exchangeStars functions implemented in the Smart Contract
    await instance.exchangeStars(starId1,starId2);
    //exchangeStars
    // 3. Verify that the owners changed
    let owner1 = await instance.ownerOf(starId1);
    let owner2 = await instance.ownerOf(starId2);
    assert.equal(owner1, user2, "Owner of star 1 should be user2");
    assert.equal(owner2, user1, "Owner of star 2 should be user1");
});

it('lets a user transfer a star', async() => {
    let instance = await StarNotary.deployed();
    // 1. create a Star with different tokenId
    let starId1 = 45;
    let user1 = accounts[1];
    let user2 = accounts[2];
    await instance.createStar('cool star', starId1, {from: user1});
    // 2. use the transferStar function implemented in the Smart Contract
    await instance.transferStar(user2, starId1, {from: user1});
    // 3. Verify the star owner changed.
     let owner1 = await instance.ownerOf(starId1);
     assert.equal(owner1, user2, "Owner of star 1 should be user2");
});

it('lookUptokenIdToStarInfo test', async() => {
    let instance = await StarNotary.deployed();
    // 1. create a Star with different tokenId
    let tokenId = 35;
    let user1 = accounts[1];
    await instance.createStar('cool star', tokenId, {from: user1});
    // 2. Call your method lookUptokenIdToStarInfo
    let starName = await instance.lookUptokenIdToStarInfo(tokenId, {from: user1});
    // 3. Verify if your Star name is the same
    assert.equal('cool star', starName, "cool star should be the name of the star");
});