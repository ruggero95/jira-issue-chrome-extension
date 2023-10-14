import { Status } from "./jira.issue";

export type StatusPerTask = {
    self: string;//"https://team-1602237711474.atlassian.net/rest/api/3/issuetype/10018",
    id: string;//"10018",
    name: string;//"Story",
    subtask: boolean;//false,
    statuses:Status[];
}