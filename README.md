# HcmDZ — portfolio site

Static portfolio for the `Hcmdz` GitHub account, one page per Android app.
Plain HTML, one stylesheet, one script. No build step, no framework, no
dependency to install.

Live at <https://hcmdz.github.io/>. Served by GitHub Pages from `main`, in
legacy mode — whatever is committed is what gets published.

## Layout

```
index.html              home, one card per app
elecpilot/              ElecPilot page + privacy/ + terms/
opencode-free-radar/    OpenCode Free Radar page + privacy/ + terms/
Privnum/                Privnum page + privacy/ + terms/
assets/                 style.css, site.js, favicon, shared images
404.html                not-found page
sitemap.xml             every public URL
robots.txt              points at the sitemap
llms.txt                machine-readable index of the apps
```

Each app directory is self-contained: its own `index.html`, logo, OG image,
screenshots and legal pages. Screenshots ship as a `<picture>` pair — a WebP
source with a PNG or JPEG fallback.

## Apps

Source and releases live in each project's own repository:

- **ElecPilot** — <https://github.com/Hcmdz/ElecPilot>
- **OpenCode Free Radar** — <https://github.com/Hcmdz/OpenCode-Free-Radar>
- **Privnum** — <https://github.com/Hcmdz/Privnum>

## Workflows

| Workflow | Trigger | What it does |
|---|---|---|
| `validate` | push to `main`, any PR | Secret-value scan, sensitive-filename check, HTML sanity, allowlist liveness. Required check on `main`. |
| `sync-versions` | nightly 05:00 UTC | Reads each app's latest release tag, updates the version pill, opens a PR on `sync/version-pills`. |

`sync-versions` force-pushes its own scratch branch and merges via auto-merge,
so `validate` needs to pass on that PR before it lands. If the run sits at
"action required", the run needs a maintainer to approve it, or the branch has
to be updated from `main` by hand.

Secret-scan false positives go in `.github/secret-allowlist.txt`, one exact
fixed string per line, with a `NEED` comment above it. It is empty on purpose.

## Adding an app page

1. Create `<slug>/index.html` and copy the structure of an existing one — the
   `<head>` blocks (description, canonical, Open Graph, `theme-color` for both
   schemes) are the part that is easy to miss.
2. Drop the app in `SITE_APPS` at the top of `assets/site.js`. The shared nav
   is generated from that array; the static HTML stays the no-JS fallback.
3. Add the new URL to `sitemap.xml`, and the app to `llms.txt`.
4. Add the version pill to the `MAP` in `.github/workflows/sync-versions.yml`
   if it should track releases automatically.

## License

MIT, see [LICENSE](LICENSE). The Android apps themselves are licensed
separately in their own repositories.