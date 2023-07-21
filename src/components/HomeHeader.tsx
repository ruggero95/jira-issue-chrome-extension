import { Link } from "react-router-dom"
import { RoutesEnum } from "../routes"
import { ReloadIcon } from "./icons/ReloadIcon"
import { SettingIcon } from "./icons/SettingIcon"
import { Header } from "./Header"
import { useEffect, useState } from "react"
import { FilterIcon } from "./icons/FilterIcon"

export const HomeHeader: React.FC<{ hasFilters: boolean, refetch: Function }> = ({ refetch, hasFilters }) => {
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
            <div className="flex">
                <div>
                    {hasFilters && <div className="w-2 h-2 bg-red-500 ml-5 absolute rounded-lg"></div>}
                    <Link to={RoutesEnum.FILTER}><FilterIcon className="h-6 w-6 mr-3 cursor-pointer" /></Link>
                </div>
                <Link to={RoutesEnum.SETTINGS}><SettingIcon className="w-6 h-6 hover:cursor-pointer" /></Link>
            </div>
        </Header>

    )
}