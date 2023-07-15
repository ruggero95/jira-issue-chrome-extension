import { Link } from "react-router-dom"
import { RoutesEnum } from "../routes"
import { ReloadIcon } from "./icons/ReloadIcon"
import { SettingIcon } from "./icons/SettingIcon"
import { Header } from "./Header"

export const HomeHeader = ({ }) => {
    return (
        <Header>
                <div>
                    <ReloadIcon className="w-6 h-6 hover:cursor-pointer" />
                </div>
                <div>
                    <Link to={RoutesEnum.SETTINGS}><SettingIcon className="w-6 h-6 hover:cursor-pointer" /></Link>
                </div>
        </Header>

    )
}