import { useDispatch } from "react-redux";
import { addToCart, deleteToCart } from "../../routes/cart/cartSlice";
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Price } from "./components/fields/Price";
import { IncDecQty } from "./components/fields/IncDecQty";
import { CartIcon } from "./components/icons/CartIcon";

export interface ICard {
    id: number;
    title: string;
    image: string;
    price: number;
    quantity?: number;
    total?: number;
}
export const Card =  ({id, title, image, price, quantity, total}: ICard) => {
    const dispatch = useDispatch();
    return (
        <div className={`flex ${quantity ? "bg-white" : "[&:nth-child(odd)]:bg-white [&:nth-child(even)]:bg-[#f5f5f5]"} mb-[8px] md:mb-[0px] xs:p-[16px] md:px-[24px] border-[1px] md:border-[0px] border-[#c9c9c9] rounded-[4px]`}>
            <div className={`md:px-[5px] md:py-[9px]`}>
                <img src={image} className="min-w-[35px] w-[35px] h-[35px] mr-[13px]"></img>
            </div>
            <div className={`${quantity ? "grow-[4] shrink-[4] basis-[396]": "grow"} md:flex self-center text-[14px] text-[#909090] xs:flex xs:flex-col md:flex-row items-start`}>
                {quantity? null:<div className="flex-1">{id}</div>}
                <div className="flex-1 md:self-center xs:max-w-[100%] text-start overflow-hidden whitespace-nowrap  text-ellipsis" title={title}>{title}</div>
                <div className="flex-1 md:self-center"><Price price={price}/></div>
                {quantity? <div className="flex-1 md:self-center"><IncDecQty id={id} quantity={quantity}/></div> : null}
                {quantity? <div className="flex-1 hidden md:block md:self-center text-[#565c70] font-bold"><Price price={total || 0}/></div> : null}
            </div>
            {quantity? (
                <div className="flex-none md:self-center flex flex-col justify-between text-[14px] text-[#909090]">
                    <button className="self-end"
                        onClick={()=>{
                            dispatch(deleteToCart({productId: id}))
                        }}
                    >
                        <div className="relative w-[24px] h-[24px]">
                            <XMarkIcon/>
                        </div>
                    </button>
                    <div className="md:hidden text-[#565c70] font-bold"><span>Total: </span><Price price={total || 0}/></div>
                </div>
            ) : (
                <button className="flex-none self-start"
                        onClick={()=>{
                            dispatch(addToCart({productId: id}))
                        }}
                >
                    <div className="relative w-[24px] h-[24px]">
                        <CartIcon/>
                    </div>
                </button>
            )}
        </div>
    )
}