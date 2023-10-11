import { Board } from "./jira.board";
import { Issue } from "./jira.issue";
import { Project } from "./jira.projects";
import { JiraUser } from "./jira.user";

export type JiraResponse<T> = {
    "expand"?: string;//"schema,names",
    "startAt": number;// 0,
    "maxResults": number;//150,
    "total": number;//48,
    "isLast"?:boolean;
} & T



export type JiraIssueResponse = JiraResponse<{issues: Issue[]}>
export type JiraBoardResponse = JiraResponse<{values: Board[]}>
export type JiraLabelsListResponse = JiraResponse<{values:string[]}>
export type JiraUsersResponse = JiraUser[]


export type JiraProjectResponse = JiraResponse<{values:Project[]}>