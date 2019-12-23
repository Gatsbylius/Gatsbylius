//@todo: Actions.js contients les types dans des contantes en majuscules
export const cartReducer = (state, action) => {
  switch (action.type) {
    case "updateProducts": {
      return { ...state, products: action.payload };
    }
    case "toggleMiniCart": {
      return {
        ...state,
        miniCartIsOpen: !state.miniCartIsOpen,
      };
    }
    case "updateCartKey": {
      return { ...state, cartKey: action.payload };
    }
    case "changeCurrency": {
      return { ...state, currency: action.payload };
    }
    default: {
      throw new Error("This reducer action does not exist");
    }
  }
};
