interface IPrice {
    price: number;
    currencySymbol?: string;
    isCurrencyPrefix?: boolean;
}
export const Price = ({price, currencySymbol="$", isCurrencyPrefix = true}: IPrice) => {
    const displayPrice = price.toFixed(2)
    let displayValue = `${displayPrice}${currencySymbol}`;;
    if(isCurrencyPrefix) {
        displayValue = `${currencySymbol}${displayPrice}`;
    }
    return <span>{displayValue}</span>
}