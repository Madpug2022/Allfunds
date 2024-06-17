"use client"

import shopContext from "@/contexts/ShopContext"
import media from "@/helpers/generateBreakpoints"
import { useContext } from "react"
import styled from "styled-components"
import { ProducList } from "../ProductDisplay"
import Item from "./Item"

const ProducCartContainer = styled.div`
    width: 30%;
    border-left: 1px solid #ccc;
    position: relative;
    display: flex;
    ${media.mobileL`
        display: none;
    `};
    `

const ProductsCart = styled.div`
    height: 100%;
    width: 30%;
    padding: 0 1rem;
    gap: 1rem;
    display: flex;
    align-items: center;
    flex-direction: column;
    position: fixed;
    overflow-y: auto;
`

const StyledCheckoutButton = styled.button`
    min-height: 45px;
    width: 80%;
    background-color: green;
    color: white;
    border: none;
    cursor: pointer;
    transition-duration: 0.3s;

        &:hover{
            background-color: #4CAF50;
        }

    `

const Cart = () => {
    const { cart, removeItemsFromStock, setCart } = useContext(shopContext);

    const total = cart.reduce((acc, item) => {
        return acc + item.price * item.quantity
    }, 0)

    const handlecheckout = () => {
        setCart([])
        removeItemsFromStock(cart)
    }

    return (
        <ProducCartContainer>
            <ProductsCart>
                <StyledCheckoutButton onClick={() => handlecheckout()}>CHECKOUT {total}€</StyledCheckoutButton>
                <ProducList width="100%">{cart.map((product) => {
                    return (
                        <Item key={product.id} product={product} />
                    )
                })}</ProducList>
            </ProductsCart>
        </ProducCartContainer>
    )
}

export default Cart
