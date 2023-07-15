import { Link } from "react-router-dom"
import { RoutesEnum } from "../routes"
import { Header } from "./Header"
import { HomeIcon } from "./icons/HomeIcon"


export const SettingsHeader = () => {
    return (
            <Header>
                <div>
                    <Link to={RoutesEnum.HOME}><HomeIcon className="w-6 h-6 hover:cursor-pointer" /></Link>
                </div>
                <div>

                </div>
            </Header>

    )
}