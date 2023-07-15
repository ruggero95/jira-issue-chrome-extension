export const Title: React.FC<{title:string, className?:string}> = ({title, className})=>{
    return (
        <h1 className={`${className ?? ''} font-bold text-lg`}>{title}</h1>
    )
}