# zenburn-themes agent instructions

Themes live in `themes/<name>`. In this dir, the minimal contents are:

- `screenshot.png`: if missing, ask the user to create one
- `theme.css`: the stylesheet (Stylus-compatible)
- `README.md`: bare minimum is a title, URL (pattern), and the screenshot displayed. Only if there is something special or interesting about the theme, e.g. limited support or important design tradeoffs, document more. Keep it minimal.

If more files are needed, e.g. JavaScript, add them following existing conventions.

After updating a theme, instruct the user to run `cat themes/<name>/theme.css|pbcopy`, paste it into Stylus, and try it.

Screenshots should also be displayed in `GALLERY.md`; keep the headings alphabetically ordered.

In `README.md`, add the template to the table, again alphabetically ordered.
The first column should be a link to the image in `GALLERY.md` (link to the anchor).
