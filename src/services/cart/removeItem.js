const axios = require("axios");
const SYLIUS_URL = process.env.GATSBY_SYLIUS_URL;

export const removeItemFromCart = async (itemId, storeState, storeDispatch) => {
    const cartKey = storeState.cartKey;
    await axios
        .delete(`${SYLIUS_URL}/shop-api/carts/${cartKey}/items/${itemId}`)
        .then(async response => {
            //@todo: update totals ?
            storeDispatch({ type: "updateProducts", payload: response.data.items });
        })
        .catch(error => {
            console.error("Error on remove item from cart", error);
        });
};