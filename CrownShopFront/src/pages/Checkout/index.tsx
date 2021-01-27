// @ts-nocheck
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { 
    Button, 
    Container, 
    Icon, 
    Image, 
    Item, 
    Label, 
    Menu,
    Table,
    Header, 
  } from 'semantic-ui-react';

import './style.scss';

const Checkout = (props) => {

    const history = useHistory();

    const {cart} = useSelector(state => state.cart);
    const {logged} = useSelector(state => state.login);

    const handle_checkout = () => {
        history.push('/payment');
    };

    return(
        <div className="_checkout">
            <Container>
            <Header as="h2">Checkout</Header>
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
                    {cart.order_items.map((order_item, i)=> {
                        return (
                            <Table.Row key={order_item.id}>
                                <Table.Cell>
                                    {i}
                                </Table.Cell>
                                <Table.Cell>{order_item.item}</Table.Cell>
                                <Table.Cell>${order_item.item_obj.price}</Table.Cell>
                                <Table.Cell>{order_item.quantity}</Table.Cell>
                                <Table.Cell>
                                    {order_item.item_obj.discount_price && (
                                        <Label color="green" ribbon>On Discount</Label>
                                    )}
                                    ${order_item.final_price}
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
            </Container>
        </div>
    );
};

export default Checkout;
