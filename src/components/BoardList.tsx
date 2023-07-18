import { AxiosError } from "axios";
import { getBoards } from "../api/jira";
import { JiraBoardResponse } from "../api/jira.respons";
import { useQuery } from '@tanstack/react-query'
import {Card} from "./Card"
import { Spinner } from "./Spinner";
export const BoardList: React.FC<{board:number}> = ({board})=>{
    let {
        isLoading, error, data: boards, refetch
    } = useQuery<JiraBoardResponse | undefined, AxiosError> ({
            queryKey: [getBoards.name],
            queryFn: () => getBoards(),
        });
        
    return (
    <div className={`grid grid-cols-2 ${isLoading ? 'grid-cols-1' : 'grid-cols-2'} gap-x-4`}>
        {!isLoading && boards?.values.map((b)=>{
            console.log(b)
           return <Card>
            {b.name}
           </Card>
        })}
        {
            isLoading && <Spinner className="text-center"/>
        }
    </div>)
}

