/**
 @todo: delete this file if unused
 */

import React from "react";
import { StoreProvider } from "./src/context/StoreContext";
export const wrapRootElement = ({ element }) => (
  <StoreProvider>{element}</StoreProvider>
);
