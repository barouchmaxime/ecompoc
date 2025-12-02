import { PropsWithChildren } from "react"

export const CardContainerHeader = ({title, children} : PropsWithChildren<{title:string}>) => {
    return (
        <>
            <div className="mb-[13px] text-[#565c70] font-bold text-[16px]">{title}</div>
            <hr></hr>
            {children}
        </>
    )
} 