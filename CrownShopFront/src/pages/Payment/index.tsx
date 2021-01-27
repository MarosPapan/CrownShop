//@ts-nocheck
import React, { Fragment } from 'react';
import {
    Elements, 
    CardElement,  
    useElements, 
    useStripe 
} from '@stripe/react-stripe-js';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { paymentInit } from './paymentSlice';

import {
    Message,  
    Container,
    Button
  } from 'semantic-ui-react';

const Payment = () => {

    const dispatch = useDispatch();
    const stripe = useStripe();

    const elements = useElements();

    const {error, loading, success} = useSelector(state => state.payment);

    const handleOnPay = async (event) => {
        event.preventDefault();
        const card = elements.getElement(CardElement);
        let result = await stripe.createToken(card);
        let token = result.token.id;
        //console.log("it is working ", token);
        dispatch(paymentInit(token));
    }
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
                <h2>Complete your order</h2>
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
