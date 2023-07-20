import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useContext } from "react";
import { backLogUIUrl, getIssueNotInSprint, getIssueWithSprint } from "../../api/jira";
import { JiraIssueResponse } from "../../api/jira.respons";
import { CardIssue } from "../CardIssue";
import { SettingContext } from "../context/settingsContext";
import { HomeHeader } from "../HomeHeader"
import { ExternalLinkIcon } from "../icons/ExternalLinkIcon";
import { Spinner } from "../Spinner";
import { Title } from "../Title"

export const Home = () => {
    const [settings, setSettings] = useContext(SettingContext) as any
    const onlyMeFilter = settings.onlyMe==="true" ? `assignee="${settings.mail}"` : undefined
    const issueUiUrl = backLogUIUrl(settings.board, settings.projectKey, settings.jiraUrl)
    let {
        isLoading: isLoadingSp, error: errorSp, data: sprintIssue, refetch: refetchSp
    } = useQuery<JiraIssueResponse | undefined, AxiosError>({
        queryKey: [getIssueWithSprint.name, settings.board, settings.mail],
        queryFn: () => getIssueWithSprint(onlyMeFilter, settings.board),
    });

    let {
        isLoading: isLoadingNs, error: errorNs, data: issueNotInSprint, refetch: refetchNs
    } = useQuery<JiraIssueResponse | undefined, AxiosError>({
        queryKey: [getIssueNotInSprint.name, settings.board, settings.mail],
        queryFn: () => getIssueNotInSprint(onlyMeFilter, settings.board),
    });
    const issueRefetch = () => {
        refetchSp()
        refetchNs()
    }
    return <div>
        <HomeHeader refetch={issueRefetch} />
        <div className="flex justify-start">
            <Title title='Sprint' />
            <a target="_blank" rel="noreferrer" href={backLogUIUrl(settings.board, settings.projectKey, settings.jiraUrl)}><ExternalLinkIcon className="ml-2 mt-1 h-3 w-3" /></a>
        </div>

        <div>
            {isLoadingSp && <Spinner className="text-center" />}
            {!isLoadingSp && sprintIssue?.issues?.map((i, index) => {
                return <CardIssue
                    status={i.fields.status.name}
                    epic={i.fields.parent && i.fields.parent.fields ? i.fields.parent.fields.summary : ''}
                    key={`sprint-${index}`}
                    keyIssue={i.key}
                    assignee={i.fields.assignee?.avatarUrls["48x48"]}
                    labels={i.fields.labels}
                    issueUrl={issueUiUrl}
                    summary={i.fields.summary}
                    priority={i.fields.priority.iconUrl} />
            })}
        </div>
        <div className="flex justify-start">
            <Title title='Backlog' />
            <a target="_blank" rel="noreferrer" href={backLogUIUrl(settings.board, settings.projectKey, settings.jiraUrl)}><ExternalLinkIcon className="ml-2 mt-1 h-3 w-3" /></a>
        </div>
        <div>
            {isLoadingNs && <Spinner className="text-center" />}
            {!isLoadingNs && issueNotInSprint?.issues?.map((i, index) => {
                return <CardIssue
                    status={i.fields.status.name}
                    epic={i.fields.parent && i.fields.parent.fields ? i.fields.parent.fields.summary : ''}
                    key={`backlog-${index}`}
                    keyIssue={i.key}
                    assignee={i.fields.assignee?.avatarUrls["48x48"]}
                    labels={i.fields.labels}
                    issueUrl={issueUiUrl}
                    summary={i.fields.summary}
                    priority={i.fields.priority.iconUrl} />
            })}
        </div>
    </div>
}