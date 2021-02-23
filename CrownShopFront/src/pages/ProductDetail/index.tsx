// @ts-nocheck
import React, { Fragment, useEffect, useState } from 'react';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams, useRouteMatch } from 'react-router-dom';

import { getDetailProductInit } from './getDetailSlice';

 import {
    addToCartStart,
 } from "../../components/ProductList/addToCartSlice";

import { getCartItemsStart } from "../../components/Cart/getCartItemsSlice";

import { 
    Container,
    Card,
    Image,
    Icon,
    Dimmer,
    Loader,
    Segment,
    Grid,
    Button,
    Item,
    Header,
    Form,
    Divider,
    Select,
} from 'semantic-ui-react';
import './style.scss';

const ProductDetail = () => {

    const { url, path } = useRouteMatch();
    const params = useParams(); 
    const dispatch = useDispatch();
    const history = useHistory();

    const [ activeCategory, setActiveCategorie ] = useState('');

    const {added} = useSelector(state => state.addToCart);
    const {logged} = useSelector(state => state.login);
    const {loaded, data} = useSelector(state => state.detailProduct);


    const [ orderingForm, setOrderingForm] = useState({
        formData: {},
        visibleForm: false,
    });

    // changing selected variations to array: size: 5, color: 2 => [5, 2]
    const handleFormatData = (formData) => {
        return Object.keys(formData).map(key => {
            return formData[key];
        });
    };

    const handleAddToCart = (slug) => {
        const variations = handleFormatData(orderingForm.formData);
        dispatch(addToCartStart([slug, variations]));
      }

    const handleToggleForm = () => {
        const { visibleForm } = orderingForm;
        setOrderingForm({
            visibleForm: !visibleForm
        });
    };

    const handleChange = (e, {name, value}) => {
        const { formData } = orderingForm;
        const updatedForm = {
            ...formData,
            [name]: value
        };

        setOrderingForm({
            formData: updatedForm,
            visibleForm: true,
        });
    };

    useEffect(() => {
        dispatch(getDetailProductInit(params.productID))
    }, []);

    useEffect(() => {
        if(logged){
          dispatch(getCartItemsStart());
        }
      }, [added])

    useEffect(() => {
    }, [handleChange]);

    return(
        <div className="_detail_product">
            <Container>
            {loaded ? (
            <>
            <Grid columns={2} divided>
            <Grid.Row>
            <Grid.Column>
            <Card>
                <Image src={data.image} wrapped ui={false} />
                <Card.Content>
                <Card.Header>{data.title}</Card.Header>
                <Card.Meta>
                    <span className='date'>{data.category} - {data.label}</span>
                </Card.Meta>
                <Card.Description>
                    {data.description}
                </Card.Description>
                </Card.Content>
                <Card.Content extra>
                <h3>
                    {data.discount_price ? (
                    <>
                    {data.discount_price} $ - <s>{data.price} $</s>
                    </>
                    ) : 
                    (<>{data.price}$</>)}
                </h3>
                {logged ? (
                    <Button 
                    color="yellow"
                    onClick={handleToggleForm}
                >
                    ADD TO CART
                </Button>
                ): (
                    <Button 
                    color="yellow"
                    onClick={() => {history.push("/login")}}
                >
                    You need to LogIn
                </Button>
                )}
                </Card.Content>
            </Card>
            {orderingForm.visibleForm === true && (
                <Divider>
                    <Form>
                    {data.variations.map(v  => {
                        const variation_name = v.name.toLowerCase();
                        return (
                            <Form.Field key={v.id}>
                            <Select
                                name={variation_name}
                                onChange={handleChange}
                                options={v.item_variations.map(item => {
                                    return {
                                        key: item.id,
                                        text: item.value,
                                        value: item.id
                                    }
                                })}
                                placeholder={`Choose a ${variation_name}`}
                                selection
                                value={_.get(orderingForm, `formData[${variation_name}]`, '')}
                            />
                            </Form.Field>
                        )
                    })}
                    <Form.Button color="green" onClick={() => handleAddToCart(data.slug)}>Submit</Form.Button> 
                </Form>
            </Divider>
            )}
            </Grid.Column>
            <Grid.Column>
            <Header as='h2'>Different variations</Header>
                {data.variations && (
                    data.variations.map(v => {
                        return (
                            <Fragment key={v.id}>
                            <Header as='h3'>{v.name}</Header>
                            <Item.Group divided>
                                {v.item_variations.map(iv => {
                                    return(
                                    <Item key={iv.id}>
                                    {iv.attachment && (
                                    <Item.Image size='tiny' src={`http://localhost:3000/${iv.attachment}`} />
                                    )}
                                    <Item.Content verticalAlign='middle'>{iv.value}</Item.Content>
                                    </Item>
                                    )
                                })}
                            </Item.Group>
                            </Fragment>
                        )
                    })
                )}
            </Grid.Column>
            </Grid.Row>

            </Grid>
            </>
            ) : (
                <>
                    <Segment>
                    <Dimmer active inverted>
                        <Loader inverted>Loading</Loader>
                    </Dimmer>

                    <Image src='' />
                    </Segment>
                </>
            )}
        </Container>
        </div>
    )}

export default ProductDetail;
