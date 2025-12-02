import { PropsWithChildren } from "react"

export const CardFilters = ({children}:PropsWithChildren) => {
    return (
        <div className="mt-[24px]">
            {children}
        </div>
    )
}