import { useContext } from "react"
import { getBoardUIUrl } from "../api/jira"
import { Board } from "../api/jira.board"
import { Card } from "./Card"
import { SettingContext } from "./context/settingsContext"
import { CustomRadio } from "./form/CustomRadio"
import { ExternalLinkIcon } from "./icons/ExternalLinkIcon"

export const CardBoard: React.FC<{ id: string, board: Board, inputName:string}> = ({ id, board,inputName }) => {
    const [settings, setSettings] = useContext(SettingContext) as any

    return (
        <Card className="cursor-pointer" onClick={()=>setSettings({...settings, board:board.id, projectKey: board.location.projectKey})} key={`board-${id}`}>
            <div className="flex justify-between">
                <div>
                    <CustomRadio id={`radio-${id}`} onChange={()=>{}} name={inputName} value={""} checked={settings.board===board.id} />    
                </div>
                <a target="_blank" rel="noreferrer" href={getBoardUIUrl(board.id.toString(), board.location.projectKey, settings.jiraUrl)}><ExternalLinkIcon className="h-4 w-4" /></a>
            </div>
            <div className="mt-3">{board.name.toLowerCase()}</div>
        </Card>)
}