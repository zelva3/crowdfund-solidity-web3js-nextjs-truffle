import React from 'react';
import { Table, Button } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import Project_Contract from '../ethereum/projects';
import { Router } from '../routes'

const RequestRow = (props) => {


    const onApprove = async () => {
        const accounts = await web3.eth.getAccounts();
        const Project = Project_Contract(props.address);
        await Project.methods
            .approveRequest(props.id)
            .send({ from: accounts[0] });
        Router.replaceRoute(`/projects/${props.address}/requests`);
    }
    const onFinalize = async () => {
        const accounts = await web3.eth.getAccounts();
        const Project = Project_Contract(props.address);
        await Project.methods
            .finalizeRequest(props.id)
            .send({ from: accounts[0] });
        Router.replaceRoute(`/projects/${props.address}/requests`);
    }
    const { Row, Cell } = Table;

    const readytoFinalize = props.approvalcount > props.totalContributors/2;
    return (
        <Row disabled={props.isComplete} positive={readytoFinalize && !props.isComplete}>
            <Cell>{props.id + 1}</Cell>
            <Cell>{props.description}</Cell>
            <Cell>{web3.utils.fromWei(props.amount, 'ether')}</Cell>
            <Cell>{props.recipient}</Cell>
            <Cell>{props.approvalcount}/{props.totalContributors}</Cell>
            {
                (!props.isComplete) ?
                    <>
                        <Cell>
                            <Button color="green" onClick={onApprove}>Approve</Button>
                        </Cell>
                        <Cell>
                            <Button color="teal" onClick={onFinalize}>Finalize</Button>
                        </Cell>
                    </>

                    :
                    <Cell colSpan='7' textAlign="center">
                        Payment Issued!
                    </Cell>
            }

        </Row>
    )
}

export default RequestRow;