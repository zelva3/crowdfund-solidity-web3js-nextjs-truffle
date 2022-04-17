import React from "react";
import Layout from "../../components/Layout";
import Project_Contract from "../../ethereum/projects";
import { Card, Grid, Button } from 'semantic-ui-react'
import web3 from "../../ethereum/web3";
import ContributeForm from "../../components/ContributeForm";
import { Link } from '../../routes';

const Show = (data) => {



    return (
        <Layout>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={10}>
                        {renderCards(data)}
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <ContributeForm address={data.project_address} />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <Link route={`/projects/${data.project_address}/requests`}>
                            <a><Button primary>View Requests</Button></a>
                        </Link>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Layout>
    )
}

Show.getInitialProps = async (props) => {
    const project_contract = Project_Contract(props.query.address)
    const summary = await project_contract.methods.getSummary().call()

    return ({
        project_address: props.query.address,
        numOfRequests: summary[0],
        minContribution: summary[1],
        totalContributors: summary[2],
        ProjectBalance: summary[3],
        Creator: summary[4]
    })
}

function renderCards(data) {

    const items = [
        {
            header: data.Creator,
            meta: "Address of Creator",
            description:
                "Person of address person created this project and can create requests to withdraw money",
            style: { overflowWrap: "break-word" },
        },
        {
            header: data.minContribution,
            meta: "Minimum Contribution (wei)",
            description:
                "You must contribute at least this much wei to become an approver",
        },
        {
            header: data.numOfRequests,
            meta: "Number of Requests",
            description:
                "A request tries to withdraw money from the contract. Requests must be approved by approvers",
        },
        {
            header: data.totalContributors,
            meta: "Number of Contributors",
            description:
                "Number of people who have already donated to this project",
        },
        {
            header: web3.utils.fromWei(data.ProjectBalance, "ether"),
            meta: "Project Balance (ether)",
            description:
                "The balance is how much money this project has left to spend.",
        },

    ]

    return (
        <Card.Group items={items} />
    );
}

export default Show;

