# Model setup

Use Node 22.13+ and copy `.env.example` to `.env.local`. Set
`OPENROUTER_API_KEY`. For Sam's vault, `openrouter/free` or the example model is
acceptable; run the dry compatibility checker in `finished` before class.

For personal notes, first verify OpenRouter's current privacy policy and the
chosen upstream provider's policy. Pin a non-router model and one provider:

```dotenv
VAULT_DIRECTORY=vault-personal
OPENROUTER_MODEL=vendor/fixed-model
OPENROUTER_PROVIDER=provider-slug
OPENROUTER_FALLBACK_MODEL=
PERSONAL_VAULT_POLICY_ACCEPTED=true
```

Personal mode is rejected outside local development and every request disables
fallbacks and data collection and requests ZDR. This technical gate does not
replace informed consent.
