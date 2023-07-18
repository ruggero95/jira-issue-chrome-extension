import { useContext } from "react"
import { Link } from "react-router-dom"
import { RoutesEnum } from "../routes"
import { StorageEnum } from "../storage"
import { setChromeStorage } from "../utils"
import { SettingContext } from "./context/settingsContext"
import { ThemeContext, ThemeProvider } from "./context/themeContext"
import { Header } from "./Header"
import { HomeIcon } from "./icons/HomeIcon"
import { MoonIcon } from "./icons/MoonIcon"
import { SunIcon } from "./icons/SunIcon"
import { Theme } from "./pages/Settings"


export const SettingsHeader = () => {
    const [theme, setTheme] = useContext(ThemeContext) as any

    return (
            <Header>
                <div>
                    <Link to={RoutesEnum.HOME}><HomeIcon className="w-6 h-6 hover:cursor-pointer" /></Link>
                </div>
                <div onClick={()=>{
                    if(!theme || theme===Theme.LIGHT){
                        setTheme(Theme.DARK)
                        setChromeStorage(StorageEnum.THEME, Theme.DARK)
                    }else{
                        setTheme(Theme.LIGHT)
                        setChromeStorage(StorageEnum.THEME, Theme.LIGHT)
                    }
                    
                }}>
                    {theme===Theme.LIGHT && <MoonIcon  className="w-6 h-6 ease-in-out duration-500 hover:cursor-pointer"/>}
                    {theme===Theme.DARK && <SunIcon  className="w-6 h-6 ease-in-out duration-500 hover:cursor-pointer"/>}
                </div>
            </Header>

    )
}