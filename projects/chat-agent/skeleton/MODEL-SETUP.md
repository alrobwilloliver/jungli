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

## 3. Use the free router
Set the app's model to exactly:

```text
openrouter/free
```

You do not need to choose a particular model. For each request, OpenRouter selects
one of the free models currently available. The API response includes the actual
model used. Answers may vary a little in style because a different model can answer
the next request — that is fine for this build, where each user message is one
independent model call.

## 4. Wire it into your app
OpenRouter is **OpenAI-compatible**, so this is one prompt to Claude Code:

```text
Wire my chat app to OpenRouter's free tier. Use their OpenAI-compatible API at https://openrouter.ai/api/v1, read the key from an OPENROUTER_API_KEY variable in a .env file, add .env to .gitignore, and set the model to exactly "openrouter/free". Answer using ONLY the context, and say so if it isn't there.
```

## 5. Mind the free limits
The free tier is generous enough to build on, but not unlimited:

- **~50 requests/day** and **~20/minute** per account. **Failed attempts count too.**
- Hit the wall? **Wait** for the reset or add **$10 of credits** to raise the daily
  limit to **1,000**.
- Free-model availability changes. `openrouter/free` handles that choice for you.

> **🔑 Free, but still a secret.** The key is tied to *your* account and limits.
> Never commit it: `.env` + `.gitignore`. When you deploy, put it in **Vercel's
> project settings**, not in the code.

---

## Quick troubleshooting

| Symptom | Try this |
|---|---|
| `401 / unauthorized` | Key missing or mistyped. Check `OPENROUTER_API_KEY` is in `.env` and the code reads it from the environment. |
| `429 / rate limited` | You hit the 50/day or 20/min cap (failed tries count). Wait for reset or add $10 credits. |
| Empty or off-topic answers | The context may not be reaching the model. Ask Claude Code to *"show me exactly what context you send with each message."* |

*Sources (checked July 2026):* [Free Models Router](https://openrouter.ai/docs/guides/routing/routers/free-router) ·
[API rate limits](https://openrouter.ai/docs/api/reference/limits) ·
[Quickstart](https://openrouter.ai/docs/quickstart).
