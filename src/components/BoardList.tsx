import { AxiosError } from "axios";
import { getProjects } from "../api/jira.api";
import { JiraProjectResponse } from "../api/types/jira.response";
import { useQuery } from '@tanstack/react-query'
import { Spinner } from "./Spinner";
import { useContext, useState } from "react";
import { SettingContext } from "./context/settingsContext";
import { CardProject } from "./CardBoard";
export const BoardList: React.FC = () => {
    const [settings, setSettings] = useContext(SettingContext) as any
    const [start, setStart] = useState(0)
    const [maxR, setMaxr] = useState(50)
    let {
        isLoading, error, data: boards, refetch
    } = useQuery<JiraProjectResponse | undefined, AxiosError>({
        queryKey: [getProjects.name, settings.token, settings.mail, settings.jiraUrl, start, maxR],
        queryFn: () => getProjects({ start, maxResults: maxR }),
    });
    return (
        <div className={`grid grid-cols-2 ${isLoading ? 'grid-cols-1 text-center' : 'grid-cols-2'} gap-x-4`}>
            {!isLoading && boards?.values && boards?.values.map((b, i) => {
                return <CardProject htmlId={`b-list${i}`} key={`b-list${i}`} project={b} inputName="b-list" ></CardProject>
            })}
            {
                isLoading && <Spinner className="text-center" />
            }
            {
                !isLoading && !boards?.values && "Completa per vedere"
            }

        </div>)
}

