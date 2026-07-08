# Prompts

## 0. Start your own copy — do this first

> **Don't build inside the course folder.** The `jungli` repo you cloned is a
> read-only textbook: you can't push to it, and you don't want to. Your work
> lives in its own folder that *you* own and will deploy.

Paste this into the Code tab to spin up your own project:

```text
Make a new folder called "my-landing-page" in my home directory — NOT inside the
jungli course folder. Copy the starter files from the email-landing-page skeleton
in the course repo into it. Then initialise a fresh git repo there and make a
first commit ("Start my landing page"). Confirm we're now working in
my-landing-page, not in the course repo.
```

You'll push this to your *own* new GitHub repo and deploy it on Day 1 (lesson 1.3).
It stays yours.

## 1. Intake Questions

Use these first to define the page:

- Who is this for?
- What is the offer?
- What result does the offer create?
- What is the primary CTA?
- Why should someone trust this person or brand?
- What tone should the page have?
- What visual style should it have?
- What should happen after signup?

Reduce the answers into this sentence:

`I help [audience] get [result] through [offer].`

**Worked example — Andrea (the Day-1 demo):**

> I help people stuck in a 9-to-5 get the freedom to live and work from
> anywhere through a step-by-step digital nomad coaching program.

See the finished page live: <https://email-capture-demo-live.vercel.app>

## 2. First Build Prompt

```text
Build a responsive one-page landing site for this offer.

Audience: [audience]
Offer: [offer]
Outcome: [result]
Primary CTA: [join list / get guide / join waitlist / book call]
Tone: [3 adjectives]
Style: [visual direction]
Proof: [bio / results / credibility]
Sections: hero, problem, offer, benefits, about, FAQ, signup, footer
Technical constraints: plain HTML/CSS/JS, mobile-first, simple to deploy
Important: leave a clear placeholder for a Kit embedded form
Output: ready-to-deploy files
```

## 3. Refinement Prompts

```text
Tighten the copy, make the CTA clearer, and simplify the layout.
```

```text
Improve the page so it feels more credible and specific without adding unnecessary sections.
```

```text
Make the design feel more polished while keeping the code simple and the layout easy to scan on mobile.
```

## 4. Kit Integration Prompt

**New to Kit?** Follow [`KIT-SETUP.md`](KIT-SETUP.md) first — it's the click-by-click
for creating your form and copying the embed code (no API key needed on Day 1).

Once you have real Kit embed code:

```text
Integrate this Kit form embed into the signup section cleanly. Keep the surrounding layout simple, preserve responsiveness, and make the signup area feel native to the page design.
```

## 5. Git Steps During The Build

Use a simple commit rhythm:

1. `git status`
2. `git add .`
3. `git commit -m "Generate initial landing page"`
4. refine the site
5. `git add .`
6. `git commit -m "Refine copy and layout"`
7. integrate Kit
8. `git add .`
9. `git commit -m "Add Kit email signup flow"`

## 6. Deployment Reminder

Before deploying, check:

- the CTA is clear
- the signup section is visible
- mobile layout is solid
- form success behavior is understood
- all links and buttons make sense
