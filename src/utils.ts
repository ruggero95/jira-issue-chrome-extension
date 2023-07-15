export const setChromeStorage = async (key:string, value:string)=>{
        if(process.env.NODE_ENV==="development"){
            return window.localStorage.setItem(key, value)
        }
        return chrome.storage.local.set({ key: value })  
}

export const getChromeStorage = async (key:string)=>{
    if(process.env.NODE_ENV==="development"){
        return window.localStorage.getItem(key)
    }
    return (await chrome.storage.local.get([key])).key
}