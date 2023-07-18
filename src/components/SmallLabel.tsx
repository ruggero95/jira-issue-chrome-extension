export const SmallLabel: React.FC<{text:string, className?:string}> = ({text, className})=>{
    return (<div className={`${className ?? ''} text-[9px] py-[1px] px-2 h-4 font-semibold rounded-sm uppercase`}>{text}</div>)
}