import { useState } from "react"
import { StorageEnum } from "../../storage"
import { setChromeStorage } from "../../utils"
import { CustomInput } from "../form/CustomInput"
import { SettingsHeader } from "../SettingsHeader"
import { Title } from "../Title"

const TOKEN_LINK="https://id.atlassian.com/manage-profile/security/api-tokens"

export const Settings = ()=>{
    const [token, setToken] = useState<string | undefined>()

    const changeToken = (e: React.ChangeEvent<HTMLInputElement>)=>{
        const token = e.target.value
        setChromeStorage(StorageEnum.TOKEN, token)
        setToken(token)
    }


    return <div>
        <SettingsHeader/>
        <Title title='Settings' />
        <CustomInput id="token" name="token" value={token ?? ''} onChange={(e)=>{changeToken(e)}} label="Token" small={<a href={TOKEN_LINK} rel="noreferrer" target="_blank">Genera token</a>}/>
    </div>
}