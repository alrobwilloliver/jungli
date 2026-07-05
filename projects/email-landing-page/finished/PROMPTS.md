# Prompts

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
