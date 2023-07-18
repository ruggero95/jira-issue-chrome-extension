import { createContext, PropsWithChildren, useEffect, useState } from 'react';
import { StorageEnum } from '../../storage';
import { getChromeStorage } from '../../utils';


export const SettingContext = createContext([{
    token: undefined,
    onlyMe: undefined,
    mail: undefined,
    board: undefined,
    jiraUrl:undefined
}, ()=>{} ]);

export const SettingProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [settings, setSettings] = useState({
        token: undefined,
        onlyMe: undefined,
        mail: undefined,
        board: undefined,
        jiraUrl:undefined
    });

    const getSettings = async () => {
        const settingsFromStorage = await getChromeStorage(StorageEnum.SETTINGS)        
        setSettings(JSON.parse(settingsFromStorage ?? "{}"))
    }
    useEffect(() => {
        if(!settings.token){
            getSettings()
        }
    }, [])
    return <SettingContext.Provider value={[settings, setSettings as any]}>
        {children}
    </SettingContext.Provider>;
};