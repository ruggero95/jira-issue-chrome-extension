import { Project } from "./jira.projects";

export type ColumnConfig = {    
        "name": string;//"TO-DO",
        "statuses": StatusDetail[]    
}
export type StatusDetail = {
    id:string; //"10012",
    self:string; //"https://team-1602237711474.atlassian.net/rest/api/2/status/10012"
}
export type JiraConfiguration = {
    "id": number;//4,
    "name": string;// "Board FB",
    "type":string; // "simple",
    "self": string; //"https://team-1602237711474.atlassian.net/rest/agile/1.0/board/4/configuration",
    "location": Project;
    "columnConfig": {
        "columns": ColumnConfig[],
        "constraintType": string; //"none"
    }
}