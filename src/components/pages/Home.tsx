import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useContext } from "react";
import { backLogUIUrl, getIssueNotInSprint, getIssueWithSprint } from "../../api/jira";
import { Issue } from "../../api/jira.issue";
import { JiraIssueResponse } from "../../api/jira.respons";
import { CardIssue } from "../CardIssue";
import { FilterContext } from "../context/filterContext";
import { SettingContext } from "../context/settingsContext";
import { HomeHeader } from "../HomeHeader"
import { ExternalLinkIcon } from "../icons/ExternalLinkIcon";
import { Spinner } from "../Spinner";
import { Title } from "../Title"

export const Home = () => {
    const [settings, setSettings] = useContext(SettingContext) as any
    const [filter, setfilter] = useContext(FilterContext) as any
    const onlyMeFilter = settings.onlyMe === "true" ? `assignee="${settings.mail}"` : undefined
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

    const filterSprint = (issueToFilter?: Issue[]) => {
        if (!issueToFilter) {
            return []
        }
        if (!filter || (!filter.label && !filter.statusIssue)) {
            return issueToFilter
        }
        let issues = issueToFilter
        if (filter && filter.label && filter.label.length>0) {
            issues = issues?.filter((sp) => {
                const hasLabel = sp.fields.labels.some((issueLabel) => {
                    if (filter.label.indexOf(issueLabel) !== -1) {
                        return true
                    }
                })
                if (hasLabel) {
                    return sp
                }
            })
        }

        if (filter && filter.statusIssue && filter.statusIssue.length>0) {
            issues = issues.filter((bk) => {
                if (filter.statusIssue.indexOf(bk.fields.status.name) !== -1) {
                    return bk
                }
            })
        }


        return issues
    }

    const fs = filterSprint(sprintIssue?.issues)
    const bk = filterSprint(issueNotInSprint?.issues)
    console.log(filter)
    console.log(filter.label)
    console.log(filter.statusIssue)
    console.log(filter.label || filter.statusIssue)
    return <div>
        <HomeHeader hasFilters={(filter.label && filter.label.length>0) || (filter.statusIssue && filter.statusIssue.length>0)} refetch={issueRefetch} />
        <div className="flex mt-5 justify-start">
            <Title title='Sprint' />
            <a target="_blank" rel="noreferrer" href={backLogUIUrl(settings.board, settings.projectKey, settings.jiraUrl)}><ExternalLinkIcon className="ml-2 mt-1 h-3 w-3" /></a>
        </div>

        <div className={isLoadingSp ? "text-center" : ""}>
            {isLoadingSp && <Spinner className="text-center" />}
            {!isLoadingSp && fs.map((i, index) => {
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
            {!isLoadingSp && fs.length===0 && <div className="dark:text-white text-center">No Data</div>}
        </div>
        <div className="flex mt-10 justify-start">
            <Title title='Backlog' />
            <a target="_blank" rel="noreferrer" href={backLogUIUrl(settings.board, settings.projectKey, settings.jiraUrl)}><ExternalLinkIcon className="ml-2 mt-1 h-3 w-3" /></a>
        </div>
        <div className={isLoadingNs ? "text-center" : ""}>
            {isLoadingNs && <Spinner className="text-center" />}
            {!isLoadingNs && filterSprint(issueNotInSprint?.issues).map((i, index) => {
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
            {!isLoadingNs && bk.length===0 && <div className="dark:text-white text-center">No Data</div>}
        </div>
    </div>
}