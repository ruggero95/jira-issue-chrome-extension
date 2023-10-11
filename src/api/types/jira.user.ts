import { DefaultAvatar } from "./jira.issue";

export type JiraUser =  {
    "self": string;//"https://team-1602237711474.atlassian.net/rest/api/3/user?accountId=70121:52405140-7951-46b9-ad84-11a4a05f464b",
    "accountId": string;//"70121:52405140-7951-46b9-ad84-11a4a05f464b",
    "accountType": string;//"atlassian",
    "avatarUrls": DefaultAvatar;
    "displayName": string;//"Ruggero Panzeri",
    "active": boolean; //true,
    "timeZone": string;//"Europe/Rome",
    "locale": string;//"en_US"
}