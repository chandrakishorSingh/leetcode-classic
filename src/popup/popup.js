if (browser === undefined) {
    var browser = chrome;
    console.log("browser is undefined");
    console.log("browser: ", browser);
    console.log("chrome: ", chrome);
}

const EXTENSION_ENABLE_STATE_KEY = "EXTENSION_ENABLE_STATE_KEY";
let isEnabled;

console.log("popup.js loaded: " + new Date().toLocaleDateString());
const toggleButton = document.getElementById("toggle");

const setInitialToggleState = () => {
    browser.storage.local.get([EXTENSION_ENABLE_STATE_KEY], (result) => {
        if (result.EXTENSION_ENABLE_STATE_KEY === null || result.EXTENSION_ENABLE_STATE_KEY === undefined) {
            isEnabled = false;
        } else {
            isEnabled = result.EXTENSION_ENABLE_STATE_KEY;
        }

        console.log("Initial toggle state after extension loading: " + isEnabled);

        toggleButton.innerText = isEnabled ? "Disable Old UI" : "Enable Old UI";
    });
};

// toggle button click listener
toggleButton.addEventListener("click", () => {
    console.log("toggle button clicked");

    browser.storage.local.get([EXTENSION_ENABLE_STATE_KEY], (result) => {
        if (result.EXTENSION_ENABLE_STATE_KEY === null || result.EXTENSION_ENABLE_STATE_KEY === undefined) {
            isEnabled = false;
        } else {
            isEnabled = result.EXTENSION_ENABLE_STATE_KEY;
        }
        
        console.log(`LeetCode Classic Enabled: ${isEnabled}`);

        isEnabled = !isEnabled;
        toggleButton.innerText = isEnabled ? "Disable Old UI" : "Enable Old UI";

        browser.storage.local.set({ EXTENSION_ENABLE_STATE_KEY: isEnabled });
        console.log(`After toggle click, LeetCode Classic Enabled: ${isEnabled}`);
    });

});

setInitialToggleState();
