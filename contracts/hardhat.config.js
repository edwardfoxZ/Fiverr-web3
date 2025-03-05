require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    ganache: {
      url: "http://127.0.0.1:7545",
      chainId: 1337,
      accounts: [
        "0x2451148602895926e6541fe12734c19f3a82124cfa103cef74e77d09ab7aebc0",
        "0xdd67d7774fa505c2173ffed7918fa39800e91efc2b69b7609bf08df132ba35da",
        "0xf7ca6367774658eba4d0ea88710b26ac109212afe214ede409f5d4ef46e97376",
        "0xf4d510f4fe142c1c3132236e5cd1fea331dad5300291c67334017619062b63fc",
      ],
    },
  },
};
