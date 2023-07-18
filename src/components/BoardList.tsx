import { AxiosError } from "axios";
import { getBoards } from "../api/jira";
import { JiraBoardResponse } from "../api/jira.respons";
import { useQuery } from '@tanstack/react-query'
import {Card} from "./Card"
import { Spinner } from "./Spinner";
import { useContext } from "react";
import { SettingContext } from "./context/settingsContext";
export const BoardList: React.FC = ()=>{
    const [settings, setSettings] = useContext(SettingContext) as any

    let {
        isLoading, error, data: boards, refetch
    } = useQuery<JiraBoardResponse | undefined, AxiosError> ({
            queryKey: [getBoards.name, settings.token, settings.mail, settings.jiraUrl],
            queryFn: () => getBoards(),
        });
        console.log(boards)
    return (
    <div className={`grid grid-cols-2 ${isLoading ? 'grid-cols-1' : 'grid-cols-2'} gap-x-4`}>
        {!isLoading && boards?.values && boards?.values.map((b, i)=>{
            console.log(b)
           return <Card key={`board-${i}`}>
            {b.name}
           </Card>
        })}
        {
            isLoading && <Spinner className="text-center"/>
        }
        {
            !isLoading && !boards?.values && "Completa per vedere"
        }
    </div>)
}

