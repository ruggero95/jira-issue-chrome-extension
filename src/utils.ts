import axios from "axios"
import { SettingsI } from "./components/context/settingsContext"
import { StorageEnum } from "./storage"

export const setChromeStorage = async (key: string, value: string) => {
    return window.localStorage.setItem(key, value)
}

export const getChromeStorage =  (key: string) => {       
    return window.localStorage.getItem(key) 
}


const authHeader =  () => {
    const settings: SettingsI = JSON.parse(getChromeStorage(StorageEnum.SETTINGS) ?? "{}")
    const auth = btoa(`${settings.mail}:${settings.token}`)
    return {
        Authorization: `Basic ${auth}`,
        accept: 'application/json',  
    }
}
export const authAxiosInstance = async () => {
    const h =  authHeader()
    return axios.create({
        headers: { ...h }
    })
} 

export const copyContent = async (text:string) => {
    try {
      await navigator.clipboard.writeText(text);      
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  }

  export const buildParam = (params:Record<string, string|undefined>):URLSearchParams=>{
    const pUrl =  new URLSearchParams()
    Object.entries(params).map(([key, value])=>{
        if(params[key] && value){
            pUrl.set(key,value)
        }
    })
    return pUrl
}