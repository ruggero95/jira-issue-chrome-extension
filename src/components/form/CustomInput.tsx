import React from "react"

export const CustomInput: React.FC<{
    id:string, 
    label:string, 
    value:any, 
    name:string, 
    onChange:React.ChangeEventHandler<HTMLInputElement> | undefined, 
    className?: string, 
    small?: React.ReactNode, 
    type?:string

}> = ({ id, label, value, name, onChange, className, small = '', type = 'text' }) => {
    return (
        <div className={`mb-5 my-2 w-full px-1 ${className ?? ''}`}>
            <div className="relative">
                <input name={name} type={type} id={id} onChange={onChange} value={value} className="block px-2.5 pb-2 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                <label htmlFor={id} className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">{label}</label>
            </div>
            {small !== '' && <small className="text-gray-500 text-xs">{small}</small>}
        </div>

    )
}