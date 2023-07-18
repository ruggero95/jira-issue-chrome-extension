import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { getIssueNotInSprint, getIssueWithSprint } from "../../api/jira";
import { JiraIssueResponse } from "../../api/jira.respons";
import { copyContent } from "../../utils";
import { Card } from "../Card";
import { CardIssue } from "../CardIssue";
import { CopyButton } from "../CopyButton";
import { HomeHeader } from "../HomeHeader"
import { CopyIcon } from "../icons/CopyIcon";
import { Spinner } from "../Spinner";
import { Title } from "../Title"

export const Home = () => {
    let {
        isLoading: isLoadingSp, error: errorSp, data: sprintIssue, refetch: refetchSp
    } = useQuery<JiraIssueResponse | undefined, AxiosError>({
        queryKey: [getIssueWithSprint.name],
        queryFn: () => getIssueWithSprint(),
    });

    let {
        isLoading: isLoadingNs, error: errorNs, data: issueNotInSprint, refetch: refetchNs
    } = useQuery<JiraIssueResponse | undefined, AxiosError>({
        queryKey: [getIssueNotInSprint.name],
        queryFn: () => getIssueNotInSprint(),
    });
    const issueRefetch = () => {
        refetchSp()
        refetchNs()
    }
    return <div>
        <HomeHeader refetch={issueRefetch} />
        <Title title='Sprint' />
        <div>
            {isLoadingSp && <Spinner className="text-center" />}
            {!isLoadingSp && sprintIssue?.issues?.map((i, index) => {
                return <CardIssue
                    status={i.fields.status.name}
                    epic={i.fields.parent && i.fields.parent.fields ? i.fields.parent.fields.summary : ''}
                    key={`sprint-${index}`}
                    keyIssue={i.key}
                    assignee={i.fields.assignee.avatarUrls["48x48"]}
                    labels={i.fields.labels}
                    issueUrl={i.self}
                    summary={i.fields.summary}
                    priority={i.fields.priority.iconUrl} />
            })}
        </div>
        <Title title='Backlog' />
        <div>
            {isLoadingNs && <Spinner className="text-center" />}
            {!isLoadingNs && issueNotInSprint?.issues?.map((i, index) => {
                return <CardIssue
                    status={i.fields.status.name}
                    epic={i.fields.parent && i.fields.parent.fields ? i.fields.parent.fields.summary : ''}
                    key={`backlog-${index}`}
                    keyIssue={i.key}
                    assignee={i.fields.assignee.avatarUrls["48x48"]}
                    labels={i.fields.labels}
                    issueUrl={i.self}
                    summary={i.fields.summary}
                    priority={i.fields.priority.iconUrl} />
            })}
        </div>
    </div>
}