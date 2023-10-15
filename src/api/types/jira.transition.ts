export type Transition = {
    id: string;//"21",
    name: string;//"In corso",
    to: {
        self: string; //"https://team-1602237711474.atlassian.net/rest/api/3/status/10013",
        description: string; //"L'assegnatario sta lavorando attivamente sul ticket in questo momento.",
        iconUrl: string; //"https://team-1602237711474.atlassian.net/",
        name: string; //"In corso",
        id: string; //"10013",
        statusCategory: {
            self: string; //"https://team-1602237711474.atlassian.net/rest/api/3/statuscategory/4",
            id: number;//4,
            key: string; //"indeterminate",
            colorName: string; //"yellow",
            name: string; //"In corso"
        }
    },
    hasScreen: boolean; //false,
    isGlobal: boolean; //true,
    isInitial: boolean; //false,
    isAvailable: boolean; //true,
    isConditional: boolean; //false,
    isLooped: boolean; //false
}