# LeetCode Classic

A browser extension to view [LeetCode](https://leetcode.com/) problems in old web UI.

### TODO

#### Priority: High
- [ ] Replace the existing button in popup and implement a toggle switch button in popup like this
- [ ] Add robust error handling
    - What happens when url has query parameters ?
    - What if someone manually enters a broken URL ? Add validation.
    - Rapid toggling
- [ ] Make the default state of extension as enabled(right after user has installed the extension)
- [ ] Switch the current leetcode problem in new UI if user disables the extension while the current problem was opened in old UI(and vice-versa)

#### Priority: Medium
- [ ] Implement light and dark theme
- [ ] Use typescript instead of javascript for better development experience. Use this type definition package of chrome api extension(https://www.npmjs.com/package/chrome-types)

#### Priority: Low
- [ ] Can be published on opera add-ons and edge add-ons later as these browsers can also install extension from chrome web store.

### Current Task

- [ ] Update the build script to:
    - add the following config in firefox's manifest.json
    ```
    "browser_specific_settings": {
		"gecko": {
			"id": "leetcode-classic-extension-@chandrakishorsingh.com",
			"data_collection_permissions": {
      			"required": [
        			"none"
      			]
    		},
			"strict_min_version": "142.0"
		}
	}
    ```
    - make a zip file of all of the extension related files which include the popup/background script/assets/manifest files etc(this zip file is uploaded in the firefox's add-ons website and chrome's web store website)
	- separate out various components of build script like cleaning, copying, transforming operations for chrome and firefox

### Current State

- core redirection functionality is working in both firefox and chromium based browsers(chrome/edge/vivaldi/brave/opera)
- successfully published the extension in [firefox add-ons website](https://addons.mozilla.org/en-US/firefox/addon/leetcode-classic/) and [chrome web store](https://chromewebstore.google.com/detail/leetcode-classic/ngbnjblikbpjmfcijjoifbhlkiblkcmf)

### Suggestions by AI

1. Navigation listener may process too broadly
- webNavigation.onBeforeNavigate is used without filtering frame type/tab context.
- Could trigger on non-main-frame navigations depending on browser behavior.

2. No test/lint/sanity checks
- package.json has build scripts only; no lint/test/type checks.
- For extension logic, even lightweight smoke checks would improve reliability.

3. Build tooling dependency assumption
- update-manifests uses jq CLI directly.
- node-jq is listed as dependency, but script depends on system-installed jq.