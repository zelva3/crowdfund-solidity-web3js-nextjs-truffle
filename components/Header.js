
import React from "react";
import { Menu } from 'semantic-ui-react';
import { Link } from "../routes";

const Header = () => {
    return (
        <Menu style={{ marginTop: '20px' }}>
            {/* <Menu.Item>
                Crowd Fund
            </Menu.Item> */}
            <Link route='/'>
                <a className="item">Crowd Fund</a>
            </Link>
            <Menu.Menu position="right">
                <Link route='/'>
                    <a className="item">Projects</a>
                </Link>
                <Link route='/projects/new'>
                    <a className="item">+</a>
                </Link>
            </Menu.Menu>

        </Menu>
    )
}

export default Header;