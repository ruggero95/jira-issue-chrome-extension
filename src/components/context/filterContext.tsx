import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { StorageEnum } from "../../storage";
import { getChromeStorage, setChromeStorage } from "../../utils";


export type FilterI = {
    label?: string[];
    statusIssue?: string[];
}
export const FilterContext = createContext([{
    label: undefined,
    statusIssue: undefined
}, () => {}]);


export const FilterProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [filters, setFilters] = useState<FilterI>({

    });
    const getFilters = () => {
        const settingsFromStorage = getChromeStorage(StorageEnum.FILTERS)
        setFilters(JSON.parse(settingsFromStorage ?? "{}"))
    }
    const persistentSetFilters = (filters: FilterI): void => {
        setChromeStorage(StorageEnum.FILTERS, JSON.stringify(filters))
        setFilters(filters)
    }
    useEffect(() => {
        if (!filters.label) {
            getFilters()
        }
    }, [])

    return <FilterContext.Provider value={[filters as any, persistentSetFilters]}>
        {children}
    </FilterContext.Provider>
}