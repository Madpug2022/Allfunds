"use client"

import shopContext from "@/contexts/ShopContext";
import media from "@/helpers/generateBreakpoints"
import { ProductI } from "@/interfaces/product"
import { useContext } from "react";
import { CiHeart } from "react-icons/ci";
import styled from "styled-components"

const StyledCard = styled.div`
    display: flex;
    flex-direction: column;
    height: 260px;
    width: 220px;
    gap: 1rem;
    border: 1px solid #ccc;
    margin: auto;
    border-radius: 5px;
    ${media.mobileL`
        height: 190px;
        width: 160px;
    `};
`;

const StyledCardImage = styled.img`
    object-fit: cover;
    max-height: 80px;
`;

const StyledCardInfo = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 0 0.2rem;
    width: 100%;
`;

const StyledCardText = styled.div`
    display: flex;
    flex-direction: column;
    width: 80%;
    gap: 0.5rem;
`;

const StyledCardTitle = styled.h3`
font-size: 14px;
    ${media.mobileL`
        font-size: 10px;
        overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
    `};
`;

const StyledCardDescription = styled.p`
font-size: 12px;
overflow: hidden;
display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 4;
    ${media.mobileL`
        font-size: 10px;
        -webkit-line-clamp: 2;
    `};
`;

const StyledCardPrice = styled.p`
    font-weight: bold;
    display: flex;
    width: 20%;
    justify-content: center;
    ${media.mobileL`
        font-size: 12px
    `};
`;

const StyledCardActions = styled.div`
    display: flex;
    margin: auto 0 2px 0;
    justify-content: space-evenly;
    align-items:center;
    ${media.mobileL`
        justify-content: center;
    `};
`;

const StyledStock = styled.p`
    ${media.mobileL`
        display: none;
    `};
`;

const StyledBuyButton = styled.button`
display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f4f4f4;
    border: 1px solid #ccc;
    font-weight: bold;
    padding: 0.5rem;
    cursor: pointer;
    ${media.mobileL`
        padding: 0.3rem 0.8rem;
        font-size: 12px;
    `};
`;

const StyledFavoriteButton = styled.button<{ isfavorite: string }>`
    background-color: ${props => props.isfavorite === "1" ? 'red' : '#f4f4f4'};
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #ccc;
    font-weight: bold;
    padding: 0.5rem;
    cursor: pointer;
    ${media.mobileL`
        display: none;
    `};
`;

const ProductCard = ({ product }: {
    product: ProductI,
}) => {
    const { image_url, price, productName, productDescription, stock, favorite } = product;

    const { addToCart, addToFavorites, setProducts } = useContext(shopContext);

    const handleAddToFavorite = (product: ProductI) => {
        addToFavorites(product);
        setProducts((prevProducts: ProductI[]) => prevProducts.map((prevProduct) => {
            if (prevProduct.id === product.id) {
                return { ...prevProduct, favorite: prevProduct.favorite === "0" ? "1" : "0" }
            }
            return prevProduct
        }))
    }

    return (
        <StyledCard>
            <StyledCardImage src={image_url} alt="Product Image" />
            <StyledCardInfo>
                <StyledCardText>
                    <StyledCardTitle>{productName}</StyledCardTitle>
                    <StyledCardDescription>{productDescription}</StyledCardDescription>
                </StyledCardText>
                <StyledCardPrice>{price}€</StyledCardPrice>
            </StyledCardInfo>
            <StyledCardActions>
                <StyledStock>{stock}</StyledStock>
                <StyledBuyButton onClick={() => stock > 0 && addToCart(product)}>+ add</StyledBuyButton>
                <StyledFavoriteButton isfavorite={favorite} onClick={() => handleAddToFavorite(product)}><CiHeart /></StyledFavoriteButton>
            </StyledCardActions>
        </StyledCard>
    )
};

export default ProductCard
