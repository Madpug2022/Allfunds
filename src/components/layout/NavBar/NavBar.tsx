"use client"
import { FaCartShopping } from "react-icons/fa6";
import { IoHeart } from "react-icons/io5";
import { useContext } from "react";
import shopContext from "@/contexts/ShopContext";
import './styles.scss'

const NavBar = () => {
    const { cart, favorites, setShowFavorites, showFavorites, setShowCart, showCart } = useContext(shopContext);
    return (
        <nav className="navbar">
            <button className="navbar__cartButton">
                <FaCartShopping style={{ height: "100%", width: "100%" }} />
                {cart.length !== 0 && <span className="navbar__cartButton__cartAmmount">{cart.length}</span>}
            </button>
            <button className="navbar__cartButtonRes" onClick={() => setShowCart(!showCart)}>
                <FaCartShopping style={{ height: "100%", width: "100%" }} />
                {cart.length !== 0 && <span className="navbar__cartButton__cartAmmount">{cart.length}</span>}
            </button>
            <button className="navbar__favoriteBtn" onClick={() => setShowFavorites(!showFavorites)}>
                <IoHeart style={showFavorites ? { color: "#DDD" } : { color: "#b80909" }} height="25px" width="25px" />
                {favorites.length !== 0 && <span className="navbar__favoriteBtn__favoritesAmmount">{favorites.length}</span>}
            </button>
        </nav>
    )
}

export default NavBar
