// @ts-nocheck
import React, {Fragment, useRef} from 'react';

import fitness from '../../assets/images/fitness.png';
import running from '../../assets/images/running.png';
import soccer from '../../assets/images/soccer.png';
import './style.scss';
import '../../bootstrap/css/bootstrap.css';


const Categories = (props) => {

    return (
        <div className="_categories">
            <div className="card">
                <img src={soccer} className="card-img-top" />
                <div className="card-body">
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div>
            </div>

            <div className="card">
                <img src={running} className="card-img-top" />
                <div className="card-body">
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div>
            </div>

            <div className="card">
                <img src={fitness} className="card-img-top" />
                <div className="card-body">
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div>
            </div>
        </div>

    )
};

export default Categories;
