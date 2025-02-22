// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract Fiverr {
    enum WhoAreYou {
        TALENT,
        JOBMANAGER
    }

    enum JobTypes {
        FULLTIME,
        PARTTIME,
        FREELANCE
    }

    struct User {
        uint id;
        address addr;
    }
    struct Job {
        uint id;
        address creator;
        bytes company;
        bytes description;
        uint JobTypes;
        uint price;
        uint date;
    }
    mapping(uint => User) private users;
    mapping(address => bool) private registered;

    address[] private userAddrs;
    uint private nextUserId;

    function register() external {
        require(registered[msg.sender] = false, "User already registered");

        users[nextUserId] = User(nextUserId, msg.sender);
        userAddrs.push(msg.sender);
        nextUserId++;
    }

    function listJob() external {
        // _listJob();
    }

    function _listJob(
        bytes memory _company,
        bytes memory _description,
        uint _type,
        uint _price
    ) internal {
        
    }
}
