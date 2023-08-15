// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Import the necessary ERC-20 interface
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

// Inherit from the ERC-20 contract
contract FlipCoin is ERC20 {

    uint256 purchase_rewards;
    uint256 purchase_referrals;
    uint256 staking;
    uint256 partners;
    uint256 currentOrder;
    uint256 expireTime = 90;
    address ownerAddress;
    address tokenAddress;

    enum OrderStatus
    {
        Confirmed,
        Cancelled,
        NotReturned
    }
    struct Order
    {
        uint256 id;
        uint256 lastReturnDate;
        uint256 flipCoin;
        address userAccount;
        address referrer;
        bool isReferred;
        OrderStatus status;
    }

    mapping(uint256=>Order) public orders;
    mapping(address=>uint256) public expectedBalance;
    mapping(uint256=>uint256) public totalReferrals;

    // Contract constructor
    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        // Mint initial tokens to the contract deployer
        _mint(address(this), 1000000 * 10 ** decimals());
        ownerAddress = msg.sender;
        tokenAddress = address(this);
    }
    function mint(uint256 amount) external 
    {
        require(ownerAddress == msg.sender);
        _mint(address(this), amount * 10 ** decimals());
    }
    function depositCoint() external {
        for(uint256 i=0;i<currentOrder;i++)
        {
            if(orders[i].status == OrderStatus.Confirmed && block.timestamp >= orders[i].lastReturnDate)
            {
                orders[i].status = OrderStatus.NotReturned;
                IERC20 token = IERC20(tokenAddress);
                token.transfer(orders[i].userAccount, orders[i].flipCoin);
                expectedBalance[orders[i].userAccount] += orders[i].flipCoin;
                if(orders[i].isReferred)
                {
                    IERC20 tokenRef = IERC20(tokenAddress);
                    tokenRef.transfer(orders[i].referrer, orders[i].flipCoin);
                    expectedBalance[orders[i].referrer] += orders[i].flipCoin;
                }
            }

        }
    }
    function deductCoin() external {
        for(uint256 i=0;i<currentOrder;i++)
        {
            if(orders[i].status == OrderStatus.NotReturned && block.timestamp >= orders[i].lastReturnDate + expireTime)
            {
                if(balanceOf(orders[i].userAccount) > (expectedBalance[orders[i].userAccount] - orders[i].flipCoin))
                {
                    uint256 extraAmount = balanceOf(orders[i].userAccount) - (expectedBalance[orders[i].userAccount] - orders[i].flipCoin);
                    _burn(orders[i].userAccount, extraAmount);
                }
                expectedBalance[orders[i].userAccount] -= orders[i].flipCoin;
                if(orders[i].isReferred)
                {
                    if(balanceOf(orders[i].referrer) > (expectedBalance[orders[i].referrer] - orders[i].flipCoin))
                    {
                        uint256 extraAmount = balanceOf(orders[i].referrer) - (expectedBalance[orders[i].referrer] - orders[i].flipCoin);
                        _burn(orders[i].referrer, extraAmount);
                    }
                    expectedBalance[orders[i].referrer] -= orders[i].flipCoin;
                }
            }
        }
    }
    function purchase(uint256 productPrice,address userAccount, uint256 lastReturnDate,bool isReferred, address referrer)external {
        Order memory newOrder;
        newOrder.id = currentOrder;
        newOrder.flipCoin = productPrice/10;
        newOrder.userAccount = userAccount;
        newOrder.status = OrderStatus.Confirmed;
        newOrder.lastReturnDate = lastReturnDate;
        if(isReferred)
        {
            newOrder.isReferred = true;
            newOrder.referrer = referrer;
        }
        else 
        {
            newOrder.isReferred = false;
        }
        orders[currentOrder] = newOrder;
        currentOrder++;
    }
    function disperseCoin(address seller, uint256 amount, address userAccount) external {
        require(balanceOf(seller) >= amount);
        Order memory newOrder;
        newOrder.id = currentOrder;
        newOrder.flipCoin = amount;
        newOrder.isReferred = false;
        newOrder.lastReturnDate = block.timestamp;
        newOrder.status = OrderStatus.Confirmed;
        newOrder.userAccount = userAccount;
        orders[currentOrder] = newOrder;
        _burn(seller, amount);
        currentOrder++;
    }
    // Function to allow users to stake their tokens
    function stakeTokens(uint256 amount) external {
        require(amount > 0, "Amount must be greater than 0");
        
        // Transfer tokens from the user to this contract
        _transfer(msg.sender, address(this), amount);
        
        // Emit an event indicating the staking
        emit TokensStaked(msg.sender, amount);
    }

    // Function to distribute rewards to stakers
    function distributeRewards(address[] memory stakers, uint256[] memory rewards) external {
        require(stakers.length == rewards.length, "Arrays must have the same length");

        for (uint256 i = 0; i < stakers.length; i++) {
            address staker = stakers[i];
            uint256 reward = rewards[i];

            require(staker != address(0), "Invalid staker address");
            require(reward > 0, "Reward must be greater than 0");

            // Transfer rewards from the contract to the staker
            _transfer(address(this), staker, reward);

            // Emit an event indicating the reward distribution
            emit RewardsDistributed(staker, reward);
        }
    }

    // Custom events for staking and rewards
    event TokensStaked(address indexed staker, uint256 amount);
    event RewardsDistributed(address indexed staker, uint256 reward);
}
