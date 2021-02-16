//@ts-nocheck
import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Elements, 
    CardElement,  
    useElements, 
    useStripe, 
} from '@stripe/react-stripe-js';
import { useHistory } from 'react-router-dom';
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
                                        quantity: {order_item.quantity}x
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
                                <Item.Header>Order Total: ${cart.total}
                                {cart.coupon && (
                                    <Label color="green" style={{marginLeft: '10px'}}>
                                        Current coupon: {cart.coupon.code} for {cart.coupon.amount}
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

    const dispatch = useDispatch();
    const stripe = useStripe();

    const elements = useElements();

    const handleFetchBillingAddresses = () => {
        const billingAddress = getAddressesApi('B');
        setBillingAddress(billingAddress);
    }; 

    const handleFetchShippingAddresses = () => {
        const shippingAddress = getAddressesApi('S');
        setShippingAddress(shippingAddress);
    };

    const {error, loading, success} = useSelector(state => state.payment);
    const {cart} = useSelector(state => state.cart);

    const handleOnPay = async (event) => {
        event.preventDefault();
        const card = elements.getElement(CardElement);
        let result = await stripe.createToken(card);
        let token = result.token.id;
        //console.log("it is working ", token);
        dispatch(paymentInit(token));
    }
    
    useEffect(() => {
        handleFetchBillingAddresses();
        handleFetchShippingAddresses();
    }, [])

    useEffect(() => {
        console.log('This is billing address: ',billingAddress);
        console.log('This is shipping address: ', shippingAddress);
    },[billingAddress, shippingAddress]);


    return(
        <div className="_payment">
            <Container text>
                {error && (
                    <Message negative>
                    <Message.Header>Your payment was not successfull</Message.Header>
                    <p>Try again later: {JSON.stringify(error)}</p>
                  </Message>
                )}
                {success && (
                    <Message info>
                        <Message.Header>Your paymnet was sucessfull</Message.Header>
                        <p>See your order status</p>
                  </Message>
                )}

                <OrderPrewiev/>
                <Divider></Divider>
                <CouponForm/>
                <Header>Complete your order</Header>
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
                        style={{ marginTop: '20px' }}>Pay</Button>
                </form>
            </Container>
        </div>
    )    
};

export default Payment;
