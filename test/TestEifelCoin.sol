pragma solidity >=0.4.25 <0.7.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/EifelCoin.sol";

contract TestEifelCoin {
    function testInitialBalanceUsingDeployedContract() public {
        EifelCoin meta = EifelCoin(DeployedAddresses.EifelCoin());

        uint256 expected = 10000;

        Assert.equal(
            meta.getBalance(tx.origin),
            expected,
            "Owner should have 10000 EifelCoin initially"
        );
    }

    function testInitialBalanceWithNewEifelCoin() public {
        EifelCoin meta = new EifelCoin();

        uint256 expected = 10000;

        Assert.equal(
            meta.getBalance(tx.origin),
            expected,
            "Owner should have 10000 EifelCoin initially"
        );
    }
}
