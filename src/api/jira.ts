import axios, { RawAxiosRequestHeaders } from "axios"
import { getChromeStorage } from "../utils"
import { JiraIssueResponse } from "./jira.respons"
const team = "team-1602237711474"

const authHeader = async () => {
    return {
        auth: {
            username: await getChromeStorage('username'),
            password: await getChromeStorage('password')
        }
    }
}
export const getIssues = async (jql?: string, maxResults: number = 150, board: number = 4): Promise<JiraIssueResponse | undefined> => {
    try {
        const params = new URLSearchParams({ maxResults: maxResults.toString() })
        if (jql) {
            params.set('jql', jql)
        }
        const issues = await axios.get<JiraIssueResponse>(`https://${team}.atlassian.net/rest/agile/1.0/board/${board}/issue?${params.toString()}`, {...(await authHeader())})
        return issues.data
    } catch (e) {
        console.log(e)
    }
}

export const getIssueWithSprint = async (jql?: string, maxResults: number = 150, board: number = 4)=>{
    const jqlS = jql ? `sprint!=null AND ${jql}` : 'sprint!=null'
    return getIssues(jqlS,maxResults, board)
}

export const getIssueNotInSprint = async (jql?: string, maxResults: number = 150, board: number = 4)=>{
    const jqlS = jql ? `sprint=null AND ${jql}` : 'sprint!=null'
    return getIssues(jqlS,maxResults, board)
}