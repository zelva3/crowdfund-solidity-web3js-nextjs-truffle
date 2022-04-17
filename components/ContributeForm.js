import React, {useState} from "react";
import {Input, Form, Button, Message } from 'semantic-ui-react';
import web3 from "../ethereum/web3";
import Project_Contract from "../ethereum/projects";
import { Router } from "../routes";


const ContributeForm = (props) =>{

    const [cont_amount, setContAmnt] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const submitHandler = async(event) =>{
        event.preventDefault();
        setErrorMessage('');
        setLoading(true);
        try{
            const accounts = await web3.eth.getAccounts();
            const Project = Project_Contract(props.address);
            await Project.methods
            .contribution().send({value: web3.utils.toWei(cont_amount, "ether"), from:accounts[0]});
            // Router.reload();
            Router.replaceRoute(`/projects/${props.address}`);
        }catch(err){
            setErrorMessage(err.message);
        }
        setLoading(false);
    }
    return (
        <Form onSubmit={submitHandler} error={!!errorMessage}>
            <Form.Field>
                <label>Amount to contribute</label>
                <Input label="ether" value={cont_amount} onChange={event => setContAmnt(event.target.value)} labelPosition="right"/>
            </Form.Field>
            <Message error header="Oops!" content={errorMessage}/>
            <Button loading={loading} primary>Contribute</Button>
        </Form>
    );
}

export default ContributeForm;