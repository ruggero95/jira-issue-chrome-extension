export const CustomToggle: React.FC<{
    id: string,
    text: string,
    name?: string,
    value: string
    className?: string;
    onChange: React.ChangeEventHandler<HTMLInputElement> | undefined,
}> = ({ id, text, name, value, className, onChange }) => {
    return (
        <div className={ `flex ${className ?? ''}`}>
            <div className="mr-3">
                {text}
            </div>
            <label htmlFor={id} className="relative h-7 w-12 cursor-pointer">
                <input name={name} onChange={onChange} value={value} type="checkbox" id={id} className="peer sr-only" />
                <span
                    className="absolute inset-0 rounded-full bg-gray-300 transition peer-checked:bg-red-500"
                ></span>
                <span
                    className="absolute inset-0 m-1 h-5 w-5 rounded-full bg-white transition peer-checked:translate-x-5"
                ></span>
            </label>
        </div>
    )
}