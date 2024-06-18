"use client"
import { FaCartShopping } from "react-icons/fa6";
import { IoHeart } from "react-icons/io5";
import { useContext } from "react";
import shopContext from "@/contexts/ShopContext";
import './styles.scss'
import { IconType } from "react-icons";

const IconButton = ({ icon, onClick, ammount, className }: {
    icon: IconType
    onClick: () => void
    ammount: number
    className?: string
}
) => {
    return (
        <button className={className} onClick={onClick}>
            {icon({ height: "100%", width: "100%" })}
            {ammount !== 0 && <span className="navbar__cartButton__cartAmmount">{ammount}</span>}
        </button>
    )
}

const NavBar = () => {
    const { cart, favorites, setShowFavorites, showFavorites, setShowCart, showCart } = useContext(shopContext);
    return (
        <nav className="navbar">
            <IconButton icon={FaCartShopping} onClick={() => setShowCart(!showCart)} ammount={cart.length} className="navbar__cartButton" />
            <IconButton icon={FaCartShopping} onClick={() => setShowCart(!showCart)} ammount={cart.length} className="navbar__cartButtonRes" />
            <IconButton icon={IoHeart} onClick={() => setShowFavorites(!showFavorites)} ammount={favorites.length} className="navbar__favoriteBtn" />
        </nav>
    )
}

export default NavBar
