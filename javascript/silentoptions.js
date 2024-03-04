const storage = chrome.storage.local;

await loadAndSaveCustomTabUrl();

async function loadAndSaveCustomTabUrl() {
	let readValue;
	storage.get('customTabUrl', function (items) {
		if (items.customTabUrl) {
			readValue = items.customTabUrl;
		}
	});
	if (readValue) {
		await storage.set({ customTabUrl: readValue });	
	}
}
