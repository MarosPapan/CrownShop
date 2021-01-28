//@ts-nocheck
import React, { Fragment, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import {
    addCouponInit
} from './addCouponSlice';


import {
    Button,
    Form,
  } from 'semantic-ui-react';

const CouponForm = () => {

    const [code, setCode] = useState('')

    const dispatch = useDispatch();

    const handle_on_change = (e) => {
        setCode(e.target.value);
    }

    const handle_on_coupon = (e) => {
        e.preventDefault();
        const coupon = code;
        dispatch(addCouponInit(coupon));
    };

    return(
        <div className="_coupon_form">
            <Form onSubmit={(e) => handle_on_coupon(e, code)}>
                <Form.Field>
                <label>Coupon code</label>
                <input 
                    placeholder='Enter Coupon'
                    value={code}
                    onChange={handle_on_change}
                />
                </Form.Field>
                <Button type='submit'>Enter Coupon</Button>
            </Form>
        </div>
    );    
};

export default CouponForm;
