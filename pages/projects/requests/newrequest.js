import React from "react";
import Layout from "../../../components/Layout";
import AddRequestForm from "../../../components/AddRequestForm";
import { Link } from "../../../routes";
import { Button, Grid } from "semantic-ui-react";

const NewReq = ({ address }) => {
    return (
        <Layout>
            <h3>Create Payment Request</h3>
            <Grid>
                <Grid.Row>
                    <Grid.Column>
                        <Link route={`/projects/${address}/requests`}>
                            <a><Button primary>Go Back</Button></a>
                        </Link>
                    </Grid.Column>

                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <AddRequestForm address={address} />
                    </Grid.Column>
                </Grid.Row>
            </Grid>


        </Layout>
    )
}

NewReq.getInitialProps = (props) => {
    const address = props.query.address;
    return { address: address };
}

export default NewReq;