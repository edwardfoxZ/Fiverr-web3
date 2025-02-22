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
        JobTypes jobType;
        uint price;
        uint date;
    }
    mapping(uint => Job) private jobs;
    mapping(uint => User) private users;
    mapping(address => bool) private registered;

    address[] private userAddrs;
    uint private nextUserId;
    uint private nextJobId;

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
        JobTypes _type,
        uint _price
    ) internal {
        require(msg.sender != address(0), "Sender is not the correct address");

        jobs[nextJobId] = Job(
            nextJobId,
            msg.sender,
            _company,
            _description,
            _type,
            _price,
            block.timestamp
        );
        nextJobId++;
    }
}
