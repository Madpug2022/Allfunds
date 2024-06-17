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

const ProductDisplay = () => {
    const { products, loading, error } = useContext(shopContext);

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
                    <Cart />
                </>}
        </Fragment>
    )
}

export default ProductDisplay
