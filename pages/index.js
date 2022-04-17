import React from 'react';

import { Card, Button } from 'semantic-ui-react';
import Layout from '../components/Layout';
import CrowdFund_Contract from '../ethereum/crowdfund';
import { Link } from '../routes';

let deployedContracts;

const index = ({ projects }) => {

    const items = projects.map(project => {
        return {
            header: project.name,
            meta:project.contractaddress,
            description: (
                <>
                <p>{project.desc}</p>
                <Link route={`/projects/${project.contractaddress}`}>
                    <a>View Project</a>
                </Link>
                </>
                
            ),
            fluid: true
        }
    })
    return (
        <Layout>
            <h3>
                Projects
            </h3>
            <Link route='/projects/new'>
            <Button
                floated='right'
                content='Create Project'
                icon='add circle'
                labelPosition='left'
                primary />
            </Link>
            <Card.Group items={items} />
        </Layout>
    )
}

index.getInitialProps = async () => {

    const projectsCount = await CrowdFund_Contract.methods.projectsCount().call()
    const projects = await Promise.all(
        Array(parseInt(projectsCount))
            .fill()
            .map((element, index) => {
                return CrowdFund_Contract.methods.deployedprojects(index).call();
            })
    );
    return { projects: projects };
}

export default index;