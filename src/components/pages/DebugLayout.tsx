import { PropsWithChildren } from "react"

export const DebugLayout: React.FC<PropsWithChildren> = ({ children })=>{
    return <div className={`p-4 ${process.env.NODE_ENV ==='development' || !process.env.NODE_ENV ? 'border-black border-2' : ''}`}>
        {children}
    </div>
}