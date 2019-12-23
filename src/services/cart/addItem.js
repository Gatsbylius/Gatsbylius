import { ensureCartKey } from "./";
const axios = require("axios");

const SYLIUS_URL = process.env.GATSBY_SYLIUS_URL;

export const addVariantToCart = async (
    productCode,
    variantsCode,
    qty,
    isSimple,
    storeState,
    storeDispatch
) => {
    await ensureCartKey(storeState, storeDispatch);
    const cartKey = storeState.cartKey;

    const productData = {
        productCode: productCode,
        quantity: qty,
    };

    if (!isSimple) {
        productData.variantCode = variantsCode;
    }

    await axios
        .post(`${SYLIUS_URL}/shop-api/carts/${cartKey}/items`, productData)
        .then(response => {
            storeDispatch({ type: "updateProducts", payload: response.data.items });
        })
        .catch(err => {
            console.error("Error on add to cart", err);
        });
};