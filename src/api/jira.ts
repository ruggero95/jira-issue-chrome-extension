import { authAxiosInstance } from "../utils"
import { JiraBoardResponse, JiraIssueResponse } from "./jira.respons"
const team = "team-1602237711474"


const getUrl = ()=>{
    return `${process.env.NODE_ENV==="development" ? "http://localhost:4001?url=":''}https://${team}.atlassian.net/rest/agile/1.0`
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

export const getIssueWithSprint = async (jql?: string,  board: number = 4, maxResults: number = 150,) => {
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

export const getBoardUIUrl = (boardId:string,projectKey:string, url:string)=>`${url}/jira/software/projects/${projectKey}/boards/${boardId}`

export const backLogUIUrl = (boardId:string,projectKey:string, url:string)=>`${url}/jira/software/projects/${projectKey}/boards/${boardId}/backlog?epics=visible`

export const openIssueUIUrl = (boardId:string,projectKey:string, url:string, fbCode:string)=>`${url}/jira/software/projects/${projectKey}/boards/${boardId}/backlog?epics=visible&selectedIssue=${fbCode}`