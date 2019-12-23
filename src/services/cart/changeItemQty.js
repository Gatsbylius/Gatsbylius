const axios = require("axios");
const SYLIUS_URL = process.env.GATSBY_SYLIUS_URL;

const changeItemQty = async (
    itemId,
    changeType,
    storeState,
    storeDispatch
) => {
    const cartKey = storeState.cartKey;

    const item = storeState.products.find(item => item.id === itemId);
    let newItemQty;

    if (changeType === "increment") {
        newItemQty = item.quantity + 1;
    } else if (changeType === "decrement" && item.quantity > 0) {
        newItemQty = item.quantity - 1;
    }

    if (!newItemQty) {
        return null;
    }

    await axios
        .put(`${SYLIUS_URL}/shop-api/carts/${cartKey}/items/${item.id}`, {
            quantity: newItemQty,
        })
        .then(response => {
            storeDispatch({type: "updateProducts", payload: response.data.items});
        })
        .catch(error => {
            console.error("Error on change qty item", error);
        });
};

export const incrementQty = async (itemId, storeState, storeDispatch) => {
    await changeItemQty(
        itemId,
        "increment",
        storeState,
        storeDispatch
    );
}

export const decrementQty = async (itemId, storeState, storeDispatch) => {
    await changeItemQty(
        itemId,
        "decrement",
        storeState,
        storeDispatch
    );
}
