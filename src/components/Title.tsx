export const Title: React.FC<{title:string, className?:string}> = ({title, className})=>{
    return (
        <h1 className={`${className ?? ''} font-bold text-lg dark:text-white`}>{title}</h1>
    )
}