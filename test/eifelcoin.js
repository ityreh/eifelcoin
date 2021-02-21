const EifelCoin = artifacts.require("EifelCoin");

contract('EifelCoin', (accounts) => {
  it('should put 10000 EifelCoin in the first account', async () => {
    const eifelCoinInstance = await EifelCoin.deployed();
    const balance = await eifelCoinInstance.getBalance.call(accounts[0]);

    assert.equal(balance.valueOf(), 10000, "10000 wasn't in the first account");
  });
  it('should call a function that depends on a linked library', async () => {
    const eifelCoinInstance = await EifelCoin.deployed();
    const eifelCoinBalance = (await eifelCoinInstance.getBalance.call(accounts[0])).toNumber();
    const eifelCoinEthBalance = (await eifelCoinInstance.getBalanceInEth.call(accounts[0])).toNumber();

    assert.equal(eifelCoinEthBalance, 2 * eifelCoinBalance, 'Library function returned unexpected function, linkage may be broken');
  });
  it('should send coin correctly', async () => {
    const eifelCoinInstance = await EifelCoin.deployed();

    // Setup 2 accounts.
    const accountOne = accounts[0];
    const accountTwo = accounts[1];

    // Get initial balances of first and second account.
    const accountOneStartingBalance = (await eifelCoinInstance.getBalance.call(accountOne)).toNumber();
    const accountTwoStartingBalance = (await eifelCoinInstance.getBalance.call(accountTwo)).toNumber();

    // Make transaction from first account to second.
    const amount = 10;
    await eifelCoinInstance.sendCoin(accountTwo, amount, { from: accountOne });

    // Get balances of first and second account after the transactions.
    const accountOneEndingBalance = (await eifelCoinInstance.getBalance.call(accountOne)).toNumber();
    const accountTwoEndingBalance = (await eifelCoinInstance.getBalance.call(accountTwo)).toNumber();


    assert.equal(accountOneEndingBalance, accountOneStartingBalance - amount, "Amount wasn't correctly taken from the sender");
    assert.equal(accountTwoEndingBalance, accountTwoStartingBalance + amount, "Amount wasn't correctly sent to the receiver");
  });
});
