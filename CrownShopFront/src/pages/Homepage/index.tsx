// @ts-nocheck
import React, {Fragment, useRef} from 'react';

import Slider from "../../components/Slider/Slider";
import Categories from "../../components/Categories"

import man from '../../assets/images/man.jpg';
import woman from '../../assets/images/woman.jpg';
import minus from '../../assets/images/minus.svg';
import './style.scss';
import '../../bootstrap/css/bootstrap.css';


const Homepage = (props) => {

    const images = [man, woman];
    return (
        <>
            <Slider slides={images}/>

            <Categories />
        </>
    )
};

export default Homepage;