"use client"
import GROCERIES_API from "@/clientApi/groceriesApi";
import { CartI } from "@/interfaces/cart";
import { ProductI } from "@/interfaces/product";
import { createContext, useCallback, useEffect, useState } from "react";

const shopContext = createContext({
    cart: [] as CartI[] | [],
    favorites: [] as ProductI[] | [],
    loading: true,
    addToCart: (product: ProductI) => { },
    addToFavorites: (product: ProductI) => { },
    removeFromCart: (productId: string) => { },
    addOneItemToCart: (productId: string) => { },
    error: null as string | null,
    removeItemsFromStock: (cart: CartI[]) => { },
    products: [] as ProductI[] | [],
    setProducts: (products: any) => { },
    setCart: (cart: any) => { },
    showFavorites: false,
    setShowFavorites: (show: boolean) => { },
    showCart: false,
    setShowCart: (show: boolean) => { }
});

export default shopContext;

export const ShopProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [cart, setCart] = useState<CartI[] | []>([]);
    const [favorites, setFavorites] = useState<ProductI[] | []>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [products, setProducts] = useState<ProductI[] | []>([]);
    const [error, setError] = useState<string | null>(null);

    //Variables para modales de favoritos y carrito en mobiles
    const [showFavorites, setShowFavorites] = useState<boolean>(false);
    const [showCart, setShowCart] = useState<boolean>(false);

    const fetchFavorites = useCallback(async () => {
        // Obtener productos favoritos
        try {
            const response = await GROCERIES_API.getFavorite("1");
            setFavorites(response);
        } catch (error) {
            setError("Error fetching favorites");
        }
    }, []);

    const addToCart = useCallback((product: ProductI) => {
        // Agregar producto al carrito o aumentar la cantidad si ya existe
        const productInCart = cart.find((item) => item.id === product.id);
        if (productInCart) {
            setCart(
                cart.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            );
        } else {
            setCart([...cart, { id: product.id, image: product.image_url, name: product.productName, price: product.price, quantity: 1, newStock: product.stock - 1 }]);
        }
        // remover 1 unidad del stock
        setProducts(products.map((item) =>
            item.id === product.id
                ? { ...item, stock: item.stock - 1 }
                : item
        ))
    }, [cart, products])

    const addOneItemToCart = useCallback((productId: string) => {
        // Agregar 1 unidad del producto al carrito
        const productInCart = cart.find((item) => item.id === productId);
        if (productInCart) {
            setCart(
                cart.map((item) =>
                    item.id === productId
                        ? { ...item, quantity: item.quantity + 1, newStock: item.newStock - 1 }
                        : item
                )
            );
        }
        // remover 1 unidad del stock
        setProducts(products.map((item) =>
            item.id === productId
                ? { ...item, stock: item.stock - 1 }
                : item
        ))
    }, [cart, products])

    const removeFromCart = useCallback((productId: string) => {
        // Remover 1 unidad del producto del carrito o eliminarlo si la cantidad es 1
        const productInCart = cart.find((item) => item.id === productId);
        if (productInCart) {
            if (productInCart.quantity > 1) {
                setCart(
                    cart.map((item) =>
                        item.id === productId
                            ? { ...item, quantity: item.quantity - 1, newStock: item.newStock + 1 }
                            : item
                    )
                );
            } else {
                setCart(cart.filter((item) => item.id !== productId));
            }
        }
        // agregar 1 unidad al stock
        setProducts(products.map((item) =>
            item.id === productId
                ? { ...item, stock: item.stock + 1 }
                : item
        ))
    }, [cart, products])

    const fetchProducts = useCallback(async () => {
        try {
            const response = await GROCERIES_API.getGroceries();
            if (response.length === 0) {
                setError("No products found");
                return
            }
            setProducts(response);
        } catch (error) {
            setError("Error fetching products");
        } finally {
            setLoading(false);
        }
    }, []);

    const addToFavorites = useCallback(async (product: ProductI) => {
        // Agregar o remover producto de favoritos
        const productInFavorites = favorites.find((item) => item.id === product.id);
        try {
            if (productInFavorites) {
                setFavorites(favorites.filter((item) => item.id !== product.id));
                await GROCERIES_API.removeFromFavorite(product.id, "0");
            } else {
                setFavorites([...favorites, product]);
                await GROCERIES_API.addToFavorite(product.id, "1");
            }
        } catch (error) {
            setError("Error adding to favorites");
        }

    }, [favorites])

    const removeItemsFromStock = useCallback((cart: CartI[]) => {
        //Hacer una peticion al endpoint patch para restar la cantidad de productos en stock
        cart.forEach(async (item) => {
            try {
                await GROCERIES_API.updateStock(item.id, item.newStock);
            } catch (error) {
                setError("Error removing items from stock");
            }
        });

    }, []);

    useEffect(() => {
        fetchFavorites();
        fetchProducts();
        setLoading(false);
    }, []);

    const contextData = {
        cart,
        favorites,
        loading,
        addToCart,
        addToFavorites,
        removeFromCart,
        addOneItemToCart,
        error,
        removeItemsFromStock,
        products,
        setProducts,
        setCart,
        showFavorites,
        setShowFavorites,
        showCart,
        setShowCart
    };

    return (
        <shopContext.Provider value={contextData}>
            {children}
        </shopContext.Provider>
    );
};
