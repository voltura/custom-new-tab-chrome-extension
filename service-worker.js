let customTabUrl = 'https://www.google.com';
const storage = chrome.storage.local;

storage.get('customTabUrl', function (items) {
	if (items.customTabUrl) {
		customTabUrl = items.customTabUrl;
	}
});

chrome.commands.onCommand.addListener(async function (command) {
	if (command == 'open_custom_tab') {
		storage.get('customTabUrl', function (items) {
			if (items.customTabUrl) {
				customTabUrl = items.customTabUrl;
			}
		});
		chrome.tabs.create({ url: customTabUrl })
	}
});

chrome.runtime.onInstalled.addListener(() => {
	const indexPageUrl = chrome.runtime.getURL("index.html");
	chrome.tabs.create({
		url: indexPageUrl
	});
});

chrome.storage.onChanged.addListener((changes, namespace) => {
	for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
		if (key == 'customTabUrl') {
			customTabUrl = newValue;
		}
	}
});

chrome.action.onClicked.addListener(tab => {
  chrome.scripting.executeScript({
    target: {tabId: tab.id},
    files: ['silentoptions.js'],
  });
});
