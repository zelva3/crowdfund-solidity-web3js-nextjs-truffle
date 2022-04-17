import React from "react";
import Layout from "../../../components/Layout";
import { Link } from "../../../routes";
import { Grid, Button, Table } from "semantic-ui-react";
import web3 from "../../../ethereum/web3";
import Project_Contract from "../../../ethereum/projects";
import RequestRow from "../../../components/RequestRow";

const RequestIndex = (props) => {

    const RenderTable = () => {
        const { Header, Row, HeaderCell, Body, Cell } = Table;
        return (
            <Table celled>
                <Header>
                    <Row>
                        <HeaderCell>ID</HeaderCell>
                        <HeaderCell>Description</HeaderCell>
                        <HeaderCell>Amount</HeaderCell>
                        <HeaderCell>Recipient</HeaderCell>
                        <HeaderCell>Approval Count</HeaderCell>
                        <HeaderCell>Approve</HeaderCell>
                        <HeaderCell>Finalize</HeaderCell>
                    </Row>
                </Header>
                <Body>
                    {
                        (props.requestCount == 0) ?
                            <Row>
                                <Cell colSpan='7' textAlign="center">
                                    No Requests Found..
                                </Cell>
                            </Row>
                            :
                            props.requests.map((req, index) => {
                                return (
                                    <RequestRow
                                        key={index}
                                        id={index}
                                        address={props.address}
                                        description={req.description}
                                        amount={req.value}
                                        recipient={req.recipient}
                                        isComplete={req.isComplete}
                                        approvalcount={req.approvalCount}
                                        totalContributors={props.totalContributors}
                                    />
                                )
                            })
                    }

                </Body>
            </Table>
        )
    }
    return (
        <Layout>
            <h3>Requests</h3>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={8}>
                        <Link route={`/projects/${props.address}`}>
                            <a><Button primary>Go Back</Button></a>
                        </Link>
                    </Grid.Column>
                    <Grid.Column width={8} >
                        <Link route={`/projects/${props.address}/requests/newrequest`}>
                            <a>
                                <Button primary floated='right'>
                                    Add Payment Request
                                </Button>
                            </a>
                        </Link>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <RenderTable />
                    <div>
                        Found {props.requestCount} requests.
                    </div>
                </Grid.Row>
            </Grid>
        </Layout>
    )
}

RequestIndex.getInitialProps = async (props) => {
    const address = props.query.address;
    const Project = Project_Contract(address);
    const requestCount = await Project.methods.numOfRequests().call();
    const totalContributors = await Project.methods.totalContributors().call();

    const requests = await Promise.all(
        Array(parseInt(requestCount))
            .fill()
            .map((element, index) => {
                return Project.methods.requests(index).call();
            })
    );

    return { address: address, requestCount: requestCount, requests: requests, totalContributors: totalContributors };
}

export default RequestIndex;