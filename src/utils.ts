import axios from "axios"
import { SettingsI } from "./components/pages/Settings"
import { StorageEnum } from "./storage"

export const setChromeStorage = async (key: string, value: string) => {
    console.log(process.env.NODE_ENV)
    if (process.env.NODE_ENV === "development") {
        console.log('classic storage')

        return window.localStorage.setItem(key, value)
    }
    console.log('storage extension')
    console.log('tring setting')
    console.log(value)
    console.log(key)
    return storageSetPromise(key, value)
}


const storageSetPromise = (key: string, value: string) => {
    return new Promise((resolve, reject) => {
        chrome.storage.local.set({ key: value }, () => {
            console.log('SEEEEETTT***********************')
            resolve(key)
        })
    })
}


export const getChromeStorage = async (key: string) => {
    console.log(process.env.NODE_ENV)
    if (process.env.NODE_ENV === "development") {
        console.log('classic storage')
        return window.localStorage.getItem(key)
    }
    console.log('storage extension')
    console.log(key)
    const l = await chrome.storage.local.get([key])
    console.log(l)
    return (l).key
}


const authHeader = async () => {
    const settings: SettingsI = JSON.parse(await getChromeStorage(StorageEnum.SETTINGS) ?? "{}")
    const auth = btoa(`${settings.mail}:${settings.token}`)
    return {
        Authorization: `Basic ${auth}`,
        accept: 'application/json',  
    }
}
export const authAxiosInstance = async () => {
    const h = await authHeader()
    return axios.create({
        headers: { ...h }
    })
} 

export const copyContent = async (text:string) => {
    try {
      await navigator.clipboard.writeText(text);
      console.log('Content copied to clipboard');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  }