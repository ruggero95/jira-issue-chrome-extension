import { PropsWithChildren } from "react"

export const Header: React.FC<PropsWithChildren> = ({children})=>{
    return (
        <div className="flex mt-3 py-3 justify-between">
            {children}
        </div>
    )
}