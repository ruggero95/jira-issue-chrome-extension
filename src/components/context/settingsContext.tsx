import React from 'react';
import { createContext, PropsWithChildren, useEffect, useState } from 'react';
import { StorageEnum } from '../../storage';
import { getChromeStorage, setChromeStorage } from '../../utils';
import { Theme } from '../pages/Settings';

export type SettingsI = {
    token?: string;
    onlyMe?: string;
    project?: number;
    mail?: string;
    jiraUrl?: string;
    theme?: Theme;
    projectKey?: string;
    sprintCustomField?: string;
    environmentCustomField?: string;
}
export const SettingContext = createContext([{
    token: undefined,
    onlyMe: undefined,
    mail: undefined,
    project: undefined, //TODO remove this
    projectKey: undefined,
    jiraUrl: undefined,
    sprintCustomField: undefined,
    environmentCustomField: undefined
}, () => { }]);

export const SettingProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [settings, setSettings] = useState<SettingsI>({
        project: 4,
    });

    const getSettings = () => {
        const settingsFromStorage = getChromeStorage(StorageEnum.SETTINGS)
        setSettings(JSON.parse(settingsFromStorage ?? "{}"))
    }
    const persistentSetSettings = (settings: SettingsI): void => {
        setChromeStorage(StorageEnum.SETTINGS, JSON.stringify(settings))
        setSettings(settings)
    }
    useEffect(() => {
        if (!settings.token) {
            getSettings()
        }
    }, [])
    return <SettingContext.Provider value={[settings as any, persistentSetSettings]}>
        {children}
    </SettingContext.Provider>;
};