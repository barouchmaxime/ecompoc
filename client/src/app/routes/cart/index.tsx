import { useSelector } from "react-redux";
import { CardContainer } from "../../components/card/CardContainer"
import { Product, useGetProductsQuery } from "../catalog/catalogApiSlice";
import { selectAddedIds, selectQuantityById } from "./cartSlice";
import { useMemo } from "react";
import { Card } from "../../components/card/Card";
import { CheckoutPanel } from "../../components/cart/CheckoutPanel";
import { CardHeader } from "../../components/card/CardHeader";

interface CartItem extends Product {
    quantity: number;
    total: number;
}
export default  () => {
    const { data = [], isError, isLoading, isSuccess } = useGetProductsQuery();
    const ids: number[] = useSelector(selectAddedIds);
    const quantityById = useSelector(selectQuantityById);
    
    const cartItems: {[key: number]: CartItem} = useMemo(() =>{ 
        return ids.reduce(
            (carts: object, id: number) => {
                const product: Product | undefined = data?.find(item => item.id === id);
                if(product) {
                    return {
                        ...carts,
                        [id]: {
                            ...product,
                            quantity: quantityById[id] ?? 0,
                            total: ((product?.price ?? 0) * quantityById[id]),
                        }
                    }
                       
                }
                else return carts;
            },
            {}
        )
    },[ids, quantityById, data]);

    const subTotal: number = useMemo(
        () => {
            return Object.values(cartItems).reduce(
                (sum: number, current: CartItem) => {
                    return sum + current.total
            }, 0)
        },
        [cartItems]
    )
    console.log(subTotal)

    if(isLoading) {
        return (
            <div>Loading...</div>
        )
    }
    else if(isError || !isSuccess) {
        return (
            <div>Error { JSON.stringify(data || {Message: "internal error"}) }</div>
        )
    }
    return (
        <CardContainer 
            header={
                <>
                    <CardContainer.Header title="Your cart">
                    </CardContainer.Header>
                </>
            }
        >
            {ids?.length > 0 ? (
                <div className="mt-[24px] flex flex-col md:flex-row flex-nowrap">
                    <div className="md:basis-[556px] md:grow md:shrink md:mr-[12px]">
                        {/**  Header */}
                        <CardHeader imageLabel="Image" titleLabel="Title" priceLabel="Price" quantityLabel="Quantity" totalLabel="Total"/>
                    {
                        ids?.map(id => {
                            if(cartItems[id]) {
                                const {image, title, price, quantity, total} = cartItems[id];
                                return (
                                    <Card 
                                        key={id} 
                                        id={id} 
                                        image={image} 
                                        title={title} 
                                        price={price}
                                        quantity={quantity}
                                        total={total}></Card>
                                )
                            }
                        })
                    }
                    </div>
                    <div className="md:flex md:basis-[272px] md:grow md:shrink-0">
                        <CheckoutPanel subTotal={`$ ${subTotal.toFixed(2)}`}
                                        total={`$ ${subTotal.toFixed(2)}`}
                                        quantityById={quantityById}

                        />
                    </div>
             </div>
            ) : (
                <div>No item found in the cart</div>
            )}
        </CardContainer>
    )
}
