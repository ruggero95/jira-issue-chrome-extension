import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { useContext } from "react"
import { Link } from "react-router-dom"
import { getConfiguration, getLabels } from "../../api/jira"
import { JiraConfiguration } from "../../api/jira.configuration"
import { JiraLabelsListResponse } from "../../api/jira.respons"
import { RoutesEnum } from "../../routes"
import { FilterContext } from "../context/filterContext"
import { SettingContext } from "../context/settingsContext"
import { CustomMultiSelect } from "../form/CustomMultiSelect"
import { Header } from "../Header"
import { HomeIcon } from "../icons/HomeIcon"
import { Title } from "../Title"

export const Filter = () => {
    const [setting, setSetting] = useContext(SettingContext) as any
    const [filter, setFilter] = useContext(FilterContext) as any
    let {
        isLoading: isLoadingLb, error: errorLb, data: labels, refetch: refetchLb
    } = useQuery<JiraLabelsListResponse | undefined, AxiosError>({
        queryKey: [getLabels.name],
        queryFn: () => getLabels(),
    });

    let {
        isLoading: isLoadingC, error: errorC, data: configuration, refetch: refetchC
    } = useQuery<JiraConfiguration | undefined, AxiosError>({
        queryKey: [getConfiguration.name, setting.board],
        queryFn: () => getConfiguration(setting.board),
    });

    const getStatuses = ()=>{
        return configuration?.columnConfig.columns.map((c)=>c.name)
    }
    return <div>
        <Header>
            <div>
                <Link to={RoutesEnum.HOME}><HomeIcon className="w-6 h-6 hover:cursor-pointer" /></Link>
            </div>
        </Header>
        <Title  title="Filters" />
        <CustomMultiSelect isLoading={isLoadingLb} value={filter && filter.label ? filter.label.map((l:string)=>({value:l, label:l})): []}
            options={labels && labels.values ? labels?.values.map((l) => ({ value: l, label: l })) : []}
            onChange={(e, z) => {               
                const newVal =  e.map((v)=>v.value)
                if(z.action==="remove-value"){
                    setFilter({ ...filter, label: newVal })
                }else if(z.action==="select-option"){
                    setFilter({ ...filter, label: newVal })
                }else if(z.action==="clear"){
                    setFilter({...filter, label:undefined})
                }

            }}
            name="filter-label"
            label="Labels"
            className="mt-5" />
         
         <CustomMultiSelect isLoading={isLoadingC} value={filter && filter.statusIssue ? filter.statusIssue.map((l:string)=>({value:l, label:l})): []}
            options={configuration && configuration.columnConfig ? getStatuses()?.map((l) => ({ value: l, label: l })) : []}
            onChange={(e, z) => {             
                const newVal =  e.map((v)=>v.value)
                if(z.action==="remove-value"){
                    setFilter({ ...filter, statusIssue: newVal })
                }else if(z.action==="select-option"){
                    setFilter({ ...filter, statusIssue: newVal })
                }else if(z.action==="clear"){
                    setFilter({...filter, statusIssue:undefined})
                }
            }}
            name="filter-status"
            label="Statuses"
            className="mt-8" />
    </div>
}