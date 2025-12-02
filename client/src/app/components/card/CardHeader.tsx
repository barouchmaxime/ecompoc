export interface ICardHeader {
    idLabel?: string;
    titleLabel: string;
    imageLabel: string;
    priceLabel: string;
    quantityLabel?: string;
    totalLabel?: string;
}
export const CardHeader =  ({idLabel, titleLabel, imageLabel, priceLabel, quantityLabel, totalLabel}: ICardHeader) => {
    return (
        <div className={`hidden md:flex bg-white px-[24px] font-bold text-[14px] text-[#565c70]`}>
            <div className={`md:px-[5px] md:py-[9px]`}>
            <span className="min-w-[35px] w-[35px] h-[35px] mr-[13px]">{imageLabel}</span>
            </div>
            <div className={`${quantityLabel ? "grow-[4] shrink-[4] basis-[396]": "grow"} flex self-center flex-row items-start`}>
                {quantityLabel? null:<div className="flex-1 self-start">{idLabel}</div>}
                <div className="flex-1 self-start">{titleLabel}</div>
                <div className="flex-1 self-start">{priceLabel}</div>
                {quantityLabel? <div className="flex-1 self-startr">{quantityLabel}</div> : null}
                {quantityLabel? <div className="flex-1 self-start">{totalLabel}</div> : null}
            </div>
            <div className="flex-none self-center"><div className="w-[24px]"></div></div>
        </div>
    )
}