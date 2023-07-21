import { PropsWithChildren } from 'react';
import Select, { ActionMeta, MultiValue } from 'react-select';
import { components } from "react-select";

export const colourOptions: readonly OptionsSelect[] = [
    { value: 'ocean', label: 'Ocean' },
    { value: 'blue', label: 'Blue' },
    { value: 'purple', label: 'Purple' },
    { value: 'red', label: 'Red' },
    { value: 'orange', label: 'Orange' },
    { value: 'yellow', label: 'Yellow' },
    { value: 'green', label: 'Green' },
    { value: 'forest', label: 'Forest' },
    { value: 'slate', label: 'Slate' },
    { value: 'silver', label: 'Silver' },
];

export type OptionsSelect = {
    value: string | number;
    label: string | number
}
export const Control = (props: any) => {
    return (
        <>
            <LabelSelect isFloating={props.isFocused || props.hasValue}>{props.label}</LabelSelect>
            <components.Control  {...props} className={"dark:bg-gray-900"} />
        </>
    );
};

export const LabelSelect: React.FC<PropsWithChildren & { isFloating: boolean }> = ({ children, isFloating }) => {
    return (
        <span className={`${isFloating ? "-translate-y-4 scale-75 text-red-500" : "top-2"} left-1 z-[1] px-2 absolute text-gray-500 bg-white text-sm dark:bg-gray-900 transition`}>{children}</span>
    )
}
export const CustomMultiSelect: React.FC<{ label: string, isLoading: boolean, options?: OptionsSelect[], className?: string, name: string, onChange: ((newValue: MultiValue<OptionsSelect>, actionMeta: ActionMeta<OptionsSelect>) => void), value: OptionsSelect[] }> = ({ options, label, className, isLoading, name, value, onChange }) => {
    return (
        <Select
            isLoading={isLoading}
            isMulti
            name={name}
            options={options}
            value={value}
            onChange={onChange}
            components={{ Control: (props: any) => <Control {...props} label={label} /> }}
            placeholder=""
            className={`${className ?? ''} basic-multi-select focus:border-red-500 peer-focus:text-red-500 border-1`}
            styles={{
              
                menu: (base) => ({
                    ...base,
                    zIndex:10
                }),
                control: (base, state) => ({
                    ...base,
                    boxShadow: "none",
                    borderColor: "#d1d5db",
                    "&:focus-within": {
                        borderColor: "#ef4444",
                    },
                    "&:hover": {
                        borderColor: "#ef4444",
                    }
                    // You can also use state.isFocused to conditionally style based on the focus state
                }),
                multiValue: (styles, { data }) => {
                    return {
                        ...styles,
                        backgroundColor: "#ef4444",
                        borderRadius: "5px",
                        fontWeight: "bold"
                    };
                },
                multiValueLabel: (styles, { data }) => ({
                    ...styles,
                    color: "white"
                }),
                multiValueRemove: (styles, { data }) => ({
                    ...styles,
                    backgroundColor: "#ef4444",
                    color: "white",
                    borderRadius: "5px",

                    ":hover": {
                        backgroundColor: "#ff6c6c",
                        color: "white"
                    }
                })
            }}
            classNamePrefix="select"
        />
    )
}