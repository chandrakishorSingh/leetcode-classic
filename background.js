let count = 0;
const EXTENSION_ENABLE_STATE_KEY = "EXTENSION_ENABLE_STATE_KEY";

const createClassicUrl = (url) => {
    return url.replace("https://leetcode.com/", "https://leetcode.com/classic/");
};


const isUrlMatchingPattern = (url) => {
    if (url === null || url === undefined) {
        return false;
    }

    const regex = /^https:\/\/leetcode\.com\/problems\/([a-zA-Z0-9\-]+)\/?(description\/?)?$/;
    const matches = url.match(regex);

    if (matches === null || matches === undefined || matches.length === 0) {
        console.log(`not match url: ${url}`)
        return false;
    }
    
    console.log("match length: " + matches.length);
    console.log("match 1: " + matches[0]);
    console.log("match 2: " + matches[1]);
    console.log("match 3: " + matches[2]);
    return true;
};

chrome.webNavigation.onBeforeNavigate.addListener(
    (details) => {
        let isEnabled = true;

        chrome.storage.local.get([EXTENSION_ENABLE_STATE_KEY], (result) => {
            if (result.EXTENSION_ENABLE_STATE_KEY === null || result.EXTENSION_ENABLE_STATE_KEY === undefined || result.EXTENSION_ENABLE_STATE_KEY === false) {
                isEnabled = false;
            }

            if (isEnabled === false) {
                con
                return;
            }

            count++;
            console.log("call count: " + count);
            console.log("Url: " + details.url);
            console.log("tabId: " + details.tabId);

            const url = details.url;
            const tabId = details.tabId;

            if (isUrlMatchingPattern(url)) {
                const newUrl = createClassicUrl(url);
                chrome.tabs.update(tabId, { url: newUrl });
            }
        });
    }
);
