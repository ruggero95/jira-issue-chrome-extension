import { useEffect, useState } from "react"
import { copyContent } from "../utils"
import { CheckIcon } from "./icons/CheckIcon"
import { CopyIcon } from "./icons/CopyIcon"

export const CopyButton: React.FC<{ keyIssue: string }> = ({ keyIssue }) => {
    const [copied, setCopied] = useState(false)

    useEffect(() => {
        const timeout = setTimeout(() => {
          if (copied) setCopied(false);
        }, 1000);
    
        return () => clearTimeout(timeout);
      }, [copied]);

    return (
        <div onClick={() => {copyContent(keyIssue); setCopied(true);}} className="px-3 py-2 h-[40px] mr-2 flex-none bg-gray-100 rounded-lg flex cursor-pointer">
            <div>
                {!copied &&<CopyIcon className="w-4 h-4 m-1 drop-shadow-lg dark:text-black duration-300 ease-in-out" />}
                {copied &&<CheckIcon className="w-4 h-4 m-1 drop-shadow-lg duration-300 ease-in-out  text-green-500" />}
            </div>
            <div className="text-sm dark:text-black flex-none font-bold">
                {keyIssue}
            </div>
        </div>
    )
}