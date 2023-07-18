import { useEffect, useState } from "react"
import { StorageEnum } from "../../storage"
import { getChromeStorage, setChromeStorage } from "../../utils"
import { BoardList } from "../BoardList"
import { CustomInput } from "../form/CustomInput"
import { CustomToggle } from "../form/CustomToggle"
import { SettingsHeader } from "../SettingsHeader"
import { Title } from "../Title"


const TOKEN_LINK = "https://id.atlassian.com/manage-profile/security/api-tokens"
export type SettingsI = {
    token?: string,
    onlyMe?: string,
    board?: number
}
export const Settings = () => {
    const [settings, setSettings] = useState<SettingsI | undefined>({
        token: undefined,
        onlyMe: "true",
        board: 4
    })
    useEffect(() => {
        async function loadSetting() {
            const settings = JSON.parse(await getChromeStorage(StorageEnum.SETTINGS) ?? "{}")
            setSettings(settings)
        }
        console.log('useeff')
        console.log(settings)
        if (!settings?.token) {
            loadSetting()
        }
    }, [])

   
    const changeValue = async (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
        const val = e.target.value
        let uSettings: any = { ...settings }
        uSettings[key] = val
        console.log(uSettings)
        await setChromeStorage(StorageEnum.SETTINGS, JSON.stringify(uSettings))
        setSettings(uSettings)
    }
    return <div>
        <SettingsHeader />
        <Title title='Settings' />
        <CustomInput id="token" name="token" value={settings?.token ?? ''} onChange={(e) => { changeValue(e, 'token') }} label="Token" small={<a href={TOKEN_LINK} rel="noreferrer" target="_blank">Genera token</a>} />
        <CustomToggle onChange={(e) => changeValue(e, 'onlyMe')} value={settings?.onlyMe?.toString() ?? "true"} text="Show only my issue" id="toggle" />
        <div className="font-bold mt-2">
            Boards
        </div>
        {settings?.token && <BoardList board={settings.board ?? 4}/>}

    </div>
}