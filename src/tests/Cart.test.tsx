import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import shopContext from '@/contexts/ShopContext';
import Cart from '@/app/(generalLayout)/components/Cart/Cart';

const mockCart = [
    {
        id: '1',
        productName: 'Product 1',
        image_url: 'http://example.com/image.jpg',
        quantity: 2,
        price: 10,
        newStock: 8
    },
    {
        id: '2',
        productName: 'Product 2',
        image_url: 'http://example.com/image.jpg',
        quantity: 4,
        price: 20,
        newStock: 16
    }
];

const mockFavorites = [
    {
        id: '2',
        productName: 'Product 1',
        image_url: 'http://example.com/image2.jpg',
        price: 20,
        stock: 10,
        productDescription: 'Description 1',
        favorite: "1"
    },
    {
        id: '3',
        productName: 'Product 3',
        image_url: 'http://example.com/image3.jpg',
        price: 100,
        stock: 15,
        productDescription: 'Description 2',
        favorite: "1"
    }
];

const mockContextValue = {
    cart: mockCart,
    removeItemsFromStock: jest.fn(),
    setCart: jest.fn(),
    showFavorites: false,
    favorites: mockFavorites,
    setShowCart: jest.fn()
};

const renderCartWithProvider = (contextValue) => {
    return render(
        <shopContext.Provider value={contextValue}>
            <Cart />
        </shopContext.Provider>
    );
};

describe('Cart component', () => {
    it('renders cart items correctly', () => {
        renderCartWithProvider(mockContextValue);
        expect(screen.getByText("CHECKOUT 100€")).toBeInTheDocument();
        expect(screen.getByText("Product 1")).toBeInTheDocument();
        expect(screen.getByText("Product 2")).toBeInTheDocument();
    });
    it('calls setCart and removeItemsFromStock on checkout', () => {
        renderCartWithProvider(mockContextValue);

        const checkoutButton = screen.getByText("CHECKOUT 100€");
        fireEvent.click(checkoutButton);

        expect(mockContextValue.setCart).toHaveBeenCalledWith([]);
        expect(mockContextValue.removeItemsFromStock).toHaveBeenCalledWith(mockCart);
    });

    it('renders favorites when showFavorites is true', () => {
        const contextWithFavorites = { ...mockContextValue, showFavorites: true };
        renderCartWithProvider(contextWithFavorites);

        expect(screen.getByText('Product 1')).toBeInTheDocument();
        expect(screen.getByText('Product 3')).toBeInTheDocument();
    });

    it('closes the cart when CloseButton is clicked', () => {
        renderCartWithProvider(mockContextValue);

        const closeButton = screen.getByText("X");
        fireEvent.click(closeButton);
        expect(mockContextValue.setShowCart).toHaveBeenCalledWith(false);
    });
});
