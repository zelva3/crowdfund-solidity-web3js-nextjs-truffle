import React, { useState } from "react";
import Layout from "../../components/Layout";
import { Button, Form, Input, Message } from "semantic-ui-react";
import CrowdFund_Contract from '../../ethereum/crowdfund';
import web3 from "../../ethereum/web3";
import {Router} from '../../routes';

const New = () => {
    const [minContribution, setMinContribution] = useState('');
    const [projectName, setProjectName] = useState('');
    const [projectDesc, setProjectDesc] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const submitHandler = async (event) =>{
        event.preventDefault();
        setLoading(true);
        setErrorMessage('');
        try{
            const accounts = await web3.eth.getAccounts();
            await CrowdFund_Contract.methods
            .createNewProject(projectName, projectDesc, minContribution).send({from:accounts[0]});
            Router.pushRoute('/');
        }catch(err){
            setErrorMessage(err.message);
        }
        setLoading(false);
    }
    return (
        <Layout>
            <h3>
                Create a Project
            </h3>
            <Form onSubmit={submitHandler} error={!!errorMessage}>
                <Form.Field>
                    <label>
                        Project Name
                    </label>
                    <Input 
                    value={projectName}
                    onChange={event => setProjectName(event.target.value)}
                    />
                </Form.Field>
                <Form.Field>
                    <label>
                        Project Description
                    </label>
                    <Input 
                    value={projectDesc}
                    onChange={event => setProjectDesc(event.target.value)}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Minimum Contribution</label>
                    <Input
                        label="Wei"
                        labelPosition="right"
                        value={minContribution}
                        onChange={event => setMinContribution(event.target.value)}
                    />
                </Form.Field>
                <Message error header="Oops!" content={errorMessage}/>
                <Button loading={loading} secondary>Create</Button>
            </Form>
        </Layout>
    )
}

export default New;