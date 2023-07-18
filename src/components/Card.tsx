import React, { PropsWithChildren } from "react"

export const Card: React.FC<PropsWithChildren> = ({children})=>{
    return (
        <div className="p-4 my-2  bg-white border border-gray-200 rounded-lg shadow dark:text-white  dark:border-gray-700 dark:bg-gray-800">
    {children}
    </div>)
}