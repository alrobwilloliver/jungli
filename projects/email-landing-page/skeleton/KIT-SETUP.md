# Setting Up Kit — Your Email Signup

*The click-by-click for the email part of your landing page. Kit (formerly
ConvertKit) is a mailing-list tool with a **free plan** — you'll use it to collect
signups. Two ways to connect it; **Part A is all you need for Day 1.***

> ⚠️ **Kit changes its dashboard now and then.** These steps were checked in
> **July 2026**. If a button has moved, the *idea* is the same — look for the
> nearest equivalent, or ask Claude Code to help you find it.

---

## Part A — The embed (Day 1 · no API key)

This is the simplest path: Kit gives you **one line of JavaScript**, you hand it to
Claude Code, and the signup form appears on your page. **No API key, no secrets.**

### 1. Create a free Kit account
- Go to **[kit.com](https://kit.com)** and sign up.
- Finish the onboarding — when it asks what you do, any answer is fine ("Creator"
  works). You do **not** need a paid plan.

### 2. Create a form
- In Kit, open the **Grow** tab → **Landing Pages & Forms**.
- Click **+ Create new** → choose **Form**.
- Pick any style and tweak the wording if you like. Don't overthink the look —
  Claude Code will fit it into your page.
- **Save** the form.

### 3. Copy the embed code
- In the form builder, click **Embed** (top right).
- Choose the **JavaScript** tab (Kit's *recommended* embed — it updates
  automatically if you change the form later).
- Click **Copy**. You now have a snippet that looks like this:

```html
<script async data-uid="abc12345de" src="https://your-account.kit.com/abc12345de/index.js"></script>
```

> That `abc12345de` code is your **Form ID** — it's in both the `data-uid` and the
> URL. You don't need to note it separately for the embed; it's baked into the snippet.

### 4. Hand it to Claude Code
Back in your project, use the Kit prompt from
[`PROMPTS.md`](PROMPTS.md) and paste your real snippet in place of the example:

```text
Integrate this Kit form embed into the signup section cleanly, keeping the
layout simple and responsive: [paste your <script> snippet here].
```

### 5. Test it
- Preview your page and **submit a real email** in the signup box.
- In Kit, open **Grow → Subscribers** — your test email should appear.
- If it's there, you're done. 🎉 Emails now flow straight into Kit.

---

## Part B — The API method (level up · Build 3)

**You don't need this for Day 1.** Come back to it in **Build 3 (chat agent)**, where
API keys are properly taught. It's here so the whole picture lives in one place.

**Why you'd use it:** the embed drops in Kit's own form styling. The **API** method
lets *your* code own the form completely — custom design, your own success message,
signups posted directly to Kit. The trade-off is that it needs a **secret key**, so
it's a bigger step.

### Get a Kit API key (v4)
- In Kit: **Account Settings → Developer Settings**.
- Create a **v4 API key**. **Copy it immediately** — Kit won't show it again.
- Requests use the base URL `https://api.kit.com/v4` with your key in an
  **`X-Kit-Api-Key`** header. Full docs: **[developers.kit.com](https://developers.kit.com)**.

> 🔑 **This key is a secret.** Unlike the embed, an API key can read and change your
> account. **Never commit it.** Put it in a `.env` file and add `.env` to
> `.gitignore` — exactly the habit you'll learn in Build 3. Using it inside a Claude
> Code chat is fine; that stays on your machine.

*(You may see older guides use `api.convertkit.com/v3` with an "API Key / API
Secret" — that's Kit's **legacy** API. New work should use v4 above.)*

---

## Quick troubleshooting

| Symptom | Try this |
|---|---|
| Form doesn't appear | Make sure the whole `<script …></script>` line is present and the page was saved/reloaded. Ask Claude Code: *"the Kit form isn't showing — check the embed is placed correctly."* |
| Test email not in Subscribers | Wait a moment and refresh **Grow → Subscribers**. Check you submitted on the *live/preview* page, not the raw file. |
| Want to change the form later | Edit it in Kit and save — the JavaScript embed updates on your page automatically. No code change needed. |
