# Setting Up Your AI Model — OpenRouter (Free)

*Your chat agent calls an AI model to answer. We use **OpenRouter's free tier**, so
building it costs **nothing**. You still create an **API key** — so the secrets
lesson is real — it's just a **free** one.*

> ⚠️ **OpenRouter changes its site now and then.** These steps were checked in
> **July 2026**. If a button has moved, the *idea* is the same — or ask Claude Code
> to help you find it.

---

## 1. Create a free OpenRouter account
- Go to **[openrouter.ai](https://openrouter.ai)** and sign up. **No card needed**
  to use the free models.

## 2. Create your API key
- Open the **Keys** page (**[openrouter.ai/keys](https://openrouter.ai/keys)**) →
  **Create Key** → give it a name.
- **Copy it now** and keep it safe — it's shown once. This is a **secret**.

## 3. Pick a free model
- Go to **[openrouter.ai/models](https://openrouter.ai/models)** and filter to
  **free** (price $0) — free models have an ID ending in **`:free`**.
- Copy the model **ID** (it looks like `provider/model-name:free`).
- Free models come and go, so pick a **current** one — your instructor will suggest
  a good default on the day.

## 4. Wire it into your app
OpenRouter is **OpenAI-compatible**, so this is one prompt to Claude Code:

```text
Wire my chat app to OpenRouter's free tier. Use their OpenAI-compatible API at https://openrouter.ai/api/v1, read the key from an OPENROUTER_API_KEY variable in a .env file, add .env to .gitignore, and use the free model "[paste your :free model id]". Answer using ONLY the context, and say so if it isn't there.
```

## 5. Mind the free limits
The free tier is generous enough to build on, but not unlimited:

- **~50 requests/day** and **~20/minute** per account. **Failed attempts count too.**
- Hit the wall? **Wait** for the reset, **switch** to another `:free` model, or add
  **$10 of credits** to raise the daily limit to **1,000**.
- Popular free models get busy at peak — keep a **second `:free` model ID** handy.

> **🔑 Free, but still a secret.** The key is tied to *your* account and limits.
> Never commit it: `.env` + `.gitignore`. When you deploy, put it in **Vercel's
> project settings**, not in the code.

---

## Quick troubleshooting

| Symptom | Try this |
|---|---|
| `401 / unauthorized` | Key missing or mistyped. Check `OPENROUTER_API_KEY` is in `.env` and the code reads it from the environment. |
| `429 / rate limited` | You hit the 50/day or 20/min cap (failed tries count). Wait for reset, switch `:free` model, or add $10 credits. |
| Empty or off-topic answers | The context may not be reaching the model. Ask Claude Code to *"show me exactly what context you send with each message."* |

*Sources (checked July 2026):* [OpenRouter models](https://openrouter.ai/models) ·
[API rate limits](https://openrouter.ai/docs/api/reference/limits) ·
[Quickstart](https://openrouter.ai/docs/quickstart).
