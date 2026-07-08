# Which Claude Plan Do I Need?

*The single most important thing to sort before the residency. Read this once;
it's short.*

> **Prices and limits below were checked against Anthropic's official pages in
> June 2026.** Anthropic changes these from time to time — always confirm the
> live price at <https://claude.com/pricing> before you pay.

---

## The one thing you must know

> ⚠️ **The free Claude plan does NOT include Claude Code** — the coding features in
> the Claude app's **Code tab** that we build with every day. To take part in the
> AI & Agents track you need a **paid** plan — **Pro at minimum.**

There is no free version of Claude Code, and **sharing one login between several
people breaks Anthropic's terms** (and the limits are per-account anyway, so it
wouldn't work). The good news: the cheapest paid plan is enough for most people,
and there are ways to keep costs down — below.

## The plans (June 2026)

| Plan | Price (USD) | Claude Code? | Good for |
|---|---|---|---|
| **Free** | $0 | ❌ No | Not usable for this track |
| **Pro** | **$20/mo** (or $17/mo billed annually) | ✅ Yes | **What most participants should get** |
| **Max 5×** | from $100/mo | ✅ Yes, 5× Pro's usage | Heavy all-day builders; the instructor |
| **Max 20×** | ~$200/mo | ✅ Yes, 20× Pro's usage | Power users (overkill for most) |

> **Pro is the recommended choice for participants.** You can subscribe for the
> **one month** that covers the residency and cancel afterwards if you like —
> so the real cost of attending is about **$20 (~₹1,700)**.

## "Will I run out mid-build?" — how usage actually works

- Your usage is **shared** between Claude.ai (the chat) and Claude Code — it's
  one pool, not two.
- Limits work on a rolling basis: a **5-hour session window** (resets every 5
  hours) plus an overall **weekly cap** across all models. Anthropic
  [states this on the Pro plan page](https://support.claude.com/en/articles/8325606-what-is-the-pro-plan)
  but **doesn't publish exact hour/message numbers** — they vary by model, message
  length and file size, so treat the points below as practical guidance, not a
  contract. Check *your* live usage in **Settings → Usage** (chat) or **`/status`**
  (Claude Code).
- On a relaxed day, **Pro is fine.** On a heavy, build-all-day-and-evening day,
  a Pro user *can* bump into the limit late in the day.

**If you hit a limit, you have options (no panic):**
1. **Wait for the reset** — session limits free up in a few hours.
2. **Enable usage credits / pay-as-you-go** on your account to keep going past
   the included amount (you only pay for the extra you use).
3. **Upgrade to Max 5×** for that month if you know you'll build hard.

**Habits that make Pro last (we'll teach these on Day 2):**
- **Pick the right model:** use a lighter model (Haiku/Sonnet) for simple, repetitive
  work and save the heavy model (Opus) for genuinely hard problems — the big model
  uses your limit faster.
- **Start a fresh session for a new task** (`/clear`) instead of one endless chat —
  it keeps the context small, the answers sharper, and the usage lower.
- Don't leave Claude running idle on a big task you're not watching.
- Give clear, specific instructions so it gets it right first time instead of
  three tries.
- Work in small steps and commit often, so you're never redoing lost work.

## What we recommend

- **Most participants:** get **Pro** ($20) for the residency month. ✅
- **No extra AI cost for Build 3:** the chat agent uses a **free OpenRouter model**,
  so there's no paid model API key to buy — see
  [`../projects/chat-agent/skeleton/MODEL-SETUP.md`](../projects/chat-agent/skeleton/MODEL-SETUP.md).
- **If you already know you build intensely** (or you're doing back-to-back
  projects): consider **Max 5×** for the month, or start on Pro and enable
  usage credits as a safety net.
- **The instructor runs Max** so demos and helping never hit a wall.

---

## For the instructor (Alan) — helping price-sensitive participants

The survey's #1 blocker was **price**, and 21/37 flagged it. You can't hand out
"free Claude Code," but here are the **legitimate** ways to lower the barrier:

1. **Run a Team plan and provision seats for the week.** A Team admin can **add
   seats mid-term** ($25/seat-month standard; premium seats $100+ include more
   Claude Code headroom). You'd control billing centrally and can remove seats
   after the residency. Cleanest way to "sponsor" someone who can't justify their
   own subscription. See <https://support.claude.com/en/articles/9266767>.
2. **Console / API pay-as-you-go keys.** Create API keys via the Anthropic
   Console, set a spend cap per key, and let a participant point Claude Code at
   your key for the week. You pay only for tokens used, and you can cap/revoke
   per person. Best for a small number of people and full cost control.
3. **Bundle "1 month of Pro" into the ticket price.** Simplest for participants:
   the program fee includes the expectation that they grab Pro for the month
   (~$20), and you keep a small pool of Team seats / API keys as backup for
   anyone who truly can't.
4. **Set expectations up front** so nobody is surprised at the door: "You'll need
   ~$20 of Claude Pro for the month; we have a few backup seats if that's a
   genuine blocker."

> ⚠️ **Don't** share a single Claude login across people — it's against ToS and
> the per-account limits make it impractical anyway. Team seats and API keys are
> the sanctioned routes.

**Open question for you to decide before pricing the program:** are you absorbing
Claude access into the ticket price (Team seats), asking participants to buy
their own Pro, or a hybrid (Pro by default + a small backup pool)? This affects
both your costs and the price you advertise.

---

### Sources (verified June 2026 · usage limits re-confirmed July 2026)
- [Claude pricing](https://claude.com/pricing)
- [What is the Pro plan?](https://support.claude.com/en/articles/8325606-what-is-the-pro-plan) — states the 5-hour session reset + weekly cap
- [How usage and length limits work](https://support.claude.com/en/articles/11647753-how-do-usage-and-length-limits-work)
- [Use Claude Code with your Pro or Max plan](https://support.claude.com/en/articles/11145838-use-claude-code-with-your-pro-or-max-plan)
- [Models, usage, and limits in Claude Code](https://support.claude.com/en/articles/14552983-models-usage-and-limits-in-claude-code)
- [What is the Team plan?](https://support.claude.com/en/articles/9266767-what-is-the-team-plan)
- [Claude Code setup / system requirements](https://code.claude.com/docs/en/setup)
