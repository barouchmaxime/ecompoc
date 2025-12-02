import logo from "/logo.svg"
import { useSelector } from 'react-redux';
import { selectProductCount } from "../routes/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import { CartIcon } from "./card/components/icons/CartIcon";

export const Header = () => {
    const count: number = useSelector(selectProductCount);
    console.log("header="+count)
    const navigate = useNavigate();
    return (
        <div className="bg-white py-[13px] px-[24px]">
            <div className="flex place-content-between">
                <img src={logo} className="h-[27px] pointer-events-none" alt="logo" />
                <button className="self-center" 
                        onClick={() => {
                            navigate("/cart");
                        }}>
                    <CartIcon count={count ?? 0}/>
                </button>
            </div>
        </div>
    )
}