// @ts-nocheck
import React, { fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useRouteMatch, useParams } from 'react-router-dom';
import { 
  Button, 
  Container, 
  Icon, 
  Image, 
  Item, 
  Label, 
  Dimmer, 
  Segment, 
  Loader, 
  Message, 
  Header, 
} from 'semantic-ui-react';

import { 
  getProductsInit,
 } from "./getProductsSlice";

 import {
  addToCartStart,
 } from "./addToCartSlice";

import { getCartItemsStart } from "../Cart/getCartItemsSlice";

const ProductList = () => {

  const { url, path } = useRouteMatch();
  const dispatch = useDispatch();
  const history = useHistory();

  const {loading, data, error} = useSelector(state => state.products);
  const {added} = useSelector(state => state.addToCart);
  const {logged} = useSelector(state => state.login);


  const handleOnLoginCart = () => {
    history.push("/login");
  };

  const handleAddToCart = (slug) => {
    console.log("Add to cart function: ", addToCartStart(slug));
    // dispatch(addToCartStart(slug));
  }

  useEffect(() => {
    console.log("This is URL", url, path)
    dispatch(getProductsInit());
  }, [])

  useEffect(() => {
    if(logged){
      dispatch(getCartItemsStart());
    }
  }, [added])

  return(
  <Container>
    {error && (
      <Message
      error
      header='There was some errors with your submission'
      content={JSON.stringify(error)}
    />
    )}
    { loading ? (
      <>
        <Segment>
          <Dimmer active inverted>
            <Loader inverted>Loading</Loader>
          </Dimmer>

        <Image src='' />
        </Segment>
      </>
    ):(
      <Item.Group divided>
        {data.map(item => {
          return(
            <Item key={item.id}>
              <Item.Image src={item.image} />
        
              <Item.Content>
                <Item.Header as='a' onClick={() => history.push(`/products/${item.id}`)}>{item.title}</Item.Header>
                <Item.Meta>
                  <span className='cinema'>{item.category}</span>
                </Item.Meta>
                <Item.Description>{item.description}</Item.Description>
                <Item.Extra>
                  {logged ? (
                    <Header floated='right'>
                      {item.price}$
                    </Header>
                  ): (
                    <Button 
                    primary 
                    floated='right' 
                    icon 
                    labelPosition='right'
                    onClick={() => handleOnLoginCart()}
                  >
                    You need to LogIn
                    <Icon name='user' />
                  </Button>
                  )}
                  {item.discount_price && <Label>DISCOUNT</Label>}
                </Item.Extra>
              </Item.Content>
            </Item>
          )
        })}
    </Item.Group>
    )}
  </Container>
  )}

export default ProductList;
