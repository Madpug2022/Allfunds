"use client"

import shopContext from "@/contexts/ShopContext"
import { CartI } from "@/interfaces/cart"
import { useContext } from "react"
import styled from "styled-components"

const StyledItemContainer = styled.div`
display: flex;
    width: 100%;
    height: 60px;
    align-items: center;
    justify-content: space-between;
    padding-right: 0.3rem;
    border: 1px solid #ccc;

    .infocontainer{
        display: flex;
        flex-direction: column;

        &__quantity{
            display: flex;
            gap: 0.5rem;
            align-items: center;
            justify-content: center;
        }

        .name {
            font-weight: 600;
        }
    }
`
const StyledItemImg = styled.img`
    width: height;
    height: 100%;
`
const SumStyledButton = styled.button`
background-color: transparent;
font-weight: 700;
    border: none;
    cursor: pointer;
`


const Item = ({ product }: { product: CartI }) => {

    const { addOneItemToCart, removeFromCart } = useContext(shopContext)

    return (
        <StyledItemContainer>
            <StyledItemImg src={product.image} alt={product.name} />
            <div className="infocontainer">
                <p className="name">{product.name}</p>
                <div className="infocontainer__quantity">
                    <SumStyledButton onClick={() => removeFromCart(product.id)}>-</SumStyledButton>
                    <p>{product.quantity}</p>
                    <SumStyledButton onClick={() => addOneItemToCart(product.id)}>+</SumStyledButton>
                </div>
            </div>
            <p className="price">{product.price * product.quantity} €</p>
        </StyledItemContainer>
    )
}

export default Item
