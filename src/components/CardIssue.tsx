import { useState } from "react";
import { doTransition, getTransitions } from "../api/jira.api";
import { Transition } from "../api/types/jira.transition";
import { Card } from "./Card";
import { CopyButton } from "./CopyButton";
import { DropDownSelect, DropdownSelectOption } from "./form/Dropdownselect";
import { ExternalLinkIcon } from "./icons/ExternalLinkIcon";
import { SmallLabel } from "./SmallLabel";
import toast from 'react-hot-toast';

export const CardIssue: React.FC<{
    keyIssue: string,
    summary: string;
    assignee?: string;
    issueUrl: string,
    labels: string[];
    epic:string;
    priority:string;
    status:string;
}> = ({
    keyIssue,
    summary,
    assignee,
    status,
    issueUrl,
    labels,
    epic,
    priority
}) => {
    const mapTransitions = (status:string,transitions?: Transition[], ): DropdownSelectOption[]=>{
        console.log(transitions, status)
        if(!transitions){
            return []
        }
        return transitions.map((t)=>({
            text:t.to.name.toUpperCase(),
            value:t.to.name,
            default: t.to.name===status,
            hiddenFromList:t.to.name===status,
        }))
    }
    const [transitions, setTransitions] = useState<Transition[]| undefined>(undefined)

    let optList: DropdownSelectOption[] = [{ text: status, value: status, default:true, hiddenFromList:true }]
    if(typeof transitions!=='undefined'){
        optList = mapTransitions(status, transitions)   
    }

    const [loading, setLoading] = useState(false)
        return (
            <Card>
                <div className="flex mb-2 justify-between">
                    <div className="flex">
                    {epic!=='' && <SmallLabel className="bg-purple-100 max-w-[130px] truncate text-purple-800 mr-2" text={epic}/>}
                        <img src={priority} className={"w-4 h-4"} alt="assignee" />
                    </div>
                    <div className="flex">
                    <DropDownSelect isLoadingPreserveContent={false}  isLoading={loading} onDropdownClick={async()=>{
                        setLoading(true)
                        const transitions= await getTransitions(keyIssue)
                        setLoading(false)
                        setTransitions(transitions.transitions)
                    }} className="bg-green-100 truncate	text-green-800 mr-2" 
                        list={optList} onChange={async (option,prevOption)=>{
                            console.log(prevOption)
                            console.log(option)
                            const t = transitions?.find((t)=>t.to.name===option.value)
                            console.log('transitioning',t)
                            if(t){
                                const success = await doTransition(keyIssue,t)
                                if(success){
                                    toast.success(t.to.name.toUpperCase())
                                    return true
                                }else{
                                    toast.error('error')
                                  
                                    return false
                                }
                            }  
                            return false                          
                        } }/>
                        {assignee && <img src={assignee} className={"w-6 h-6 rounded-full"} alt="assignee" />}
                    </div>
                </div>
                <div className="flex">
                    <CopyButton keyIssue={keyIssue} />
                    <div className="font-sm text-sm">{summary}</div>
                </div>
                <div className="flex justify-between mt-2">
                    <a target="_blank" rel="noreferrer" href={`${issueUrl}&selectedIssue=${keyIssue}`}><ExternalLinkIcon className="cursor-pointer mt-1 h-3 w-3"/></a>
                    <div className="justify-end flex gap-2">
                        {labels.map((l, index) => {
                            return <SmallLabel key={`label-${index}`} className="bg-gray-100 dark:text-black" text={l}/>
                        })}
                    </div>
                    
                </div>
            </Card>
        )
    }

