type DefaultAvatar = {
    "48x48": string; // "https://secure.gravatar.com/avatar/9be91e42d09eb3a73bafae6c70070e37?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FRP-4.png";
    "24x24": string; //"https://secure.gravatar.com/avatar/9be91e42d09eb3a73bafae6c70070e37?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FRP-4.png";
    "16x16": string; // "https://secure.gravatar.com/avatar/9be91e42d09eb3a73bafae6c70070e37?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FRP-4.png";
    "32x32": string; //"https://secure.gravatar.com/avatar/9be91e42d09eb3a73bafae6c70070e37?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FRP-4.png"
}
export type Sprint = {
    "id": number;// 14;
    "self": string;//;"https://team-1602237711474.atlassian.net/rest/agile/1.0/sprint/14";
    "state": string;//; "active";
    "name": string;//;"Sprint W28";
    "startDate": string;//;"2023-07-10T06:00:13.000Z";
    "endDate": string;//;"2023-07-14T19:00:00.000Z";
    "originBoardId": number;//;4;F
    "goal": string;//;""
}
export type Project = {
    "self": string; //"https://team-1602237711474.atlassian.net/rest/api/2/project/10004";
    "id": string; //"10004";
    "key": string; //"FB";
    "name": string; //"Features & Bugs";
    "projectTypeKey": string; // "software";
    "simplified": boolean; // true;
    "avatarUrls": DefaultAvatar
}

export type IssueType = {
    "self": string; //"https://team-1602237711474.atlassian.net/rest/api/2/issuetype/10019";
    "id": string; //"10019";
    "description": string; // "Una parte del lavoro piccola e ben definita.";
    "iconUrl": string; //"https://team-1602237711474.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10318?size=medium";
    "name": string; //"Task";
    "subtask": boolean; //false;
    "avatarId": number; //10318;
    "entityId": string; //"36d80bff-471b-4862-b59e-b3f6d5d7f5de";
    "hierarchyLevel": number; //0
}

export type Assignee = {
    "self": string;// "https://team-1602237711474.atlassian.net/rest/api/2/user?accountId=63d7d5758978d7a435384627";
    "accountId": string;//"63d7d5758978d7a435384627";
    "emailAddress": string;//"ruggero.panzeri@cherrynpl.com";
    "avatarUrls": DefaultAvatar
    "displayName": string;// "Ruggero Panzeri";
    "active": boolean;//true;
    "timeZone": string;//"Europe/Rome";
    "accountType": string;//"atlassian"

}
export type User = Omit<Assignee, 'emailAddress'>

export type Resolution = {
    "self": string;//"https://team-1602237711474.atlassian.net/rest/api/2/resolution/10000";
    "id": string;// "10000";
    "description": string;// "Il lavoro per questo ticket è stato completato.";
    "name": string;// "Completato"
}
export type Status = {
    "self": string;// "https://team-1602237711474.atlassian.net/rest/api/2/status/10014";
    "description": string;// "";
    "iconUrl": string;//"https://team-1602237711474.atlassian.net/";
    "name": string;//"DONE (DEV)";
    "id": string;//"10014";
    "statusCategory": {
        "self": string;//"https://team-1602237711474.atlassian.net/rest/api/2/statuscategory/3";
        "id": number;//3;
        "key": string;//"done";
        "colorName": string;//"green";
        "name": string;//"Completato"
    }
}

export type Priority = {
    "self": string;//"https://team-1602237711474.atlassian.net/rest/api/2/priority/3";
    "iconUrl": string;//"https://team-1602237711474.atlassian.net/images/icons/priorities/medium.svg";
    "name": string;//"Medium";
    "id": string;//"3"
}
export type Issue = {
    "expand": string; //"operations;versionedRepresentations;editmeta;changelog;renderedFields";
    "id": string; //"10345";
    "self": string; //"https://team-1602237711474.atlassian.net/rest/agile/1.0/issue/10345";
    "key": string; //"FB-1";
    "fields": {
        "statuscategorychangedate": string; // "2023-07-10T18:46:01.926+0200";
        "issuetype": IssueType;
        "parent": {
            "id": string;//"10347";
            "key": string;//"FB-3";
            "self": string;//"https://team-1602237711474.atlassian.net/rest/api/2/issue/10347";
            "fields": {
                "summary": string;//"Impa - IC";
                "status": {
                    "self": string;//"https://team-1602237711474.atlassian.net/rest/api/2/status/10012";
                    "description": string;//"";
                    "iconUrl": string;//"https://team-1602237711474.atlassian.net/";
                    "name": string;//"TO-DO";
                    "id": string;//"10012";
                    "statusCategory": {
                        "self": string;//"https://team-1602237711474.atlassian.net/rest/api/2/statuscategory/2";
                        "id": number;//2;
                        "key": string;//"new";
                        "colorName": string;//"blue-gray";
                        "name": string;//"Da completare"
                    }
                };
                "priority": {
                    "self": string;//"https://team-1602237711474.atlassian.net/rest/api/2/priority/3";
                    "iconUrl": string;//"https://team-1602237711474.atlassian.net/images/icons/priorities/medium.svg";
                    "name": string;//"Medium";
                    "id": string;//"3"
                };
                "issuetype": IssueType
            }
        };
        "timespent": string;
        "sprint": Sprint;
        "project": Project;
        "fixVersions": string[];//[];
        "aggregatetimespent": string; //
        "resolution": Resolution;
        "resolutiondate": string;//"2023-07-10T18:46:01.921+0200";
        "workratio": number;//-1;
        "watches": {
            "self": string;//"https://team-1602237711474.atlassian.net/rest/api/2/issue/FB-1/watchers";
            "watchCount": number;// 1;
            "isWatching": false
        };
        "lastViewed": string;//"2023-07-10T18:49:37.721+0200";
        "issuerestriction": {
            "issuerestrictions": {};
            "shouldDisplay": false
        };
        "created": string;//"2023-07-10T16:34:10.082+0200";

        "epic": string; //null
        "priority": Priority;
        "labels": string[]; //["Impa"];
        "timeestimate": string; //null
        "aggregatetimeoriginalestimate": string; //null
        "versions": string[];//[];
        "issuelinks": string[];//[];
        "assignee": Assignee;
        "updated": string;//"2023-07-10T18:46:01.926+0200";
        "status": Status;
        "components": string[];//[];
        "timeoriginalestimate": string; //null
        "description": string; //null
        "timetracking": {};
        "security": string; //null
        "attachment": string[];//[];
        "aggregatetimeestimate": string; //null
        "flagged": false;
        "summary": string; //"implementare flusso dettaglio protesti";
        "creator": User;
        "subtasks": string[];
        "reporter": User;
        "aggregateprogress": {
            "progress": number;//0;
            "total": number;//0
        };
        "environment": string; //null
        "duedate": string; //null
        "progress": {
            "progress": number;//0;
            "total": number;//0
        };
        "comment": {
            "comments": string[];
            "self": string;//"https://team-1602237711474.atlassian.net/rest/api/2/issue/10345/comment";
            "maxResults": number;//0;
            "total": number;//0;
            "startAt": number;// 0
        };
        "votes": {
            "self": string;//"https://team-1602237711474.atlassian.net/rest/api/2/issue/FB-1/votes";
            "votes": number;//0;
            "hasVoted": false
        };
        "worklog": {
            "startAt": number;// 0;
            "maxResults": number;//20;
            "total": number;//0;
            "worklogs": string[]
        }
    }

}