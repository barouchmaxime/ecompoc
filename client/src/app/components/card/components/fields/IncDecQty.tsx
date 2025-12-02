import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline"
import { useDispatch } from "react-redux";
import { addToCart, decrementToCart } from "../../../../routes/cart/cartSlice";

interface IIncDecQty {
    id: number;
    quantity: number;
}
export const IncDecQty = ({id, quantity}:IIncDecQty) => {
    const dispatch = useDispatch();
    return (
        <div className="flex justify-between bg-[#F5f5f5] text-[#565c70] w-[85px] px-[8px] py-[3px] rounded-s-[100px] rounded-e-[100px]">
            <button className="self-center"
                onClick={()=>{
                    dispatch(decrementToCart({productId: id}))
                }}
            >
                <div className="relative w-[10px] h-[10px]">
                    <MinusIcon/>
                </div>
            </button>
            <div className="text-center align-middle leading-[20px]">{quantity}</div>
            <button className="self-center"
                    onClick={()=>{
                        dispatch(addToCart({productId: id}))
                    }}
                >
                    <div className="relative w-[10px] h-[10px]">
                        <PlusIcon/>
                    </div>
                </button>
        </div>
    )
}