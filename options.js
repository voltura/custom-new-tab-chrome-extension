const storage = chrome.storage.local;
const saveButton = document.querySelector('button.save');
const customTabUrl = document.querySelector('input');
let messageClearTimer;

loadChanges();

saveButton.addEventListener('click', saveChanges);

async function saveChanges() {
	let customTabUrlValue = customTabUrl.value;
	if (!customTabUrlValue) {
		customTabUrlValue = '';
	}
	if (customTabUrlValue == '') {
		customTabUrlValue = 'chrome://newtab';
	}
	if (!customTabUrlValue.startsWith('chrome://') && !customTabUrlValue.startsWith('http://') && !customTabUrlValue.startsWith('https://')) {
		customTabUrlValue = 'https://' + customTabUrlValue;
	}
	await storage.set({ customTabUrl: customTabUrlValue });
	message('Settings saved');
}

function loadChanges() {
	storage.get('customTabUrl', function (items) {
		if (items.customTabUrl) {
			customTabUrl.value = items.customTabUrl;
			message('Loaded saved settings');
		} else {
			customTabUrl.value = 'chrome://newtab';
		}
	});
}

function message(msg) {
	clearTimeout(messageClearTimer);
	const message = document.querySelector('.message');
	message.innerText = msg;
	messageClearTimer = setTimeout(function () {
		message.innerText = '';
	}, 750);
}
