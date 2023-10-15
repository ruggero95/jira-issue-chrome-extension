import { PropsWithChildren, useContext, useEffect } from "react"
import { ThemeContext } from "../context/themeContext"
import { Theme } from "./Settings"
import { Toaster } from 'react-hot-toast';

export const DebugLayout: React.FC<PropsWithChildren> = ({ children }) => {
    const [theme, setTheme] = useContext(ThemeContext) as any

    return <div className={`${theme === Theme.DARK ? "dark" : ""} min-h-[550px]`}>        
        <div className={`p-4 min-h-[550px] dark:bg-gray-900 ${process.env.NODE_ENV === 'development' || !process.env.NODE_ENV ? 'border-black border-2' : ''}`}>
        <Toaster toastOptions={{
            duration: 1000,
        }} />
            {children}
        </div>

    </div>
}