import { PlusIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';

export const CartIcon = ({count}:{count?:number}) => {
    return (
        <div className="relative w-[24px] h-[24px]">
            {count || count === 0 ? 
                <div className="absolute text-center align-middle leading-[14px] w-[14px] h-[14px] left-[12px] top-[-8px] bg-[#00b588]  text-[9px] font-[roboto] font-medium rounded-[100px]">{count}</div> 
                : (
                <PlusIcon className="absolute text-[#565c70] left-[3px] top-[-9px] w-[14px] h-[14px]" />
                )
            }
            <ShoppingCartIcon className="text-[#565c70] w-[18px] h-[18px]"/>
        </div>
    )
}