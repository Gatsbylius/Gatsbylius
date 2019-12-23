import React from "react";
import {
  useStoreDispatchContext,
  useStoreStateContext,
} from "../../context/StoreContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { CartInfo } from "./styled";
import { NavItem } from "../Layout/Header/styled";

const MiniCartButton = () => {
  const storeState = useStoreStateContext();
  const storeDispatch = useStoreDispatchContext();
  return (
    <NavItem key={"cart"}>
      <button
        onClick={() => {
          storeDispatch({ type: "toggleMiniCart" });
        }}
      >
        <FontAwesomeIcon icon={faShoppingCart} />{" "}
        <CartInfo>{storeState.products.length}</CartInfo>
      </button>
    </NavItem>
  );
};

export default MiniCartButton;
