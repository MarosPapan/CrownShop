//@ts-nocheck
import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Elements, 
    CardElement,  
    useElements, 
    useStripe, 
} from '@stripe/react-stripe-js';
import { useHistory, Link } from 'react-router-dom';
import Promise from 'bluebird'; 
import axios from 'axios'; 

import CouponForm from '../../components/CouponForm';

import { getAdressesInit } from '../../components/Profile/getAdressesSlice';
import { paymentInit } from './paymentSlice';

import { getAddressesApi } from '../../components/Profile/api';

import {
    Message,  
    Container,
    Button,
    Item,
    Divider,
    Header,
    Loader,
    Segment,
    Dimmer, 
    Image,
    Icon,
    Label,
    Select,
    Dropdown
  } from 'semantic-ui-react';
import CartWatcherSaga from 'components/Cart/saga';


const OrderPrewiev = () => {

    const { cart, loading, loaded, error } = useSelector(state => state.cart)

    return(
        <div>
            {loading && (
                 <Segment>
                 <Dimmer active inverted>
                   <Loader inverted content='Loading' />
                 </Dimmer>
           
                 <Image src='' />
               </Segment>
            )}
            {loaded && (
                <>
                    {cart.order_items.map((order_item, i)=> {
                        return(
                            <Item.Group relaxed key={order_item.id}>
                                <Item>
                                <Item.Image size='tiny' src={`http://127.0.0.1:8000${order_item.item.image}`}/>

                                <Item.Content verticalAlign='middle'>
                                    <Item.Header as='a'>
                                        {order_item.item.title}
                                    </Item.Header>
                                    <Item.Extra>
                                        <Button primary floated="right">
                                        množstvo: {order_item.quantity}x
                                        </Button>
                                        <Label>${order_item.final_price }</Label>
                                    </Item.Extra>
                                </Item.Content>
                                </Item>

                            </Item.Group>
                        )
                    })}

                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Item.Header>Celková suma objednávky: ${cart.total}
                                {cart.coupon && (
                                    <Label color="green" style={{marginLeft: '10px'}}>
                                        Aktuálny kupón: {cart.coupon.code} for {cart.coupon.amount}
                                    </Label>
                                )}
                                </Item.Header>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </>
            )}
        </div>
    )
};

const Payment = () => {

    const [shippingAddress, setShippingAddress] = useState([]);
    const [billingAddress, setBillingAddress] = useState([]);
    const [selectedBillingAddress, setSelectedBillingAddress] = useState([]);
    const [selectedShiipingAddress, setSelectedShippingAddress] = useState([]);

    const dispatch = useDispatch();
    const stripe = useStripe();

    const elements = useElements();


    const handleOnSelectChange = (e, {value, name}) => {
        if (name === "selectedShippingAddress"){
            setSelectedShippingAddress(value);
        }else{
            setSelectedBillingAddress(value);
        };
    };

    const handleGetDefaultAddress = (addresses) => {
        const filteredAddresses = addresses.filter(el => el.default === true);
        if (filteredAddresses.length > 0){
            return filteredAddresses[0].id;
        }
        return '';
    }

    const handleFetchBillingAddresses = (address_type) => {
        return new Promise((resolve, reject) => {
            axios({
                method: 'get',
                url: `http://127.0.0.1:8000/api/addresses/?address_type=${address_type}`,
                headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`
                },
            })
            .then((response) => {
                setBillingAddress(
                    response.data.map(a => {
                    return {
                        key: a.id,
                        text: `${a.street_address}, ${a.apartment_address}, ${a.country}, ${a.zip_code}`,
                        value: a.id
                    };
                })
                )
                setSelectedBillingAddress(handleGetDefaultAddress(response.data))
            }
            )
            .catch((error) => {
                return reject(error);
            })
        });
    }; 

    const handleFetchShippingAddresses = (address_type) => {
        return new Promise((resolve, reject) => {
            axios({
                method: 'get',
                url: `http://127.0.0.1:8000/api/addresses/?address_type=${address_type}`,
                headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`
                },
            })
            .then((response) => {
                setShippingAddress(
                    response.data.map(a => {
                    return {
                        key: a.id,
                        text: `${a.street_address}, ${a.apartment_address}, ${a.country}, ${a.zip_code}`,
                        value: a.id
                    };
                }),

                );

                setSelectedShippingAddress(handleGetDefaultAddress(response.data))
            })
            .catch((error) => {
                return reject(error);
            })
        });
    };

    const {error, loading, success} = useSelector(state => state.payment);
    const {cart} = useSelector(state => state.cart);

    const handleOnPay = async (event) => {
        event.preventDefault();
        const card = elements.getElement(CardElement);
        let result = await stripe.createToken(card);
        let token = result.token.id;
        dispatch(paymentInit([token, selectedBillingAddress, selectedShiipingAddress]));
    }
    
    useEffect(() => {
        handleFetchBillingAddresses('B');
        handleFetchShippingAddresses('S');
    }, []);

    useEffect(() => {
           
    },[shippingAddress, billingAddress]);



    return(
        <div className="_payment">
            <Container text>
                {error && (
                    <Message negative>
                    <Message.Header>Tvoja platba nebola úspešná</Message.Header>
                    <p>Skús ešte raz neskôr: {JSON.stringify(error)}</p>
                  </Message>
                )}
                {success && (
                    <Message info>
                        <Message.Header>Objednávka uspešne zaslaná</Message.Header>
                  </Message>
                )}

                <OrderPrewiev/>
                <Divider></Divider>
                <CouponForm/>


                <Divider />
                <Header>Vyberte dodaciu adresu</Header>
                {shippingAddress.length > 0 ? (
                    <Select 
                        name="selectedShippingAddress"
                        value={selectedShiipingAddress} 
                        clearable 
                        options={shippingAddress} 
                        selection
                        onChange={handleOnSelectChange} 
                    />
                ) : (
                    <p>Potrebuješ<Link to="/profile">pridať dodaciu adresu</Link></p>
                )}
                <br></br>
                <Header>Vyberte fakturačnú adresu </Header>
                {billingAddress.length > 0 ? (
                    <Select 
                        name="selectedBillingAddress"
                        value={selectedBillingAddress}
                        clearable 
                        options={billingAddress} 
                        selection
                        onChange={handleOnSelectChange}  
                    />
                ) : (
                    <p>Potrebuješ<Link to="/profile">pridať fakturačnú adresu</Link></p>
                )}
                <Divider />

                {billingAddress.length < 1 || shippingAddress.length < 1 ? (
                    <p>Potrebuješ<Link to="/profile"> pridať adresy</Link></p>
                    
                    ) : (
                    <Fragment>
                        <Header>Vyplňte svoju objednávku</Header>
                            <form onSubmit={handleOnPay}>
                                <CardElement 
                                    options={{
                                        style: {
                                        base: {
                                            fontSize: '16px',
                                            color: '#424770',
                                            '::placeholder': {
                                            color: '#aab7c4',
                                            },
                                        },
                                        invalid: {
                                            color: '#9e2146',
                                        },
                                        },
                                    }}
                                />
                                <Button 
                                    loading={loading}
                                    disabled={loading}
                                    primary 
                                    type="submit" 
                                    // disabled={!stripe} 
                                    style={{ marginTop: '20px' }}>Zaplať</Button>
                            </form>
                    </Fragment>
                )}
            </Container>
        </div>
    )    
};

export default Payment;
