// @ts-nocheck
import React, {Fragment, useRef} from 'react';

import { useHistory } from 'react-router-dom';

import Slider from "../../components/Slider/Slider";
import Categories from "../../components/Categories"

import man from '../../assets/images/man.jpg';
import woman from '../../assets/images/woman.jpg';
import woman_excersising from '../../assets/images/woman_excersising.jpg';
import happy_guys from '../../assets/images/happy_guys.jpg';
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

            <div className="_about_shop_area">
                <Icon name="window minimize yellow big"></Icon>
                <div className="container _main_padding">
                    <div className="row">
                    <div className="col-lg">
                        <Image src={happy_guys} />
                    </div>
                    <div className="col-lg">
                        <Header as="h1">
                            O nás
                        </Header>
                        <Header size="medium">
                            Sme skupina mladých ľudí, ktorých zaujíma šport. 
                            <br/>
                            <br/>
                            Spolu s našou vášňou chceme
                            ľuďom ponúknuť kvalitný a užitočný produkt, 
                            <br/>
                            <br/>
                            na ktorý, keď sa pozriete vám pripomenie si vyjsť
                            do prírody či si zacvičiť s radosťou.
                            <Divider horizontal>Sídlo:</Divider>Slovensko, Žilinksý kraj, Namestovský okres, Ťapešovo126
                            <Divider horizontal>Kontakt:</Divider>Tel.č: 0915 289 825 <br/>
                            Gmail: maros.papan126@gmail.com<br/>
                            
                        </Header>
                    </div>
                    </div>
                </div>
            </div>

            <div className="_about_shop_area">
            <Icon name="window minimize yellow big"></Icon>
            <Header as="h1" className="_main_margin">Mapa</Header>
            <br/>
            <br/>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d20782.675965590053!2d19.427763509030505!3d49.37420451315819!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4715c83969c5447f%3A0x6917d0466c9eb0cd!2zxaRhcGXFoW92byA1OSwgMDI5IDUxIMWkYXBlxaFvdm8!5e0!3m2!1ssk!2ssk!4v1614156857996!5m2!1ssk!2ssk" width="1080" height="450" style={{border: 0}} allowFullScreen="" loading="lazy"></iframe>
            </div>

        </>
    )
};

export default Homepage;