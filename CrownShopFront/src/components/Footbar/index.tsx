// @ts-nocheck
import React from 'react';

import crown from '../../assets/images/crown.svg';
import './style.scss'

const Footbar = (props) => {
    return(
        <div className="footbar">
            <div className="_footer-child">
                <img src={crown} />
                <h4>CrownShop</h4>
            </div>
        </div>
    )
}

export default Footbar;