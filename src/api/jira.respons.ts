import { Board } from "./jira.board";
import { Issue } from "./jira.issue";

export type JiraResponse<T> = {
    "expand"?: string;//"schema,names",
    "startAt": number;// 0,
    "maxResults": number;//150,
    "total": number;//48,
    "isLast"?:boolean;
} & T



export type JiraIssueResponse = JiraResponse<{issues: Issue[]}>
export type JiraBoardResponse = JiraResponse<{values: Board[]}>