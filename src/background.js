const browserApi = typeof browser !== 'undefined' ? browser : chrome;

const EXTENSION_ENABLE_STATE_KEY = "EXTENSION_ENABLE_STATE_KEY";

const createClassicUrl = (url) => {
    return url.replace("https://leetcode.com/", "https://leetcode.com/classic/");
};

const isUrlMatchingPattern = (url) => {
    if (url === null || url === undefined) {
        return false;
    }

    // regex for matching leetcode problem urls
    // modify it so that it also match when url has query parameters
    // example: https://leetcode.com/problems/two-sum/?envType=study-plan&id=algorithm-i

    const regex = /^https:\/\/leetcode\.com\/problems\/([a-zA-Z0-9\-]+)\/?(description\/?)?(\?.*)?$/;
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

// check if a key exists in the storage
const isKeyExists = async (key) => {
    const details = await browserApi.storage.local.get(key);
    if (details[key] !== undefined) {
        console.log(`${key} is: ${details[key]}`);
        return details[key];
    }

    console.log(`${key} is: undefined`);
    return undefined;
};

// store a given key-value pair
const setKeyValuePair = async (key, value) => {
    await browserApi.storage.local.set({ [key]: value });
};

// on installed listener
browserApi.runtime.onInstalled.addListener(async () => {
    console.log("On installed: ", new Date().toLocaleDateString());

    const value = await isKeyExists(EXTENSION_ENABLE_STATE_KEY);
    if (value === undefined) {
        console.log('No flag exists on installed');
        await setKeyValuePair(EXTENSION_ENABLE_STATE_KEY, true);
    } else {
        console.log('Flag exists already');
    }
});

// onBeforeNavigate listener
browserApi.webNavigation.onBeforeNavigate.addListener(async (details) => {
        if (!details || details.frameId !== 0 || typeof details.tabId !== 'number' || details.tabId < 0) {
            return;
        }

        const frameId = details.frameId;
        const tabId = details.tabId;
        const url = details.url;
        console.log("frameId: " + frameId);
        console.log("tabId: " + tabId);
        console.log("url: " + url);

        console.log("onBeforeNavigate called");

        let isEnabled = await isKeyExists(EXTENSION_ENABLE_STATE_KEY);
        if (isEnabled === undefined || isEnabled == null) {
            isEnabled = true;
            await setKeyValuePair(EXTENSION_ENABLE_STATE_KEY, isEnabled);
        }

        if (isEnabled === false) {
            return;
        }

        if (isUrlMatchingPattern(url)) {
            const newUrl = createClassicUrl(url);
            browserApi.tabs.update(tabId, { url: newUrl });
        }
    },
    {
        url: [
            { hostEquals: "leetcode.com", pathPrefix: "/problems/" }
        ]
    }
);
