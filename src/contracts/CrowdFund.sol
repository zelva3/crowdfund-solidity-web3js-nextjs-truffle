// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract CrowdFund{
    struct ProjectData {
        string name;
        string desc;
        uint minContribution;
        address contractaddress;
    }
    uint public projectsCount;
    mapping(uint=>ProjectData) public deployedprojects;

    function createNewProject(string memory name, string memory desc, uint minContribution) public {
        Project newproject = new Project(name, desc, minContribution, msg.sender);

        ProjectData storage pd = deployedprojects[projectsCount];
        pd.name = name;
        pd.desc = desc;
        pd.minContribution = minContribution;
        pd.contractaddress = address(newproject);
        
        projectsCount++;
    }
}

contract Project {
    struct Request {
        string description;
        uint value;
        address payable recipient;
        mapping(address=>bool) approvals;
        bool isComplete;
        uint approvalCount;
        bool created;
    }
    string public projectName;
    string public projectDesc;
    uint public numOfRequests;
    mapping(uint=>Request) public requests;
    uint public minContribution;
    address public creator;
    mapping(address=>bool) public contributors;
    uint public totalContributors;

    constructor(string memory project_name, string memory project_desc, uint mincont, address creator_) {
        minContribution = mincont;
        projectName = project_name;
        projectDesc = project_desc;
        creator = creator_;
    }

    modifier restricted(){
        require(msg.sender == creator);
        _;
    }

    function contribution() public payable{
        require(msg.value >= minContribution);
        
        if(!contributors[msg.sender])
        totalContributors++;

        contributors[msg.sender] = true;
    }

    function createRequest(string memory description, uint value, address payable recipient) public restricted {
        Request storage r = requests[numOfRequests];
        r.description = description;
        r.value = value;
        r.recipient = recipient;
        r.isComplete = false;
        r.approvalCount = 0;
        r.created = true;
        numOfRequests++;
    }

    function approveRequest(uint req_id) public {
        Request storage r = requests[req_id];
        require(r.created);
        require(!r.isComplete);
        require(contributors[msg.sender]);
        require(!r.approvals[msg.sender]);

        r.approvals[msg.sender] = true;
        r.approvalCount++;
    }

    function finalizeRequest(uint req_id) public restricted{
        Request storage r = requests[req_id];
        require(r.created);
        require(!r.isComplete);
        require(r.approvalCount > totalContributors/2);

        payable(r.recipient).transfer(r.value);
        r.isComplete = true;

    }

    function getSummary() public view returns(uint, uint, uint, uint, address){
        return (
            numOfRequests,
            minContribution,
            totalContributors,
            address(this).balance,
            creator
        );
    }

}