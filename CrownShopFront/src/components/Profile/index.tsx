// @ts-nocheck
import React, {Fragment, useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
    BrowserRouter as Router,
    Link,
    useHistory,
    userRouteMatch
 } from "react-router-dom";

 import { 
    Icon,
    Dropdown, 
    Menu, 
    Divider,
    Item, 
    Header,
    Grid,
    Form
  } from 'semantic-ui-react';
import crown from '../../assets/images/crown.svg';
import "./style.scss";
import '../../bootstrap/css/bootstrap.min.css';


const Profile = () => {

    const [profileMenu, setProfileMenu] = useState({
        activeItem: 'billingAddress',
    });

    const { activeItem } = profileMenu

    const handleItemClick = (name) => {
        console.log("NAV ACTIVE: ", name);
        setProfileMenu({ activeItem: name })
    }

    return (
        <Grid container columns={2} >
            <Grid.Row>
                <Grid.Column width={6}>
                <Menu pointing secondary vertical position='right'>
                    <Menu.Item
                    name='Billing Address'
                    active={activeItem === 'billingAddress'}
                    onClick={() => handleItemClick('billingAddress')}
                    />
                    <Menu.Item
                    name='Shiping Address'
                    active={activeItem === 'shippingAddress'}
                    onClick={() => handleItemClick('shippingAddress')}
                    />
                </Menu>
                </Grid.Column>
                <Grid.Column width={10}>
                    <Header>Profile</Header>
                    <Divider></Divider>
                        <h3>{`${
                            activeItem === 'billingAddress' ? "Billing Address" : "Shipping Address"
                        }`}</h3>
                        <Form>
                            <Form.Input name='street_address' placeholder="Street address" />
                            <Form.Input name='apartment_address' placeholder="Apartment address" />
                            {/* Selctor field for country */}
                            <Form.Input name='zip' placeholder="Zip code" />
                            <Form.Checkbox name='default' label="Make this default address?" />
                            <Form.Button color="yellow">Save</Form.Button>
                        </Form>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
};

export default Profile;
