import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ProductI } from '@/interfaces/product';
import { CartI } from '@/interfaces/cart';
import Item from '@/app/(generalLayout)/components/Cart/Item';
import shopContext from '@/contexts/ShopContext';


const addOneItemToCart = jest.fn()
const removeFromCart = jest.fn();

const productCart: CartI = {
    id: '1',
    productName: 'Product 1',
    image_url: 'http://example.com/image.jpg',
    quantity: 2,
    price: 10,
    newStock: 8
};

const product: ProductI = {
    id: '2',
    productName: 'Product 2',
    image_url: 'http://example.com/image2.jpg',
    price: 20,
    stock: 10,
    productDescription: 'Description 2',
    favorite: "1"
};

const renderComponent = (product: ProductI | CartI) => {
    return render(
        <shopContext.Provider value={{ addOneItemToCart, removeFromCart }}>
            <Item product={product} />
        </shopContext.Provider>
    );
};

describe('Item Component', () => {
    it('renders product name and image', () => {
        renderComponent(product);
        expect(screen.getByText('Product 2')).toBeInTheDocument();
        expect(screen.getByAltText('Product 2')).toBeInTheDocument();
    });

    it('renders quantity and price for cart products', () => {
        renderComponent(productCart);
        expect(screen.getByText('Product 1')).toBeInTheDocument();
        expect(screen.getByAltText('Product 1')).toBeInTheDocument();
        expect(screen.getByText('2')).toBeInTheDocument();
        expect(screen.getByText('20 €')).toBeInTheDocument();
    });

    it('renders the + and - buttons for cart products', () => {
        renderComponent(productCart);
        expect(screen.getByText('+')).toBeInTheDocument();
        expect(screen.getByText('-')).toBeInTheDocument();
    });

    it('calls addOneItemToCart when + button is clicked', () => {

        renderComponent(productCart);
        const addButton = screen.getByText('+');
        fireEvent.click(addButton);
        expect(addOneItemToCart.mock.calls.length).toEqual(1);
    });

    it('calls removeFromCart when - button is clicked', () => {

        renderComponent(productCart);
        const removeButton = screen.getByText('-');
        fireEvent.click(removeButton);
        expect(removeFromCart.mock.calls.length).toEqual(1);
    });

    it('price increase when product is added', () => {
        renderComponent(productCart);
        const addButton = screen.getByText('+');
        fireEvent.click(addButton);
        expect(screen.getByText('20 €')).toBeInTheDocument();
    });

    it("Should not render quantity and price for of ProductI type", () => {
        renderComponent(product);
        expect(screen.queryByText('20 €')).not.toBeInTheDocument();
    });
});
