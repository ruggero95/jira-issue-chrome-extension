const allResourceTypes = 
    Object.values(chrome.declarativeNetRequest.ResourceType);
const rules = [
  {
    id: 1,
    priority: 1,
    action: {
      type: chrome.declarativeNetRequest.RuleActionType.MODIFY_HEADERS,
      responseHeaders: [
        {
          operation: chrome.declarativeNetRequest.HeaderOperation.SET,
          header: 'Access-Control-Allow-Origin',
          value: '*',
        },
      ]
    },
    condition: {
      urlFilter: 'https://*.atlassian.net/rest/agile/1.0',
      resourceTypes: allResourceTypes,
    }
  },
];
chrome.declarativeNetRequest.updateDynamicRules({
  removeRuleIds: rules.map((rule) => rule.id), // remove existing rules
  addRules: rules
});