"use client"
import { FaCartShopping } from "react-icons/fa6";
import { IoHeart } from "react-icons/io5";
import { useContext } from "react";
import shopContext from "@/contexts/ShopContext";
import './styles.scss'

const NavBar = () => {
    const { cart, favorites } = useContext(shopContext);
    return (
        <nav className="navbar">
            <button className="navbar__cartButton">
                <FaCartShopping style={{ height: "100%", width: "100%" }} />
                {cart.length !== 0 && <span className="navbar__cartButton__cartAmmount">{cart.length}</span>}
            </button>
            <button className="navbar__cartButton">
                <IoHeart style={{ height: "100%", width: "100%" }} />
                {favorites.length !== 0 && <span className="navbar__cartButton__favoritesAmmount">{favorites.length}</span>}
            </button>
        </nav>
    )
}

export default NavBar
