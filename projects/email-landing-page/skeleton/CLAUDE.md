# CLAUDE.md

This repository is a minimal starter for creating a one-page email-capture site with Claude Code.

## Core Expectations

- Use plain HTML, CSS, and JavaScript by default.
- Do not add frameworks, package managers, or build tools unless explicitly requested.
- Keep the site mobile-first and easy to deploy as static files.
- Optimize for clarity: one audience, one offer, one primary CTA.
- If JavaScript is not needed, do not create `script.js`.

## Build Priorities

When generating the site, prioritize:

1. Clear offer positioning
2. Strong headline and CTA
3. Simple, readable structure
4. Credibility and proof
5. A real email signup flow using Kit

## Inputs To Clarify Before Building

If the user has not provided these, ask for the minimum needed:

- target audience
- offer
- promised outcome
- primary CTA
- proof or credibility
- tone
- visual style
- what happens after signup

## Output Constraints

- Keep files small and understandable.
- Prefer `index.html`, `styles.css`, and optional `script.js`.
- Avoid unnecessary animation and complexity.
- Use semantic HTML.
- Make the signup area obvious and easy to test.

## Kit Integration

- Prefer leaving a clean placeholder for the Kit form until real embed code is available.
- Do not invent third-party embed code.
- If embed code is provided, integrate it cleanly and keep surrounding markup minimal.
