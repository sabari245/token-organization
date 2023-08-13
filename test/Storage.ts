import { expect } from "chai";
import { ethers } from "hardhat";


describe("Organization Contract", () => {

    async function deployContract() {
        const [owner, addr1, addr2] = await ethers.getSigners();

        const contract = await ethers.deployContract("Organization", ["MyOrg", "ORG", 1000]);
        await contract.waitForDeployment();

        return { contract, owner, addr1, addr2 };
    }

    it("should add a member and allow them to claim vested tokens", async function () {

        const {contract, owner, addr1} = await deployContract();
        const organizationContract = contract;
        const member = addr1;

        const initialTokens = 500;
        const vestingPeriod = 0;

        await organizationContract.addMember(member.address, initialTokens, vestingPeriod);
        let [remainingTokens, , ] = await organizationContract.getVestingInfo(member.address);

        expect(remainingTokens).to.equal(500);

        await organizationContract.claimVestedTokens();

        [remainingTokens, , ] = await organizationContract.getVestingInfo(member.address);
        expect(remainingTokens).to.equal(0);
    });

    it("should mint tokens to an account", async function () {

        const {contract, owner, addr1} = await deployContract();
        const organizationContract = contract;
        const member = addr1;

        const amount = 200;

        await organizationContract.mintTokens(member.address, amount);

        const balance = await organizationContract.balanceOf(member.address);
        expect(balance).to.equal(amount);
    });
});

describe("OrganizationProxy Contract", () => {

        async function deployContract() {
        const [owner, addr1, addr2] = await ethers.getSigners();

        const contract = await ethers.deployContract("OrganizationProxy");
        await contract.waitForDeployment();

        return { contract, owner, addr1, addr2 };
    }

    // it("should create an organization and update ownership", async function () {

    //     const {contract, owner, addr1} = await deployContract();
    //     const organizationProxyContract = contract;
    //     const member = addr1;

    //     await organizationProxyContract.createOrganization("MyOrg", "ORG", 1000);
    //     await organizationProxyContract.updateOwner(member.address);

    //     const [orgOwner, , ] = await organizationProxyContract.getVestingInfo(owner.address);
    //     expect(orgOwner).to.equal(member.address);
    // });

    it("should add a member to the organization via proxy", async function () {

        const {contract, owner, addr1} = await deployContract();
        const organizationProxyContract = contract;
        const member = addr1;

        const initialTokens = 500;
        const vestingPeriod = 0;

        await organizationProxyContract.createOrganization("MyOrg", "ORG", 1000);
        await organizationProxyContract.addMember(owner.address, initialTokens, vestingPeriod);

        const [remainingTokens, , ] = await organizationProxyContract.getVestingInfo(owner.address);
        expect(remainingTokens).to.equal(initialTokens);
    });
});
