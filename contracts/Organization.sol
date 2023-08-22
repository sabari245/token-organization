// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// Organization Contract
contract Organization is ERC20, Ownable {
    struct Member {
        uint256 initialTokens;
        uint256 vestingPeriod;
        uint256 vestingStartTime;
    }

    mapping(address => Member) public members;

    constructor(
        string memory name,
        string memory symbol,
        uint256 initialSupply
    ) ERC20(name, symbol) {
        _mint(msg.sender, initialSupply);
    }

    modifier onlyMember(address account) {
        require(members[account].initialTokens > 0, "Not a member");
        _;
    }

    modifier vestingPeriodOver(address account) {
        Member memory member = members[account];
        require(
            block.timestamp >= member.vestingStartTime + member.vestingPeriod,
            "Vesting period not over yet"
        );
        _;
    }

    function getOrganizationDetails()
        external
        view
        returns (string memory, string memory, uint256)
    {
        return (name(), symbol(), totalSupply());
    }

    function mintTokens(address account, uint256 amount) external onlyOwner {
        _mint(account, amount);
    }

    function addMember(
        address account,
        uint256 initialTokens,
        uint256 vestingPeriod
    ) external onlyOwner {
        _mint(account, initialTokens);
        members[account] = Member({
            initialTokens: initialTokens,
            vestingPeriod: vestingPeriod,
            vestingStartTime: block.timestamp
        });
    }

    function claimVestedTokens(
        address account
    ) external onlyMember(account) vestingPeriodOver(account) {
        Member storage member = members[account];
        uint256 claimableTokens = member.initialTokens;
        member.initialTokens = 0;
        member.vestingStartTime = 0;
        _transfer(owner(), account, claimableTokens);
    }

    function getVestingInfo(
        address account
    ) external view returns (uint256, uint256, uint256) {
        Member memory member = members[account];
        return (
            member.initialTokens,
            member.vestingPeriod,
            member.vestingStartTime
        );
    }
}

contract OrganizationProxy {
    mapping(address => Organization) ownerToOrganization;

    function createOrganization(
        string memory name,
        string memory symbol,
        uint256 initialSupply
    ) external {
        Organization newOrganization = new Organization(
            name,
            symbol,
            initialSupply
        );
        ownerToOrganization[msg.sender] = newOrganization;
    }

    function updateOwner(address newOwner) external {
        Organization org = ownerToOrganization[msg.sender];
        require(address(org) != address(0), "Organization not found");

        org.transferOwnership(newOwner);

        ownerToOrganization[newOwner] = org;
        delete ownerToOrganization[msg.sender];
    }

    function mintTokens(address account, uint256 amount) external {
        ownerToOrganization[msg.sender].mintTokens(account, amount);
    }

    function addMember(
        address account,
        uint256 initialTokens,
        uint256 vestingPeriod
    ) external {
        ownerToOrganization[msg.sender].addMember(
            account,
            initialTokens,
            vestingPeriod
        );
    }

    function getOrganizationDetailsOfSender()
        external
        view
        returns (string memory, string memory, uint256)
    {
        console.log(msg.sender);
        return ownerToOrganization[msg.sender].getOrganizationDetails();
    }

    function claimVestedTokens(address orgAddress) external {
        ownerToOrganization[orgAddress].claimVestedTokens(msg.sender);
    }

    function getVestingInfo(
        address orgAddress,
        address member
    ) external view returns (uint256, uint256, uint256) {
        return ownerToOrganization[orgAddress].getVestingInfo(member);
    }
}
