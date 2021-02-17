// @ts-nocheck
import React, {Fragment, useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
    BrowserRouter as Router,
    Link,
    useHistory,
    userRouteMatch
 } from "react-router-dom";

import Promise from 'bluebird'; 
import axios from 'axios'; 


import { getAdressesInit } from './getAdressesSlice';
import { createAddressInit, updateAddressInit, deleteAddressInit } from './createAddressSlice';

 import { 
    Icon,
    Dropdown, 
    Menu, 
    Divider,
    Item, 
    Header,
    Grid,
    Form,
    Loader,
    Message,
    Segment,
    Dimmer,
    Image,
    Select, 
    Card,
    Label,
    Button
  } from 'semantic-ui-react';
import crown from '../../assets/images/crown.svg';
import "./style.scss";
import '../../bootstrap/css/bootstrap.min.css';
import { callbackify } from 'util';


const UPDATE_FORM = "UPDATE_FORM";
const CREATE_FORM = "CREATE_FORM";

const AddressForm = ({ countries, formType, updatingAddress, userId, activeItem, callback }) => {

    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        address_type: "",
        apartment_address: "",
        country: "",
        id: "",
        street_address: "",
        user: null,
        zip_code: "",
        default: false,
    })

    const { loading, loaded, data } = useSelector(state => state.Addresses);
    const { creating, created, address, error } = useSelector(state => state.CreateAddress);

    const handleOnChange = (e) => {
        const updateFormData = {
            ...formData, 
            [e.target.name]: e.target.value
        };

        setFormData(updateFormData);
    };

    const handleToggleDefault = () => {
        const updateFormData = {
            ...formData, 
            default: !formData.default
        };

        setFormData(updateFormData);
    }

    const handleOnSelectChange = (e, {name ,value}) => {
        const updateFormData = {
            ...formData, 
            [name]: value
        };

        setFormData(updateFormData);
    }

    const handleSubmit = e => {
        e.preventDefault();
        if (formType === UPDATE_FORM) {
            handleUpdateAddress();
        } else{
            handleCreateAddress();
        }
    };

    const handleCreateAddress = e => {
        const addressType = activeItem === 'billingAddress' ? 'B' : 'S'
        const addressData = {
            ...formData,
            user: userId,
            address_type: addressType
        }
        dispatch(createAddressInit(addressData));
        callback(); 
    };

    const handleUpdateAddress = e => {
        const addressType = activeItem === 'billingAddress' ? 'B' : 'S'
        const addressData = {
            ...formData,
            user: userId,
            address_type: addressType
        }
        dispatch(updateAddressInit(addressData));
        callback();
    };

    useEffect(() => {
        if (formType === UPDATE_FORM) {
            setFormData(updatingAddress);
        }
    },[formType]);

    useEffect(() => {

    }, [formData]);

    return (
        <Form onSubmit={handleSubmit} success={created} error={error}> 
                            <Form.Input 
                                required
                                name='street_address' 
                                placeholder="Street address" 
                                onChange={handleOnChange}
                                value={formData.street_address}
                            />
                            <Form.Input 
                                required
                                name='apartment_address' 
                                placeholder="Apartment address" 
                                onChange={handleOnChange}
                                value={formData.apartment_address}
                            />
                            <Form.Field>
                            <Select
                                loading={countries.length < 1}
                                clearable 
                                search
                                options={countries}
                                name='country'
                                placeholder="Country"
                                onChange={handleOnSelectChange}
                                value={formData.country}
                            />
                            </Form.Field>
                            <Form.Input 
                                required
                                name='zip_code' 
                                placeholder="Zip code"
                                value={formData.zip_code}
                                onChange={handleOnChange} 
                            />
                            <Form.Checkbox 
                                name='default' 
                                label="Make this default address?" 
                                onChange={handleToggleDefault}
                                checked={formData.default}
                            />
                            {created && (
                                <Message
                                success
                                header="Succesfully created Address"
                                content="Your address was saved"
                                />
                            )}
                            {error && (
                                <Message
                                    error
                                    header="There was some error"
                                    content={JSON.stringify(error)}
                                    
                                />
                            )}
                            <Form.Button disabled={creating} loading={creating} color="yellow">
                                    Save
                            </Form.Button>
                        </Form>
    );
};





const Profile = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const [userId, setUserID] = useState('');
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [profileMenu, setProfileMenu] = useState({
        activeItem: 'billingAddress',
    });
    const [countries, setCountries] = useState([]);

    const { activeItem } = profileMenu;

    const { 
        loading, 
        loaded, 
        data, 
        error
    } = useSelector(state => state.Addresses);

    const { created, address } = useSelector(state => state.CreateAddress)

    const handleFetchCountries = () => {
        return new Promise((res, reject) => {
            axios({
                method: 'get',
                url: 'http://127.0.0.1:8000/api/countriesList',
                headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`
                },
            })
            .then((response) => {
                setCountries(handleFormatCountries(response.data));
            })
            .catch(error => {
                return reject(error);
            })
        });
    };

    const handleFetchUserId = () => {
        return new Promise((res, reject) => {
            axios({
                method: 'get',
                url: 'http://127.0.0.1:8000/api/userID/',
                headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`
                },
            })
            .then((response) => {
                setUserID(response.data.userId);
            })
            .catch(error => {
                return reject(error);
            })
        });
    }

    const handleItemClick = (name) => {
        setProfileMenu({ activeItem: name })
    }

    const handleFormatCountries = nations => {
        const keys = Object.keys(nations);
        return keys.map(k => {
            return {
                 key: k,
                 text: nations[k],
                 value: k,
            }
        })
    }

    const handleDeleteAddress = (address) => {
        dispatch(deleteAddressInit(address));
        handleCallBack();
    };

    const handleSelectAddress = (addressID) => {
        setSelectedAddress(addressID);
    };

    const handleCallBack = () => {
        const { activeItem } = profileMenu;
        const adrressType = activeItem === 'billingAddress' ? 'B': 'S';
        dispatch(getAdressesInit(adrressType));
        setSelectedAddress(null);
    }

    useEffect(() => {
        const { activeItem } = profileMenu;
        const adrressType = activeItem === 'billingAddress' ? 'B': 'S';
        handleFetchCountries();
        dispatch(getAdressesInit(adrressType));
        handleFetchUserId();
    }, [created]);

    useEffect(() => {
        const { activeItem } = profileMenu
        dispatch(getAdressesInit(activeItem === 'billingAddress' ? 'B': 'S'));
    }, [profileMenu.activeItem])
    return (
        <Grid container columns={2} >
            <Grid.Row columns={1}>
                <Grid.Column>
                    {error && (
                        <Message
                            error
                            header="There was some error"
                            content={JSON.stringify(error)}
                            
                        />
                    )}
                    {loading && (
                        <Segment>
                            <Dimmer active inverted>
                            <Loader inverted content='Loading' />
                            </Dimmer>
                    
                            <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
                      </Segment>
                    )}
                </Grid.Column>
            </Grid.Row>
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

                    <Menu.Item
                    name='paymentHistory'
                    active={activeItem === 'paymentHistory'}
                    onClick={() => handleItemClick('paymentHistory')}
                    />
                </Menu>
                </Grid.Column>
                <Grid.Column width={10}>
                    <Header>Profile</Header>
                    <Divider/>
                    <Card.Group>
                        {loaded === true ? (
                            <Fragment>
                            {data.map(address => {
                                return (
                                    <Card key={address.id}>
                                        <Card.Content>
                                            {address.default && <Label as='a' color='orange' ribbon='right'>
                                                Default
                                            </Label>}
                                            <Card.Meta>{address.address_type === 'B' ? 'Billing Address' : 'Shipping Address'}</Card.Meta>
                                            <br/>
                                            <Card.Header>{address.street_address}, {address.apartment_address}</Card.Header>
                                            <Card.Meta>{address.country}</Card.Meta>
                                            <Card.Description>{address.zip_code}</Card.Description>
                                        </Card.Content>
                                        <Card.Content extra>
                                            <div className='ui two buttons'>
                                            <Button 
                                            basic 
                                            color='green'
                                            onClick={() => handleSelectAddress(address)}
                                            >
                                                Update
                                            </Button>
                                            <Button onClick={() => handleDeleteAddress(address)} basic color='red'>
                                                Delete
                                            </Button>
                                            </div>
                                        </Card.Content>
                                        </Card>
                                )
                            })}
                            </Fragment>
                        ): (
                            <Fragment>
                                <Segment>
                                <Dimmer active inverted>
                                    <Loader inverted content='Loading' />
                                </Dimmer>

                                <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
                                </Segment>
                            </Fragment>
                        )}
                    </Card.Group>
                        <h3>{`${
                            activeItem === 'billingAddress' ? "Billing Address" : "Shipping Address"
                        }`}</h3>
                        {selectedAddress ? (
                            <AddressForm 
                            countries={countries} 
                            updatingAddress={selectedAddress} 
                            formType={UPDATE_FORM} 
                            userId={userId}
                            activeItem={activeItem}
                            callback={handleCallBack}
                            />
                        ) : (
                            <AddressForm 
                            countries={countries} 
                            formType={CREATE_FORM}
                            activeItem={activeItem}
                            callback={handleCallBack}
                            userId={userId} 
                            /> 
                        )}
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
};

export default Profile;
