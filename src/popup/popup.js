const browserApi = typeof browser !== 'undefined' ? browser : chrome;

const EXTENSION_ENABLE_STATE_KEY = "EXTENSION_ENABLE_STATE_KEY";

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
    
    // get the reference of toggle button
    const toggleButton = document.getElementById("toggle");

    // toggle button click listener
    toggleButton.addEventListener("click", async () => {
        console.log("toggle button clicked");

        let isEnabled = await isKeyExists(EXTENSION_ENABLE_STATE_KEY);
        isEnabled = isEnabled === undefined ? true : isEnabled;

        console.log(`Initial state Enabled: ${isEnabled}`);


        isEnabled = !isEnabled;
        toggleButton.innerText = isEnabled ? "Disable Old UI" : "Enable Old UI";

        await setKeyValuePair(EXTENSION_ENABLE_STATE_KEY, isEnabled);
        console.log(`After toggle click, LeetCode Classic Enabled: ${isEnabled}`);
    });


    let isEnabled = await isKeyExists(EXTENSION_ENABLE_STATE_KEY);
    isEnabled = isEnabled === undefined ? true : isEnabled;

    toggleButton.innerText = isEnabled ? "Disable Old UI" : "Enable Old UI";
});
