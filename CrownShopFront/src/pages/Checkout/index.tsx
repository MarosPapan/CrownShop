// @ts-nocheck
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, } from 'react-router-dom';

import { deleteCartItemInit } from '../../components/Cart/deleteCartItemSlice';
import { getCartItemsStart } from '../../components/Cart/getCartItemsSlice';
import { addToCartStart } from '../../components/ProductList/addToCartSlice';
import { removeOneItemFromCartStart } from '../../components/Cart/removeOneItemFromCartSlice';


import { 
    Button, 
    Container, 
    Icon, 
    Image, 
    Label, 
    Table,
    Header,
    Message,
    Segment,
    Dimmer,
    Loader 
  } from 'semantic-ui-react';

import './style.scss';


const Checkout = (props) => {

    const dispatch = useDispatch();
    const history = useHistory();

    const {logged} = useSelector(state => state.login);
    const {cart, loading} = useSelector(state => state.cart)
    const {deleted} = useSelector(state => state.itemCartDelete)
    const {added} = useSelector(state => state.addToCart);
    const {removed} = useSelector(state => state.removeOneItemFromCart);

    const renderVariations = ordertItem => {
        let text = '';
        ordertItem.item_variations.forEach(iv => {
            text += `${iv.variation.name}: ${iv.value}, `
        });
        return text;
    }

    const handle_checkout = () => {
        history.push('/payment');
    };

    const handleFormatData = (itemVariations) => {
        // [{id: 1},{id: 2}] => [1,2] - all variations
        return Object.keys(itemVariations).map(key => {
            return itemVariations[key].id;
        });
    };

    const handleRemoveQuantityFromCart = (slug) => {
        dispatch(removeOneItemFromCartStart(slug));
    };

    const handleAddtoCart = (slug, itemVariations) => {
        const variations = handleFormatData(itemVariations);
        dispatch(addToCartStart([slug, variations]));
    };

    const handleRemoveItem = (itemID) => {
        dispatch(deleteCartItemInit(itemID));
    };

    useEffect(() => {
        dispatch(getCartItemsStart());
    }, [deleted, added, removed]);
    return(
        <div className="_checkout">
            <Container>
            <Header as="h2">Checkout</Header>
            {cart == null && (
            <Message
                warning
                header="You don't have active order"
                content="Go back shopping :)"
            />
            )}
            {loading && (
            <Segment>
                <Dimmer active inverted>
                <Loader inverted>Loading</Loader>
                </Dimmer>

                <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
            </Segment>
            )}
            {cart && (
                <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Item #</Table.HeaderCell>
                        <Table.HeaderCell>Item name</Table.HeaderCell>
                        <Table.HeaderCell>Item price</Table.HeaderCell>
                        <Table.HeaderCell>Item quantity</Table.HeaderCell>
                        <Table.HeaderCell>Total item price</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {console.log("Items in cart", cart)}
                    {cart.order_items.map((order_item, i)=> {
                        return (
                            <Table.Row key={order_item.id}>
                                <Table.Cell>
                                    {i + 1}
                                </Table.Cell>
                                <Table.Cell>{order_item.item.title} - {renderVariations(order_item)}</Table.Cell>
                                <Table.Cell>${order_item.item.price}</Table.Cell>
                                <Table.Cell textAlign='center'>
                                    <Icon 
                                    name='minus' 
                                    style={{float: "left", cursor: "pointer"}}
                                    onClick={() => handleRemoveQuantityFromCart(order_item.item.slug)}
                                    />
                                    {order_item.quantity}
                                    <Icon 
                                    name='plus'
                                    style={{float: "right", cursor: "pointer"}}
                                    onClick={() => handleAddtoCart(order_item.item.slug, order_item.item_variations)}
                                    />
                                </Table.Cell>
                                <Table.Cell>
                                    {order_item.item.discount_price && (
                                        <Label color="green" ribbon>On Discount</Label>
                                    )}
                                    ${order_item.final_price}
                                    <Icon 
                                    name='trash' 
                                    color="red" 
                                    style={{float: "right", cursor: "pointer"}}
                                    onClick={() => handleRemoveItem(order_item.id)}
                                    />
                                </Table.Cell>
                            </Table.Row>
                        )
                    })}
                    <Table.Row>
                        <Table.Cell />
                        <Table.Cell />
                        <Table.Cell />
                        <Table.Cell colSpan='2' textAlign="center">
                        Total: ${cart.total}
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>

                <Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell colSpan='5' textAlign="right">
                        <Button color="yellow" onClick={() => handle_checkout()}>Checkout</Button>
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
            )}
            </Container>
        </div>
    );
};

export default Checkout;
