import { useNavigate } from "react-router-dom";
interface ICheckoutPanel {
    title?: string;
    subTotalLabel?: string;
    subTotal: string;
    shippingLabel?: string;
    shippingPrice?: string | number;
    totalLabel?: string;
    total: string;
    checkoutButtonLabel?: string;
    quantityById: {
        [key:number]: number;
    }
}
export const CheckoutPanel = ({
    title = "Order summary", 
    subTotalLabel = "Subtotal", 
    subTotal, 
    shippingLabel = "Shipping", 
    shippingPrice = "Free", 
    totalLabel = "Total", 
    total,
    checkoutButtonLabel = "Checkout",
    quantityById,
} : ICheckoutPanel) => {
    const navigate = useNavigate();
    const handleCheckout = () => {
        const body: { items: { title: string; quantity: number }[] } = {
            items: [],
        };

        for (let [productId, quantity] of Object.entries(quantityById)) {
            body.items.push({
            productId: parseInt(productId),
            quantity: quantity,
            });
        }

        if (body.items.length === 0) {
            alert("Votre panier est vide.");
            return;
        }

        // Construire un message lisible
        const itemLines = body.items
            .map(
            (item) =>
                `• Produit #${item.productId} — Quantité : ${item.quantity}`
            )
            .join("\n");

        const message =
            `🛒 Votre commande :\n\n` +
            `${itemLines}\n\n` +
            `Appuyez sur OK pour revenir aux produits.`;

        alert(message);
        navigate("/");
    };
    return (
        <div className="w-[100%]">
            <div className="bg-white w-[100%] mb-[20px] border-[1px] border-[#c9c9c9] rounded-[4px]">
                <div className=" p-[24px] border-b-[1px] border-[#c9c9c9]">
                    <div className="flex border-b-[1px] h-[48px]">
                        <div className="self-start font-bold text-[16px] leading-[24px]">{title}</div>
                    </div>
                    <div className="flex justify-between mt-[20px] font-normal text-[14px] leading-[21px]">
                        <div>
                            <div>{subTotalLabel}</div>
                            <div>{shippingLabel}</div>
                        </div>
                        <div>
                            <div>{subTotal}</div>
                            <div>{shippingPrice}</div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between px-[24px] py-[32px] font-bold text-[16px] leading-[24px]">
                    <div>
                        {totalLabel}
                    </div>
                    <div>
                        {total}
                    </div>
                </div>
            </div>
            <button className="flex justify-center items-center box-border bg-[#00b588] text-white w-[100%] h-[41px]"
                    onClick={handleCheckout}
            >
                <div>{checkoutButtonLabel}</div>
            </button>
        </div>
    )
}