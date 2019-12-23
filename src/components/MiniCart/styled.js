import styled from "styled-components"

export const CartInfo = styled.span`
    background-color: #6394F8;
    border-radius: 10px;
    color: white;
    display: inline-block;
    font-size: 12px;
    line-height: 1;
    padding: 3px 7px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
`

export const MiniCartTotal = styled.div`
    float: right;
`

export const MiniCartHeader = styled.div`
    border-bottom: 1px solid #E8E8E8;
    padding-bottom: 1.6em;
    color: #ABB0BE;
    
    ${MiniCartTotal}
`

export const MiniCartItem = styled.li`
    &:after {
      content: "";
      display: table;
      clear: both;
    }
`

export const MiniCartItemName = styled.span`
      display: block;
      padding-top: 10px;
      font-size: 16px;
`

export const MiniCartItemPrice = styled.span`
      color: #6394F8;
      margin-right: 8px;
`

export const MiniCartItemQty = styled.span`
      color: #ABB0BE;
`

export const MiniCartItems = styled.ul`
    padding-top: 20px;
    li {
        margin-bottom: 18px;
    }
    
    img {
        float: left;
        margin-right: 12px;
    }
    
    ${MiniCartItemName}
    ${MiniCartItemPrice}
    ${MiniCartItemQty}
`

export const MiniCart = styled.div`
    margin: 20px 0;
    float: right;
    background: white;
    width: 320px;
    position: absolute;
    right: 2%;
    z-index: 100;
    border-radius: 3px;
    padding: 20px;
    
    ${MiniCartHeader}
    
    ${MiniCartItems}
    
    &:after {
        bottom: 100%;
        left: 89%;
        border: solid transparent;
        content: " ";
        height: 0;
        width: 0;
        position: absolute;
        pointer-events: none;
        border-bottom-color: white;
        border-width: 8px;
        margin-left: -8px;
    }
`