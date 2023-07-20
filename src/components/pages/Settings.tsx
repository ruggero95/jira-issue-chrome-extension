import { useContext } from "react"
import { StorageEnum } from "../../storage"
import { setChromeStorage } from "../../utils"
import { BoardList } from "../BoardList"
import { SettingContext } from "../context/settingsContext"
import { CustomInput } from "../form/CustomInput"
import { CustomToggle } from "../form/CustomToggle"
import { SettingsHeader } from "../SettingsHeader"
import { Title } from "../Title"


const TOKEN_LINK = "https://id.atlassian.com/manage-profile/security/api-tokens"


export enum Theme {
    DARK = "dark",
    LIGHT = "light"
}
export const Settings = () => {
    const [settings, setSettings] = useContext(SettingContext) as any

    const changeValue = async (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
        const val = e.target.type === "checkbox" ? (e.target.checked).toString() : e.target.value
        let uSettings: any = { ...settings }
        uSettings[key] = val
        setChromeStorage(StorageEnum.SETTINGS, JSON.stringify(uSettings))
        setSettings(uSettings)
    }
    return <div className="dark:text-white">

        <SettingsHeader />
        <Title title='Settings' />
        <CustomInput id="token" name="token" value={settings?.token ?? ''} onChange={(e) => { changeValue(e, 'token') }} label="Token" small={<a href={TOKEN_LINK} rel="noreferrer" target="_blank">Genera token</a>} />
        <CustomInput id="mail" name="mail" value={settings?.mail ?? ''} onChange={(e) => { changeValue(e, 'mail') }} label="Mail" />
        <CustomInput id="jiraUrl" name="jiraUrl" value={settings?.jiraUrl ?? ''} onChange={(e) => { changeValue(e, 'jiraUrl') }} label="Jira Url" small={"Esempio: https://team-123456.atlassian.net"} />
        <CustomToggle onChange={(e) => { changeValue(e, 'onlyMe') }} checked={settings?.onlyMe?.toString() === "true"} value={settings?.onlyMe?.toString() ?? "true"} text="Show only my issue" id="toggle" />
        <div className="font-bold mt-2">
            Boards
        </div>
        {settings?.token && settings.mail && settings.jiraUrl && <BoardList />}

    </div>
}