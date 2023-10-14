import { SettingsI } from "../components/context/settingsContext"
import { StorageEnum } from "../storage"
import { authAxiosInstance, buildParam, getChromeStorage } from "../utils"
import { JiraConfiguration } from "./types/jira.configuration"
import { CustomField } from "./types/jira.customField"
import { Status } from "./types/jira.issue"
import { JiraIssueResponseV3, JiraLabelsListResponse, JiraProjectResponse, JiraStatusesPerTaskResponse, JiraUsersResponse } from "./types/jira.response"

export type Pagination = {
    start:number;
    maxResults:number;
}
const getUrl = (v: "1.0" | "3" = "1.0") => {
    //at localhost for dev purposes i use a proxy impemented in file localproxy.js
    let url = (JSON.parse(getChromeStorage(StorageEnum.SETTINGS) ?? "{}") as SettingsI).jiraUrl
    if(url){
        url = url.replace(/\/+$/,'')
    }
    return `${process.env.NODE_ENV === "development" ? "http://localhost:4001?url=" : ''}${url}/rest/${v === "1.0" ? "agile" : "api"}/${v}`
}

export const getIssuesV3 = async (pagination:Pagination, jql?:string): Promise<JiraIssueResponseV3 | undefined>=>{
    try{
        const {start, maxResults} = pagination
        const params = buildParam({maxResults: maxResults.toString(), start: start.toString(), jql})
        const issues = await (await authAxiosInstance()).get<JiraIssueResponseV3>(`${getUrl('3')}/search?${params.toString()}`)
        return issues.data
    }catch(e){
        console.log(e)
    }  
}

export const getCustomFields = async ()=>{
    //call this in setting page and save custom fileds in settings under sprint and environment
    //https://team-1602237711474.atlassian.net/rest/api/3/field
    //maps custom field with data
    //use https://team-1602237711474.atlassian.net/rest/api/3/jql/autocompletedata to understand what can be queried
    const customFields = await (await authAxiosInstance()).get<CustomField[]>(`${getUrl("3")}/field`)
    return customFields.data
}


export const getIssueWithActiveSprintV3 = async (pagination:Pagination, project:number,jql?:string): Promise<JiraIssueResponseV3 | undefined>=>{
    const sprintJql = `Sprint in openSprints() AND Sprint not in futureSprints() AND project=${project} `
    const jqlS = jql ? `${sprintJql} AND ${jql}` : sprintJql
    return getIssuesV3(pagination, jqlS)
    
}
export const getIssueNotInSprintV3 = async(pagination:Pagination,project:number, jql?:string): Promise<JiraIssueResponseV3 | undefined>=>{
    const notInSprint =  `Sprint is null AND  project=${project}`;
    const jqlS = jql ? `${notInSprint} AND ${jql}`: notInSprint;
    return getIssuesV3(pagination, jqlS)
}


export const getProjects = async (pagination:Pagination, jql?:string): Promise<JiraProjectResponse>=>{
    const params = buildParam({jql, maxResults: pagination.maxResults.toString(), start: pagination.start.toString() })
    const projects = await (await authAxiosInstance()).get<JiraProjectResponse>(`${getUrl("3")}/project/search?${params.toString()}`)
    return projects.data
}

export const getLabels = async (): Promise<JiraLabelsListResponse> => {
    const issues = await (await authAxiosInstance()).get(`${getUrl("3")}/label`)
    return issues.data
}

export const getStatuses = async(project:number):Promise<JiraStatusesPerTaskResponse>=>{
    const issues = await (await authAxiosInstance()).get<JiraStatusesPerTaskResponse>(`${getUrl("3")}/project/${project}/statuses`)
    return issues.data
}

export const getStatusesList = async (project:number):Promise<Status[]>=>{
    const statuses = await getStatuses(project)
    const allStatus:Status[] = [];
    statuses.forEach((st)=>{
        st.statuses.forEach((s)=>{
            const presence = allStatus.find((as)=>as.name===s.name)
            if(!presence){
                allStatus.push(s)
            }
        })
    })
    return allStatus
}

const getUsers = async ():Promise<JiraUsersResponse>=>{
    const users =  await (await authAxiosInstance()).get<JiraUsersResponse>(`${getUrl("3")}/users/search`)
    return users.data
}

export const getActiveUsers = async ()=>{
    return (await getUsers()).filter((u)=>u.active===true && u.accountType==="atlassian")
}

export const getProjectUIUrl = ( projectKey: string, url: string) => `${url}/browse/${projectKey}`

export const backLogUIUrl = (boardId: string, projectKey: string, url: string) => `${url}/jira/software/projects/${projectKey}/boards/${boardId}/backlog?epics=visible`

export const openIssueUIUrl = (boardId: string, projectKey: string, url: string, fbCode: string) => `${url}/jira/software/projects/${projectKey}/boards/${boardId}/backlog?epics=visible&selectedIssue=${fbCode}`