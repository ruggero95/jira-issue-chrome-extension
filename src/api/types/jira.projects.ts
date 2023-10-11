import { DefaultAvatar } from "./jira.issue";

export type Project = {
        expand: string; //"description,lead,issueTypes,url,projectKeys,permissions,insight",
        self: string; //"https://team-1602237711474.atlassian.net/rest/api/3/project/10004",
        id: string; //"10004",
        key: string; //"FB",
        name: string; //"Features & Bugs",
        avatarUrls: DefaultAvatar;
        projectTypeKey: string; //"software",
        simplified: boolean;
        style: string; //"next-gen",
        isPrivate: boolean;
        properties: {},
        entityId: string; //"6d0c0d41-c7ae-4b0b-bf99-169dca453972",
        uuid: string; //"6d0c0d41-c7ae-4b0b-bf99-169dca453972"
}