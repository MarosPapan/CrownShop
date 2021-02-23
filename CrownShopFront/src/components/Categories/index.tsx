// @ts-nocheck
import React, {Fragment, useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import fitness from '../../assets/images/fitness.png';
import running from '../../assets/images/running.png';
import soccer from '../../assets/images/soccer.png';

import { activeCategoryInit } from "./activeCategorySlice";

import { 
    Icon,
    Grid, 
    Image,
    Header,
    Divider,
    Button
} from 'semantic-ui-react' 
import './style.scss';
import '../../bootstrap/css/bootstrap.css';


const Categories = (props) => {

    const history = useHistory();
    const dispatch = useDispatch();
    const {category} = useSelector(state => state.activeCategory);

    const getActiveCategory = (category) => {
        dispatch(activeCategoryInit(category));
        history.push('/products');
    };

    useEffect(() => {
        console.log(category);
    }, [category]);

    return (
        <div className="_categories">
                <br/>
                <Icon name="window minimize yellow big"></Icon>
                <Header as="h1" className="_main_margin">Kategórie v ktorých sa špecializujeme</Header>
                <br/>
                <br/>
            <div className="row _center_content">
                <div className="card col-md-3 " onClick={() => getActiveCategory("Football")}>
                    <img src={soccer} className="card-img-top" />
                    <div className="card-body">
                        <Divider horizontal>Futbal</Divider>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                </div>

                <div className="card col-md-3" onClick={() => getActiveCategory("Running")}>
                    <img src={running} className="card-img-top" />
                    <div className="card-body">
                        <Divider horizontal>Beh</Divider>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                </div>

                <div className="card col-md-3" onClick={() => getActiveCategory("Excersising")}>
                    <img src={fitness} className="card-img-top" />
                    <div className="card-body">
                        <Divider horizontal>Cvičenie</Divider>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                </div>
            </div>
        </div>

    )
};

export default Categories;
