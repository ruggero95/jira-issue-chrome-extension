import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { useContext } from "react"
import { Link } from "react-router-dom"
import { SingleValue } from "react-select"
import { getActiveUsers, getConfiguration, getLabels } from "../../api/jira.api"
import { JiraConfiguration } from "../../api/types/jira.configuration"
import { JiraLabelsListResponse, JiraUsersResponse } from "../../api/types/jira.response"
import { RoutesEnum } from "../../routes"
import { FilterContext } from "../context/filterContext"
import { SettingContext } from "../context/settingsContext"
import { CustomMultiSelect, OptionsSelect } from "../form/CustomMultiSelect"
import { CustomSelect } from "../form/CustomSelect"
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

    let {
        isLoading: isLoadingU, error: errorU, data: users, refetch: refetchU
    } = useQuery<JiraUsersResponse | undefined, AxiosError>({
        queryKey: ['bugworkOnlyWithString'],
        queryFn: () => getActiveUsers(),
    });
    const getStatuses = () => {
        return configuration?.columnConfig.columns.map((c) => c.name)
    }
    return <div>
        <Header>
            <div>
                <Link to={RoutesEnum.HOME}><HomeIcon className="w-6 h-6 hover:cursor-pointer" /></Link>
            </div>
        </Header>
        <div className="flex justify-between">
            <Title title="Filters" />
            <div onClick={() => setFilter({})} className="bg-red-500 rounded-md px-2 h-5 mt-1 cursor-pointer text-sm text-white font-semibold">Reset All</div>
        </div>
        <CustomMultiSelect isLoading={isLoadingLb} value={filter && filter.label ? filter.label.map((l: string) => ({ value: l, label: l })) : []}
            options={labels && labels.values ? labels?.values.map((l) => ({ value: l, label: l })) : []}
            onChange={(e, z) => {
                const newVal = e.map((v) => v.value)
                if (z.action === "remove-value") {
                    setFilter({ ...filter, label: newVal })
                } else if (z.action === "select-option") {
                    setFilter({ ...filter, label: newVal })
                } else if (z.action === "clear") {
                    setFilter({ ...filter, label: undefined })
                }

            }}
            name="filter-label"
            label="Labels"
            className="mt-5" />

        <CustomMultiSelect isLoading={isLoadingC} value={filter && filter.statusIssue ? filter.statusIssue.map((l: string) => ({ value: l, label: l })) : []}
            options={configuration && configuration.columnConfig ? getStatuses()?.map((l) => ({ value: l, label: l })) : []}
            onChange={(e, z) => {
                const newVal = e.map((v) => v.value)
                if (z.action === "remove-value") {
                    setFilter({ ...filter, statusIssue: newVal })
                } else if (z.action === "select-option") {
                    setFilter({ ...filter, statusIssue: newVal })
                } else if (z.action === "clear") {
                    setFilter({ ...filter, statusIssue: undefined })
                }
            }}
            name="filter-status"
            label="Statuses"
            className="mt-8" />
        {setting.onlyMe === "false" && <CustomSelect isLoading={isLoadingC} value={filter && filter.user ? { value: filter.user, label: filter.user } : undefined}
            options={users ? users?.map((u) => ({ value: u.displayName, label: u.displayName })) : []}
            onChange={(e, z) => {
                console.log(e)
                console.log(z)
                if (z.action === "remove-value") {
                    setFilter({ ...filter, user: e?.value })
                } else if (z.action === "select-option") {
                    setFilter({ ...filter, user: e?.value })
                } else if (z.action === "clear") {
                    setFilter({ ...filter, user: undefined })
                }
            }}
            name="filter-users"
            label="Users"
            className="mt-8" />}
    </div>
}