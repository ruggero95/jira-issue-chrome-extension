import { Issue } from "./jira.issue";

export type JiraResponse<T> = {
    "expand": string;//"schema,names",
    "startAt": number;// 0,
    "maxResults": number;//150,
    "total": number;//48,
} & T



export type JiraIssueResponse = JiraResponse<{issues: Issue[]}>