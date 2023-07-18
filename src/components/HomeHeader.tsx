import { Link } from "react-router-dom"
import { RoutesEnum } from "../routes"
import { ReloadIcon } from "./icons/ReloadIcon"
import { SettingIcon } from "./icons/SettingIcon"
import { Header } from "./Header"
import { useEffect, useState } from "react"

export const HomeHeader: React.FC<{ refetch: Function }> = ({ refetch }) => {
    const [rotating, setRotating] = useState(false)
    useEffect(() => {
        const timeout = setTimeout(() => {
            if (rotating) setRotating(false);
        }, 1500);

        return () => clearTimeout(timeout);
    }, [rotating]);
    return (
        <Header>
            <div onClick={
                () => {
                    setRotating(true)
                    refetch()
                }
            }>
                <ReloadIcon className={`w-6 h-6 hover:cursor-pointer ${rotating ? "animate-spin" : ''}`} />
            </div>
            <div>
                <Link to={RoutesEnum.SETTINGS}><SettingIcon className="w-6 h-6 hover:cursor-pointer" /></Link>
            </div>
        </Header>

    )
}