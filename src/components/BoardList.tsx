import { AxiosError } from "axios";
import { getBoards, getBoardUIUrl } from "../api/jira";
import { JiraBoardResponse } from "../api/jira.respons";
import { useQuery } from '@tanstack/react-query'
import { Card } from "./Card"
import { Spinner } from "./Spinner";
import { useContext } from "react";
import { SettingContext } from "./context/settingsContext";
import { ExternalLinkIcon } from "./icons/ExternalLinkIcon";
import { CardBoard } from "./CardBoard";
export const BoardList: React.FC = () => {
    const [settings, setSettings] = useContext(SettingContext) as any

    let {
        isLoading, error, data: boards, refetch
    } = useQuery<JiraBoardResponse | undefined, AxiosError>({
        queryKey: [getBoards.name, settings.token, settings.mail, settings.jiraUrl],
        queryFn: () => getBoards(),
    });
    return (
        <div className={`grid grid-cols-2 ${isLoading ? 'grid-cols-1 text-center' : 'grid-cols-2'} gap-x-4`}>
            {!isLoading && boards?.values && boards?.values.map((b, i) => {
                return <CardBoard id={`b-list${i}`} key={`b-list${i}`} board={b} inputName="b-list" ></CardBoard>
            })}
            {
                isLoading && <Spinner className="text-center" />
            }
            {
                !isLoading && !boards?.values && "Completa per vedere"
            }
            
        </div>)
}

