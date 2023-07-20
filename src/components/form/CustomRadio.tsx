import React from "react"

export const CustomRadio:React.FC<{id:string, label?:string,name:string, value:string, checked:boolean, onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined, }>  = ({id, label, checked, name,value, onChange}) => {
    return (
        <div className="flex items-center mr-4">
            <input onChange={onChange} id={id} type="radio" value={value} checked={checked} name={name} className="w-4 h-4 cursor-pointer text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
            {label && <label htmlFor={id} className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{label}</label>}
        </div>
    )
}