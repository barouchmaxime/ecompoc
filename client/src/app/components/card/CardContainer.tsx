import { PropsWithChildren, ReactElement } from "react"
import { CardContainerHeader } from "./CardContainerHeader"
import { CardFilters } from "./CardFilters"

export const CardContainer = (
    {
        header, 
        children
    } : PropsWithChildren<{header: ReactElement}>
    ) =>{
    return (
        <div className="mt-[35px] xs:mx-[16px] sm:mx-[32px]">
            {header}
            <div className="card-list-container overflow-auto">
                {children}
            </div>
        </div>
    )
}
CardContainer.Header = CardContainerHeader;
CardContainer.Filters = CardFilters;