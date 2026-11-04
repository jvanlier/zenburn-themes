// ==UserScript==
// @name         Okta Zenburn — sidebar support
// @namespace    local.okta.zenburn
// @version      1.1.3
// @description  Applies the companion Stylus theme inside Okta's open shadow roots.
// @match        https://*.okta.com/app/UserHome*
// @run-at       document-idle
// @grant        none
// ==/UserScript==

// Install alongside okta-zenburn.user.css using Tampermonkey or Violentmonkey.
(() => {
  const css = `
    :host {
      color-scheme: dark;
      color: var(--zb-fg, #eeeede);
      background-color: var(--zb-bg, #3f3f3f) !important;
    }
    *, *::before, *::after {
      border-color: var(--zb-border, #858575) !important;
      scrollbar-color: var(--zb-border, #858575) var(--zb-bg, #3f3f3f);
    }
    div, header, main, nav, aside, section, footer, slot {
      background-color: transparent !important;
      color: var(--zb-fg, #eeeede) !important;
    }
    :host > div, main {
      background-color: var(--zb-bg, #3f3f3f) !important;
    }
    nav, aside, [role="navigation"], .MuiPaper-root,
    [data-se="sidenav-header-logo-container"],
    [data-se="sidenav-toggle-button"] {
      background-color: var(--zb-panel, #303030) !important;
    }
    header, [role="banner"], .MuiAppBar-root,
    div:has(> slot[name="top-nav-left-side"]),
    div:has(> slot[name="top-nav-right-side"]) {
      background-color: var(--zb-bg, #3f3f3f) !important;
      border-bottom: 0 !important;
      box-shadow: none !important;
    }
    h1, h2, h3, p, span, a, button, .MuiTypography-root,
    .MuiSvgIcon-root, .MuiListItemIcon-root {
      color: var(--zb-fg, #eeeede) !important;
    }
    svg {
      color: var(--zb-fg, #eeeede) !important;
      fill: currentColor !important;
    }
    svg path:not([fill="none"]) {
      fill: currentColor !important;
    }
    svg [stroke]:not([stroke="none"]) {
      stroke: currentColor !important;
    }
    [data-se="sidenav-toggle-button"]::before {
      background-color: var(--zb-card, #494949) !important;
      box-shadow: 0 0 0 1px var(--zb-border, #858575) !important;
    }
    [data-se="sidenav-toggle-button"]:hover::before {
      background-color: var(--zb-selected, #505b4b) !important;
    }
    button, a { background-color: transparent !important; }
    button:hover, a:hover, .MuiListItemButton-root:hover {
      background-color: var(--zb-hover, #53534b) !important;
      color: var(--zb-yellow, #f0dfaf) !important;
    }
    [aria-current="page"], [aria-selected="true"], .Mui-selected {
      background-color: var(--zb-selected, #505b4b) !important;
      color: var(--zb-green, #afc49f) !important;
    }
    [aria-current="page"] *, [aria-selected="true"] *, .Mui-selected * {
      color: var(--zb-green, #afc49f) !important;
    }
    [data-se="sidenav-header-logo"] svg,
    [data-se="sidenav-header-logo"] img {
      filter: brightness(0) saturate(100%) invert(90%) sepia(12%) !important;
    }
    :focus-visible {
      outline: 2px solid var(--zb-yellow, #f0dfaf) !important;
      outline-offset: 2px !important;
    }
  `;
  const watched = new WeakSet();

  function scan(node) {
    if (node.nodeType === Node.ELEMENT_NODE && node.shadowRoot) {
      watch(node.shadowRoot);
    }
    node.querySelectorAll?.('[data-odyssey-react-web-component]').forEach(host => {
      if (host.shadowRoot) watch(host.shadowRoot);
    });
  }

  function watch(root) {
    if (watched.has(root)) return;
    watched.add(root);
    if (root instanceof ShadowRoot) {
      const style = document.createElement('style');
      style.textContent = css;
      // Reuse Okta's style nonce when the page has a nonce-based CSP.
      const nonce = root.querySelector('style[nonce]')?.nonce
        || document.querySelector('script[nonce], style[nonce]')?.nonce;
      if (nonce) style.nonce = nonce;
      root.append(style);
    }
    new MutationObserver(records => {
      for (const record of records) {
        for (const node of record.addedNodes) scan(node);
      }
    }).observe(root, { childList: true, subtree: true });
    scan(root);
  }

  watch(document);
})();
