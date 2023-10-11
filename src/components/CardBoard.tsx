import { useContext } from "react"
import { getBoardUIUrl, getProjectUIUrl } from "../api/jira.api"
import { Board } from "../api/types/jira.board"
import { Project } from "../api/types/jira.projects"
import { Card } from "./Card"
import { SettingContext } from "./context/settingsContext"
import { CustomRadio } from "./form/CustomRadio"
import { ExternalLinkIcon } from "./icons/ExternalLinkIcon"

export const CardProject: React.FC<{ htmlId: string, project: Project, inputName:string}> = ({htmlId, project,inputName }) => {
    const [settings, setSettings] = useContext(SettingContext) as any
    const {id, name, key} = project
    return (
        <Card className="cursor-pointer h-[110px]" onClick={()=>setSettings({...settings, project:id, projectKey: key})} key={`board-${htmlId}`}>
            <div className="flex justify-between">
                <div>
                    <CustomRadio id={`radio-${htmlId}`} onChange={()=>{}} name={inputName} value={""} checked={settings.project===id} />    
                </div>
                <a target="_blank" rel="noreferrer" href={getProjectUIUrl(key, settings.jiraUrl)}><ExternalLinkIcon className="h-4 w-4" /></a>
            </div>
            <div className="mt-3">{name.toLowerCase()}</div>
        </Card>)
}