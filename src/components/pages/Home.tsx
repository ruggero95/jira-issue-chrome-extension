import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { getIssueNotInSprint, getIssueWithSprint } from "../../api/jira";
import { JiraIssueResponse } from "../../api/jira.respons";
import { copyContent } from "../../utils";
import { Card } from "../Card";
import {  HomeHeader } from "../HomeHeader"
import { Spinner } from "../Spinner";
import { Title } from "../Title"

export const Home = () => {
    let {
        isLoading:isLoadingSp, error:errorSp, data:sprintIssue, refetch:refetchSp
    } = useQuery<JiraIssueResponse | undefined, AxiosError> ({
            queryKey: [getIssueWithSprint.name],
            queryFn: () => getIssueWithSprint(),
        });

        let {
            isLoading:isLoadingNs, error:errorNs, data:issueNotInSprint, refetch:refetchNs
        } = useQuery<JiraIssueResponse | undefined, AxiosError> ({
                queryKey: [getIssueNotInSprint.name],
                queryFn: () => getIssueNotInSprint(),
            });

    return <div>
        <HomeHeader />
        <Title title='Sprint' />
        <div>
        {isLoadingSp && <Spinner className="text-center"/>}
            {!isLoadingSp && sprintIssue?.issues?.map((i)=>{
                return <Card>
                    <div className="flex">
                        <div className="px-3 py-2 bg-gray-100 rounded-lg cursor-pointer">{i.key}</div>
                        <div className="font-sm">{i.fields.summary}</div>
                    </div>
                    
                </Card>
            })}
        </div>
        <Title title='Backlog' />
        <div>
            {isLoadingNs && <Spinner className="text-center"/>}
            {!isLoadingNs && issueNotInSprint?.issues?.map((i)=>{
                return <Card>
                {i.key}
            </Card>
            })}
        </div>
    </div>
}