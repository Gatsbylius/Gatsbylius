const axios = require("axios");
const SYLIUS_URL = process.env.GATSBY_SYLIUS_URL;

export const dropCart = async (storeState, storeDispatch) => {
    const cartKey = storeState.cartKey;

    await axios
        .delete(`${SYLIUS_URL}/shop-api/carts/${cartKey}`)
        .then(async () => {
            storeDispatch({
                type: "updateCartKey",
                payload: null,
            });
            storeDispatch({ type: "updateProducts", payload: [] });
        })
        .catch(error => {
            console.error("Error on drop cart items", error);
        });
};
