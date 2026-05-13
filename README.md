# LeetCode Classic

A browser extension to view [LeetCode](https://leetcode.com/) problems in old web UI.

### TODO

#### Priority: High
- [ ] Replace the existing button in popup and implement a toggle switch button in popup like this
- [ ] Make the default state of extension as enabled(right after user has installed the extension)
- [ ] Switch the current leetcode problem in new UI if user disables the extension while the current problem was opened in old UI(and vice-versa)

#### Priority: Medium
- [ ] Implement light and dark theme
- [ ] Use typescript instead of javascript for better development experience. Use this type definition package of chrome api extension(https://www.npmjs.com/package/chrome-types)

#### Priority: Low
- [ ] Can be published on opera add-ons and edge add-ons later as these browsers can also install extension from chrome web store.

### Current Task
- [ ] Add robust error handling
    - What happens when url has query parameters ? (already handled)
    - Rapid toggling

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