import React, {useState} from "react";
import { Form, Input, Button, Message } from "semantic-ui-react";
import web3 from "../ethereum/web3";
import Project_Contract from "../ethereum/projects";
import {Router} from "../routes"

const AddRequestForm = (props) => {
    const [Desc, setDesc] = useState('');
    const [Amount, setAmount] = useState('');
    const [Recipient, setRecipient] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const submitHandler = async (event) =>{
        event.preventDefault();
        setErrorMessage('');
        setLoading(true);
        try{
            const accounts = await web3.eth.getAccounts();
            const project = Project_Contract(props.address);
            await project.methods
            .createRequest(Desc, web3.utils.toWei(Amount, 'ether'), Recipient)
            .send({from: accounts[0]});
            Router.replaceRoute(`/projects/${props.address}/requests`);
        }catch(err){
            setErrorMessage(err.message);
        }
        setLoading(false);
    }

    return (
        <Form onSubmit={submitHandler} error={!!errorMessage}>
            
            <Form.Field>
                <label>Description</label>
                <Input value={Desc} onChange={event => setDesc(event.target.value)}/>
            </Form.Field>
            <Form.Field>
                <label>Amount</label>
                <Input label="Ether" labelPosition="right" value={Amount} onChange={event => setAmount(event.target.value)}/>
            </Form.Field>
            <Form.Field>
                <label>Recipient</label>
                <Input value={Recipient} onChange={event => setRecipient(event.target.value)}/>
            </Form.Field>
            <Message error header="Oops!" content={errorMessage}/>
            <Button loading={loading} secondary>Create</Button>
        </Form>
    )
}


export default AddRequestForm;