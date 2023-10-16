import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { Spinner } from "../Spinner";
export type DropdownSelectOption = {
    value: any,
    default?: boolean,
    hiddenFromList?: boolean;
    text: any
}

function useOutsideAlerter(ref: any, callback: any) {
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event: any) {
            if (ref.current && !ref.current.contains(event.target)) {
                console.log('cb')
                callback()
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}

export const DropDownSelect: React.FC<PropsWithChildren<{
    list: DropdownSelectOption[],
    onChange: (option: DropdownSelectOption, prevOption?:DropdownSelectOption) => boolean | Promise<boolean>, className?: string;
    isLoading: boolean;
    isLoadingPreserveContent:boolean; //if there is already content and this is true the loadin animation will not be showed
    onDropdownClick: () => void
}>>
    =
    ({ onChange, list, className, onDropdownClick, isLoading, isLoadingPreserveContent }) => {

        const dV = list.find((l) => l.default === true)

        const [selected, setSelected] = useState<DropdownSelectOption | undefined>(dV)

        const [display, setDisplay] = useState(false)
        const wrapperRef = useRef(null);
        useOutsideAlerter(wrapperRef, () => {
            setDisplay(false)
        });

        return <div className="relative inline-block cursor-pointer text-left" >
            <div onClick={() => { setDisplay(!display); onDropdownClick(); }} >
                <div className={`${className ?? ''} text-[9px] flex py-[1px] pl-2 pr-1 h-4 font-semibold rounded-sm uppercase`}>

                    {!selected && 'Select'}
                    {selected && selected.text}
                    <svg className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                    </svg>
                </div>

            </div>
            {display && <div ref={wrapperRef} className="absolute right-0  z-10 mt-2 w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex={-1}>
                <div className="py-1" role="none">
                    {isLoading && list.length<=1 && <Spinner width="w-4" heigth="h-4" position="text-center"/>}
                    {list.map((l, index) => {
                        return l.hiddenFromList ? null : <button type="button" onClick={async () => {  setDisplay(false); const result = await onChange(l,selected); if(result){setSelected(l);}  }} key={`l-${index}`} className="text-gray-700 w-full text-[11px] block px-4 py-1 hover:bg-gray-100" role="menuitem" tabIndex={-1} id="menu-item-0" data-value={l.value}>{l.text}</button>
                    })}
                </div>
            </div>}
        </div>

    }

/*
<button type="button" className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true">
                {!selected && !dV && 'Select'}
                {!selected && dV && dV.text}
                {selected && selected.text}
                <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                </svg>
            </button>
*/