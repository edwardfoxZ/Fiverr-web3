const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Deploy Contract", function () {
  let owner, acc1, acc2, emp1, fiverr;

  async function setDeployment() {
    [owner, acc1, acc2, emp1] = await ethers.getSigners();
    const Fiverr = await ethers.getContractFactory("Fiverr", owner);
    const fiverr = await Fiverr.deploy();
    return fiverr;
  }

  describe("Registration", function () {
    it("should register a new user", async function () {
      const fiverr = await setDeployment();

      // Register a new user as a TALENT (for testing purposes)
      await fiverr.connect(acc2).register(0); // 0 corresponds to WhoAreYou.TALENT
      const isRegistered = await fiverr.registered(acc2.address);
      expect(isRegistered).to.be.true;
    });

    it("should not register a user that already regitered", async () => {
      const fiverr = await setDeployment();
      expect(await fiverr.connect(acc2).register(1)).to.be.revertedWith(
        "User already registered"
      );
    });

    it("should")
  });
});
