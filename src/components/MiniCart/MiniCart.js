import React from "react";
import {
    useStoreDispatchContext,
    useStoreStateContext,
} from "../../context/StoreContext";
import { priceParser, getTotal } from "./../../helpers/cartHelper";

import { incrementQty, decrementQty, dropCart, removeItemFromCart } from "../../services/cart";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faTrash } from "@fortawesome/free-solid-svg-icons";
import {
    MiniCartHeader,
    MiniCartItem,
    MiniCartItemName,
    MiniCartItemPrice,
    MiniCartItemQty,
    MiniCartItems,
    MiniCartTotal,
    MiniCart as MinicartComponent,
} from "./styled";

const MiniCart = () => {
    const storeState = useStoreStateContext();
    const storeDispatch = useStoreDispatchContext();

    if (storeState.miniCartIsOpen) {
        return (
            <MinicartComponent>
                <MiniCartHeader>
                    <MiniCartTotal>
                        Total:{" "}
                        <MiniCartItemPrice>
                            {priceParser(
                                getTotal(storeState.products),
                                storeState.currency
                            )}
                        </MiniCartItemPrice>
                    </MiniCartTotal>
                </MiniCartHeader>
                <MiniCartItems>
                    {storeState.products.map(item => {
                        return (
                            <MiniCartItem key={item.id}>
                                <img
                                    src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/cart-item1.jpg"
                                    alt="item1"
                                />
                                <MiniCartItemName>{item.product.name}</MiniCartItemName>
                                <MiniCartItemPrice>
                                    {priceParser(item.total, storeState.currency)}
                                </MiniCartItemPrice>
                                <MiniCartItemQty>Qty: {item.quantity}</MiniCartItemQty>
                                <button
                                    onClick={() => {
                                        incrementQty(
                                            item.id,
                                            storeState,
                                            storeDispatch
                                        );
                                    }}
                                >
                                    <FontAwesomeIcon icon={faPlus} />
                                </button>
                                <button
                                    onClick={() => {
                                        decrementQty(
                                            item.id,
                                            storeState,
                                            storeDispatch
                                        );
                                    }}
                                >
                                    <FontAwesomeIcon icon={faMinus} />
                                </button>
                                <button
                                    onClick={() => {
                                        removeItemFromCart(item.id, storeState, storeDispatch);
                                    }}
                                >
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </MiniCartItem>
                        );
                    })}
                </MiniCartItems>
                <button
                    onClick={() => {
                        dropCart(storeState, storeDispatch);
                    }}
                >
                    Drop Cart
                </button>
            </MinicartComponent>
        );
    }

    return null;
};

export default MiniCart;
