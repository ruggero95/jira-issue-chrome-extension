import { SettingsI } from "../components/context/settingsContext"
import { StorageEnum } from "../storage"
import { authAxiosInstance, getChromeStorage } from "../utils"
import { JiraConfiguration } from "./jira.configuration"
import { JiraBoardResponse, JiraIssueResponse, JiraLabelsListResponse, JiraUsersResponse } from "./jira.respons"


const getUrl = (v = "1.0") => {
    //at localhost for dev purposes i use a proxy impemented in file localproxy.js
    let url = (JSON.parse(getChromeStorage(StorageEnum.SETTINGS) ?? "{}") as SettingsI).jiraUrl
    if(url){
        url = url.replace(/\/+$/,'')
    }
    return `${process.env.NODE_ENV === "development" ? "http://localhost:4001?url=" : ''}${url}/rest/${v === "1.0" ? "agile" : "api"}/${v}`
}
export const getIssues = async (jql?: string, maxResults: number = 150, board: number = 4): Promise<JiraIssueResponse | undefined> => {
    try {
        const params = new URLSearchParams({ maxResults: maxResults.toString() })
        if (jql) {
            params.set('jql', jql)
        }
        const issues = await (await authAxiosInstance()).get<JiraIssueResponse>(`${getUrl()}/board/${board}/issue?${params.toString()}`)
        return issues.data
    } catch (e) {
        console.log(e)
    }
}

export const getIssueWithSprint = async (jql?: string, board: number = 4, maxResults: number = 150,) => {
    const jqlS = jql ? `sprint!=null AND ${jql}` : 'sprint!=null'
    return getIssues(jqlS, maxResults, board)
}

export const getIssueNotInSprint = async (jql?: string, board: number = 4, maxResults: number = 150,) => {
    const jqlS = jql ? `sprint=null AND ${jql}` : 'sprint=null'
    return getIssues(jqlS, maxResults, board)
}


export const getBoards = async (maxResults: number = 150, jql?: string,): Promise<JiraBoardResponse> => {
    const params = new URLSearchParams({ maxResults: maxResults.toString() })
    if (jql) {
        params.set('jql', jql)
    }
    const issues = await (await authAxiosInstance()).get<JiraBoardResponse>(`${getUrl()}/board?${params.toString()}`)
    return issues.data
}

export const getLabels = async (): Promise<JiraLabelsListResponse> => {
    const issues = await (await authAxiosInstance()).get(`${getUrl("3")}/label`)
    return issues.data
}

export const getConfiguration = async (board: number): Promise<JiraConfiguration> => {
    const issues = await (await authAxiosInstance()).get<JiraConfiguration>(`${getUrl()}/board/${board}/configuration`)
    return issues.data
}


const getUsers = async ():Promise<JiraUsersResponse>=>{
    const users =  await (await authAxiosInstance()).get<JiraUsersResponse>(`${getUrl("3")}/users/search`)
    return users.data
}

export const getActiveUsers = async ()=>{
    return (await getUsers()).filter((u)=>u.active===true && u.accountType==="atlassian")
}
export const getBoardUIUrl = (boardId: string, projectKey: string, url: string) => `${url}/jira/software/projects/${projectKey}/boards/${boardId}`

export const backLogUIUrl = (boardId: string, projectKey: string, url: string) => `${url}/jira/software/projects/${projectKey}/boards/${boardId}/backlog?epics=visible`

export const openIssueUIUrl = (boardId: string, projectKey: string, url: string, fbCode: string) => `${url}/jira/software/projects/${projectKey}/boards/${boardId}/backlog?epics=visible&selectedIssue=${fbCode}`