"use client"
import Loader from "@/components/ui/Loader/Loader";
import { Fragment, useContext } from "react";
import styled from "styled-components"
import ProductCard from "./ProductCard";
import media from "@/helpers/generateBreakpoints";
import Cart from "./Cart/Cart";
import shopContext from "@/contexts/ShopContext";

export const ProducList = styled.ul<{ width: string }>`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    row-gap: 2rem;
    width: ${props => props.width};
    ${media.mobileL`
        width: 100%;
    `};
    `

const CartContainer = styled.div`
    display: flex;
    width: 30%;
    border-left: 1px solid #ccc;
    ${media.mobileL`
        display: none;
    `};
    `

const CartModal = styled.div`
    display: none;
    ${media.mobileL`
        display: flex;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #FFF;
        z-index: 100;
        justify-content: center;
        align-items: center;
    `};
    `

const ProductDisplay = () => {
    const { products, loading, error, showCart } = useContext(shopContext);

    return (
        <Fragment>
            {loading && <Loader />}
            {error && <p>{error}</p>}
            {products.length > 0 &&
                <>
                    <ProducList width="70%">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </ProducList>
                    <CartContainer>
                        <Cart />
                    </CartContainer>
                </>}
            {showCart && <CartModal>
                <Cart />
            </CartModal>}
        </Fragment>
    )
}

export default ProductDisplay
