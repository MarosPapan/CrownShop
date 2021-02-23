// @ts-nocheck
import React, {Fragment, useRef} from 'react';

import { useHistory } from 'react-router-dom';

import Slider from "../../components/Slider/Slider";
import Categories from "../../components/Categories"

import man from '../../assets/images/man.jpg';
import woman from '../../assets/images/woman.jpg';
import woman_excersising from '../../assets/images/woman_excersising.jpg';
import { 
    Icon,
    Grid, 
    Image,
    Header,
    Divider,
    Button
} from 'semantic-ui-react' 
import '../../bootstrap/css/bootstrap.css';
import './style.scss';



const Homepage = (props) => {

    const history = useHistory();

    const images = [man, woman];
    return (
        <>
            <Slider slides={images}/>
            <div className="_about_shop_area">
                <Icon name="window minimize yellow big"></Icon>
                <div className="container _main_padding">
                    <div className="row">
                    <div className="col-lg">
                        <Header as="h1">
                            Náš cieľ
                        </Header>
                        <Header size="medium">
                            Veríme, že šport a pobyt v prírode prináša radosť do života.
                            <br/>
                            <br/>
                            Preto vyrábame kvalitné športové tričká s jednoduchým a pekným dizajnom,
                            <br/>
                            <br/> 
                            ktoré vám spríjemnia zážitok z vaších športových či už prírodných dobrodružstiev.  
                        </Header>
                        <br></br>
                        <Divider horizontal>Obchod</Divider>
                        <div className="_center_items">
                            <Button 
                            basic 
                            color="teal" c
                            className="_center_items"
                            onClick={() => history.push("/products")}
                            >
                                <Icon name="shopping basket"/>Nakupovať
                            </Button>
                        </div>
                        
                    </div>
                    <div className="col-lg">
                        <Image src={woman_excersising} />
                    </div>
                    </div>
                </div>
            </div>
            <Categories />
        </>
    )
};

export default Homepage;