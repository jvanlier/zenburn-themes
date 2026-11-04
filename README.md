# Zenburn themes

Zenburn dark themes for websites: warm charcoal backgrounds, cream text, and muted green accents.

Each website has its own folder under `themes/`. Themes use [Stylus](https://add0n.com/stylus.html); sites with a shadow DOM may also need a companion userscript.

## Themes

| Website                               | Stylus theme                                           | Companion userscript                                           | README                          |
|---------------------------------------|--------------------------------------------------------|----------------------------------------------------------------|---------------------------------|
| [Okta dashboard](GALLERY.md#okta)     | [CSS](themes/okta/okta-zenburn.user.css)               | [Sidebar and header](themes/okta/okta-zenburn-sidebar.user.js) | [README](themes/okta/README.md) |
| [Hacker News](GALLERY.md#hacker-news) | [CSS](themes/hacker-news/hacker-news-zenburn.user.css) | —                                                              | —                               |

See the [screenshot gallery](GALLERY.md) for previews.

## Install

### CSS → Stylus

1. Install Stylus in your browser.
2. Open the website's `.user.css` file from this repository and copy its contents.
3. Create a new style in Stylus, paste the CSS, and save. The file includes its URL scope.

### JavaScript → Violentmonkey

For a theme with a companion `.user.js` file:

1. Install [Violentmonkey](https://violentmonkey.github.io/get-it/) or [Tampermonkey](https://www.tampermonkey.net/).
2. Choose **Create a new script** in that extension.
3. Replace the sample code with the contents of the `.user.js` file and save.
4. Keep the Stylus theme enabled and reload the website.

**Paste `.user.css` into Stylus and `.user.js` into your userscript manager.**

To update, replace the code in the corresponding extension with the latest file, save, and reload the website.

## Add a website

Create `themes/<website>/<website>-zenburn.user.css`. Add a companion `.user.js` only when CSS cannot reach the relevant elements, and add the theme to the table above.

- Scope each file to the website and paths it supports.
- Use the existing Okta theme's palette as a starting point.
- Keep text readable, keyboard focus visible, and error states distinct.
- Check the theme on the actual website, including menus and hover states.
- Bump `@version` when changing a theme or script.

## Checks

With Node.js and [just](https://just.systems/) installed, run:

```sh
just check
```

This checks the Okta userscript's JavaScript syntax. Visual checks happen in the browser.
