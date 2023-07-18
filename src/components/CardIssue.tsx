import { Card } from "./Card";
import { CopyButton } from "./CopyButton";
import { SmallLabel } from "./SmallLabel";

export const CardIssue: React.FC<{
    keyIssue: string,
    summary: string;
    assignee: string;
    issueUrl: string,
    labels: string[];
    epic:string;
    priority:string;
    status:string;
}> = ({
    keyIssue,
    summary,
    assignee,
    status,
    issueUrl,
    labels,
    epic,
    priority
}) => {
        return (
            <Card>
                <div className="flex mb-2 justify-between">
                    <div className="flex">
                    {epic!=='' && <SmallLabel className="bg-purple-100 max-w-[130px] truncate text-purple-800 mr-2" text={epic}/>}
                        <img src={priority} className={"w-4 h-4"} alt="assignee" />
                    </div>
                    <div className="flex">
                        <SmallLabel className="bg-green-100 max-w-[72px] truncate	text-green-800 mr-2" text={status}/>
                        <img src={assignee} className={"w-6 h-6 rounded-full"} alt="assignee" />
                    </div>
                </div>
                <div className="flex">
                    <CopyButton keyIssue={keyIssue} />
                    <div className="font-sm text-sm">{summary}</div>
                </div>
                <div className="flex justify-end mt-2">
                    {labels.map((l, index) => {
                        return <SmallLabel key={`label-${index}`} className="bg-gray-100 dark:text-black" text={l}/>
                    })}
                </div>
            </Card>
        )
    }