const browserApi = typeof browser !== 'undefined' ? browser : chrome;

const EXTENSION_ENABLE_STATE_KEY = "EXTENSION_ENABLE_STATE_KEY";

const newUrlRegex = /^https:\/\/leetcode\.com\/problems\/([a-zA-Z0-9\-]+)\/?(description\/?)?(\?.*)?$/;
const classicUrlRegex = /^https:\/\/leetcode\.com\/classic\/problems\/([a-zA-Z0-9\-]+)\/?(description\/?)?(\?.*)?$/;

// store a given key-value pair
const setKeyValuePair = async (key, value) => {
    await browserApi.storage.local.set({ [key]: value });
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

document.addEventListener('DOMContentLoaded', async () => {
    console.log("popup.js loaded: " + new Date().toLocaleDateString());

    // get the reference of toggle button and label
    const toggleButton = document.getElementById("toggle");
    const statusLabel = document.getElementById("status-label");

    let isEnabled = await isKeyExists(EXTENSION_ENABLE_STATE_KEY);
    isEnabled = isEnabled === undefined ? true : isEnabled;

    toggleButton.checked = isEnabled;
    statusLabel.innerText = isEnabled ? "Classic UI is ON" : "Classic UI is OFF"

    // toggle button click listener
    toggleButton.addEventListener("change", async () => {
        console.log("toggle button clicked");
        
        const isEnabled = toggleButton.checked;
        console.log(`toggleButton new state ${isEnabled}`);

        statusLabel.innerText = isEnabled ? "Classic UI is ON" : "Classic UI is OFF"

        await setKeyValuePair(EXTENSION_ENABLE_STATE_KEY, isEnabled);
        console.log(`After toggle click, LeetCode Classic Enabled: ${isEnabled}`);

        const [tab] = await browserApi.tabs.query({ active: true, currentWindow: true });
        const url = tab.url;

        if (!isEnabled && classicUrlRegex.test(url)) {
            const newUrl = url.replace("https://leetcode.com/classic/", "https://leetcode.com/");
            browserApi.tabs.update(tab.id, {url: newUrl});
        } else if (isEnabled && newUrlRegex.test(url)) {
            const classicUrl = url.replace("https://leetcode.com/", "https://leetcode.com/classic/");
            browserApi.tabs.update(tab.id, {url: classicUrl});
        }
    });
});
