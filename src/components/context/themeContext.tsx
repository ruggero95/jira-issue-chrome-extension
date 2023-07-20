import { createContext, PropsWithChildren, useEffect, useState } from 'react';
import { StorageEnum } from '../../storage';
import { getChromeStorage } from '../../utils';
import { Theme } from '../pages/Settings';


export const ThemeContext = createContext([Theme.LIGHT, ()=>{} ]);

export const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>();
    const getSettings =  () => {
        const themeFromStorage = getChromeStorage(StorageEnum.THEME)        
        setTheme(themeFromStorage as Theme ?? Theme.LIGHT)
    }
    useEffect(() => {
        if(!theme){
            getSettings()
        }
    }, [])
   
    return <ThemeContext.Provider value={[theme, setTheme as any]}>
        {children}
    </ThemeContext.Provider>;
};