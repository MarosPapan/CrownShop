// @ts-nocheck
import React, { fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
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
  Message 
} from 'semantic-ui-react';

import { 
  getProductsInit,
 } from "./getProductsSlice";

 import {
  addToCartStart,
 } from "./addToCartSlice";

const ProductList = () => {

  const dispatch = useDispatch();
  const history = useHistory();
  const {loading, loaded, data, error} = useSelector(state => state.products);
  const {isLoggedIn} = useSelector(state => state.userInf);


  const handleOnLoginCart = () => {
    history.push("/login");
  };

  const handleAddToCart = (slug) => {
    console.log("This is slug of an item: ", slug);
    dispatch(addToCartStart(slug))
  }

  useEffect(() => {
    dispatch(getProductsInit());
  }, [])

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
                <Item.Header as='a'>{item.title}</Item.Header>
                <Item.Meta>
                  <span className='cinema'>{item.category}</span>
                </Item.Meta>
                <Item.Description>{item.description}</Item.Description>
                <Item.Extra>
                  {isLoggedIn ? (
                  <Button 
                    primary 
                    floated='right' 
                    icon 
                    labelPosition='right'
                    onClick={() => handleAddToCart(item.slug)}
                  >
                    Add to cart
                    <Icon name='cart plus' />
                  </Button>): (
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
                  {item.discount_price && <Label>{item.label}</Label>}
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