import React from "react";
import {
  useStoreDispatchContext,
  useStoreStateContext,
} from "../../context/StoreContext";
import { addVariantToCart } from "./../../services/cart";

const AddToCartButton = ({ slug, variantsCode, qty, isSimple }) => {
  const storeState = useStoreStateContext();
  const storeDispatch = useStoreDispatchContext();
  return (
    <button
      onClick={() => {
        addVariantToCart(
          slug,
          variantsCode,
          qty,
          isSimple,
          storeState,
          storeDispatch
        ).then(() => {});
      }}
    >
      Ajouter au pannier
    </button>
  );
};

export default AddToCartButton;
