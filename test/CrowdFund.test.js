const { assert } = require('chai');

const CrowdFund = artifacts.require('CrowdFund');
const Project = artifacts.require('Project');

require('chai')
    .use(require('chai-as-promised'))
    .should();

contract('CrowdFund', (accounts) => {

    let CF, project;
    const minval = web3.utils.toWei('1', 'ether');
    
    beforeEach(async () => {
        CF = await CrowdFund.deployed();
        await CF.createNewProject("name", "description", minval, { from: accounts[0] });

    })

    describe('CrowdFund Deployment', () => {
        it('Deployed', ()=>{
            assert.ok(CF);
            assert.ok(project);
        })
        it('Creator check', async () => {
            let creator = await project.creator.call();
            assert.equal(creator, accounts[0]);
        })

        it('Project Contribution', async()=>{
            await project.contribution({from:accounts[1], value:minval});
            let contributor_save = await project.contributors(accounts[1]);
            assert.equal(contributor_save, true);
        })
        it("requires a minimum contribution", async () => {
            const cont = web3.utils.toWei('5', 'ether');
            try {
                await project.contribution({from:accounts[1], value:cont});
              assert(false);
            } catch (err) {
              assert(err);
            }
        });
        it('Allows Creator to Create a Request', async () => {
            await project.createRequest('Buy things', web3.utils.toWei('5', 'ether'), 
            accounts[3], {from:accounts[0]});
            let numofreq = await project.numOfRequests.call();
            assert.equal(numofreq, 1);
        })

        it("Processes Requests", async () => {
            const cont = web3.utils.toWei('2', 'ether');
            await project.contribution({from:accounts[0], value:cont});
        
            await project.createRequest('Buy Other things', web3.utils.toWei('3', 'ether'), 
            accounts[3], {from:accounts[0]});
        
            await project.approveRequest(0, {from:accounts[1]});
            await project.approveRequest(0, {from:accounts[0]});

            await project.finalizeRequest(0, {from:accounts[0]});
        
           
          });


    })

})