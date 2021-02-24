// @ts-nocheck
import React, { Fragment, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useRouteMatch} from 'react-router-dom';

import { 
  getProductsInit,
 } from "./getProductsSlice";

import { getCartItemsStart } from "../Cart/getCartItemsSlice";
import { activeCategoryInit } from '../Categories/activeCategorySlice';


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
  Menu
} from 'semantic-ui-react';
import './style.scss'

const ProductList = () => {

  const { url, path } = useRouteMatch();
  const dispatch = useDispatch();
  const history = useHistory();

  const {loading, data, error} = useSelector(state => state.products);
  const {added} = useSelector(state => state.addToCart);
  const {logged} = useSelector(state => state.login);
  const {category} = useSelector(state => state.activeCategory);


  const handleOnLoginCart = () => {
    history.push("/login");
  };


  const getActiveCategory = (category) => {
    dispatch(activeCategoryInit(category));
};

  useEffect(() => {
    dispatch(getProductsInit());
  }, [])

  useEffect(() => {
    if(logged){
      dispatch(getCartItemsStart());
    }
  }, [added])

  return(
  <div className="_shop">
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
      <>
      <Menu tabular>
      <Menu.Item
          name="All"
          active={category === ""}
          onClick={() => getActiveCategory('')}
        >
          Všetko <Icon name="star" />
        </Menu.Item>
        <Menu.Item
          name="Football"
          active={category === "Football"}
          onClick={() => getActiveCategory('Football')}
        >
          Futbal <Icon name="soccer" />
        </Menu.Item>

        <Menu.Item
          name="Running"
          active={category === "Running"}
          onClick={() => getActiveCategory('Running')}
        >
          Beh <Icon name="heartbeat" />
        </Menu.Item>

        <Menu.Item
          name="Excersising"
          active={category === "Excersising"}
          onClick={() => getActiveCategory('Excersising')}
        >
          Cvičenie <Icon name="child" />
        </Menu.Item>
      </Menu>
      <Item.Group divided>
        {data.map(item => {
          return(
            <Fragment key={item.id}>
            {category === item.category && (
              <Item>
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
                    Musíš sa prihlásiť
                    <Icon name='user' />
                  </Button>
                  )}
                  {item.discount_price && <Label>Zľava</Label>}
                </Item.Extra>
              </Item.Content>
            </Item>
            )}
            {category === '' && (
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
                    Musíš sa prihlásiť
                    <Icon name='user' />
                  </Button>
                  )}
                  {item.discount_price && <Label>Zľava</Label>}
                </Item.Extra>
              </Item.Content>
            </Item>
            )}
            </Fragment>
          )
        })}
    </Item.Group>
    </>
    )}
  </Container>
  </div>
  )}

export default ProductList;
