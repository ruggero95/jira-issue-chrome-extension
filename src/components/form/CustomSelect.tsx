import Select, { ActionMeta, InputActionMeta, MultiValue, SingleValue } from 'react-select';
import { Control, customStyles, OptionsSelect } from './CustomMultiSelect';

export const CustomSelect: React.FC<{ label: string, isLoading: boolean, options?: OptionsSelect[], className?: string, name: string, onChange: ((newValue: SingleValue<OptionsSelect>, actionMeta: ActionMeta<OptionsSelect>) => void)    , value?: OptionsSelect }> = ({ options, label, className, isLoading, name, value, onChange }) => {
    return (
        <Select
        className={`${className ?? ''} basic-single focus:border-red-500 peer-focus:text-red-500 border-1`}
        classNamePrefix="select"       
        isLoading={isLoading}
        isClearable
        name="color"
        options={options}
        components={{ Control: (props: any) => <Control {...props} label={label} /> }}
        onChange={onChange}
        value={value}
        placeholder=""    
      />
    )
}