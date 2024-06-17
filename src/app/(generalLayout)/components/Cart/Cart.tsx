"use client"

import shopContext from "@/contexts/ShopContext"
import { useContext } from "react"
import styled from "styled-components"
import { ProducList } from "../ProductDisplay"
import Item from "./Item"
import media from "@/helpers/generateBreakpoints"

const ProducCartContainer = styled.div`
   width: 100%;
    height: 100%;
    position: relative;
    display: flex;

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
    ${media.mobileL`
        width: 100%;
        padding: 1rem;
    `};

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

const CloseButton = styled.button`
    display:none;
    ${media.mobileL`
        position: absolute;
    display: block;
    color: black;
    top: 20px;
    font-size: 20px;
    left: 20px;
    background-color: transparent;
    border: none;
    `};

    `

const Cart = () => {
    const { cart, removeItemsFromStock, setCart, showFavorites, favorites, setShowCart } = useContext(shopContext);

    const total = cart.reduce((acc, item) => {
        return acc + item.price * item.quantity
    }, 0)

    const handlecheckout = () => {
        setCart([])
        removeItemsFromStock(cart)
    }

    return (
        <ProducCartContainer>
            {showFavorites ?
                <ProductsCart>
                    <CloseButton onClick={() => setShowCart(false)}>X</CloseButton>
                    <ProducList width="100%">{favorites.map((product) => {
                        return (
                            <Item key={product.id} product={product} />
                        )
                    })}
                    </ProducList>
                </ProductsCart>
                :
                <ProductsCart>
                    <CloseButton onClick={() => setShowCart(false)}>X</CloseButton>
                    <StyledCheckoutButton onClick={() => handlecheckout()}>CHECKOUT {total}€</StyledCheckoutButton>
                    <ProducList width="100%">{cart.map((product) => {
                        return (
                            <Item key={product.id} product={product} />
                        )
                    })}</ProducList>
                </ProductsCart>}
        </ProducCartContainer>
    )
}

export default Cart
