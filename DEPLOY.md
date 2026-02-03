# Deploy Valentine Site to the Web

## Preflight (done)

- **assets/egg.jpg** exists.
- **Paths are relative**: `styles.css`, `main.js`, `assets/egg.jpg` (no leading `/`).
- **Local smoke test**: From `Valentines/site` run `npx serve .` then open http://localhost:3000 (or the port shown). Check that the page loads, the hero image appears, and the browser console has no errors.

---

## Commands to run

Run these from **Valentines/site** (repo is already initialized there with one commit on `main`).

```bash
cd /Users/tylerwang/Desktop/Valentines/site
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/valentines-site.git
git push -u origin main
```

If `origin` already exists and you want to replace it:

```bash
git remote remove origin
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/valentines-site.git
git push -u origin main
```

Replace `YOUR_GITHUB_USERNAME` with your GitHub username.

---

## GitHub UI clicks (create repo + enable Pages)

1. **Create the repo**
   - Go to https://github.com/new
   - Repository name: `valentines-site` (or any name you prefer)
   - Do **not** add a README, .gitignore, or license (you already have content)
   - Click **Create repository**

2. **Connect and push** (if you haven’t already)
   - Copy the repo URL (e.g. `https://github.com/YOUR_USERNAME/valentines-site.git`)
   - In the “Commands to run” section above, use that URL as `origin` and run the `git push` command

3. **Turn on GitHub Pages**
   - In the repo: **Settings** → **Pages**
   - Under **Build and deployment** → **Source**: choose **Deploy from a branch**
   - **Branch**: `main` (or `master` if you kept it)
   - **Folder**: `/(root)`
   - Click **Save**

4. **Get your URL**
   - After a minute or two, the site will be at:
   - **https://YOUR_GITHUB_USERNAME.github.io/valentines-site/**
   - (If you used a different repo name, use that instead of `valentines-site`.)

**Optional custom domain:** In **Settings** → **Pages** you can set a custom domain. GitHub will show DNS instructions; no code changes required for a basic static site.

---

## Netlify fallback (no Git)

1. **Zip the site**
   - Zip the **contents** of `Valentines/site` (so that `index.html` is at the root of the zip, not inside a `site` folder).
   - Or zip the whole `site` folder and in Netlify choose the root to be `site` when deploying.

2. **Deploy**
   - Go to https://app.netlify.com
   - **Add new site** → **Deploy manually**
   - Drag and drop the zip (or the `site` folder)
   - Netlify will show a URL like `https://random-name-123.netlify.app`

3. **Updates**
   - Any change requires a new drag-and-drop deploy (or connect the site to Git for automatic deploys).

---

## What you do next

1. Create a new GitHub repo named `valentines-site` (empty, no README).
2. In `Valentines/site`, add the remote and push:  
   `git remote add origin https://github.com/YOUR_USERNAME/valentines-site.git` then `git push -u origin main`.
3. In the repo go to **Settings** → **Pages** → Source: **Deploy from branch** → Branch: **main** → Folder: **/(root)** → Save.
4. Wait 1–2 minutes, then open **https://YOUR_USERNAME.github.io/valentines-site/**.
5. Optional: Share that URL or add a custom domain in Settings → Pages.

---

## Where your public URL will be

- **GitHub Pages:**  
  `https://<github-username>.github.io/<repo-name>/`  
  Example: `https://jane.github.io/valentines-site/`

- **Netlify (manual):**  
  `https://<random-subdomain>.netlify.app`  
  You can change the subdomain in Site settings → Domain management.

---

## Common pitfalls

- **Leading slash in paths:** Using `/assets/egg.jpg` or `/styles.css` can break on GitHub Pages (subpath). This site uses relative paths (`assets/egg.jpg`, `styles.css`, `main.js`).
- **Missing egg.jpg:** If the hero is blank, ensure `assets/egg.jpg` is in the repo and committed. Run `npm run convert` locally if needed, then commit and push again.
- **Caching:** After redeploy, do a hard refresh (Ctrl+Shift+R / Cmd+Shift+R) or use a private window to see changes.
- **HTTPS:** Both GitHub Pages and Netlify serve over HTTPS; the site works on phones and desktops without mixed-content issues.
- **iOS / autoplay:** The page does not rely on autoplay video/audio; canvas animations and interactions work on mobile Safari. If you add media later, note iOS often blocks autoplay with sound.
