export default function SetupPage() {
  const modelSetupUrl =
    "https://github.com/alrobwilloliver/jungli/blob/main/projects/agentic-second-brain/skeleton/MODEL-SETUP.md";

  return (
    <article className="page">
      <header className="page-heading">
        <p className="eyebrow">Private setup</p>
        <h1>Connect your model locally</h1>
        <p className="lede">
          Your API key belongs in a private file on the computer or server
          running this app. Visitors should never be asked to enter a key in
          their browser.
        </p>
      </header>

      <section aria-labelledby="setup-steps">
        <h2 id="setup-steps">Three small steps</h2>
        <ol className="steps">
          <li>
            <h3>Make a local environment file</h3>
            <p>
              For local development, copy <code>.env.example</code> to{" "}
              <code>.env.local</code>. The local file is ignored by Git, so it
              will not be committed.
            </p>
          </li>
          <li>
            <h3>Add your private key</h3>
            <p>
              Set <code>OPENROUTER_API_KEY</code> in <code>.env.local</code>. Do
              not paste the key into source code, chat messages, screenshots, or
              browser forms.
            </p>
          </li>
          <li>
            <h3>Choose the server-side models</h3>
            <p>
              Keep the example values or change <code>OPENROUTER_MODEL</code>{" "}
              and <code>OPENROUTER_FALLBACK_MODEL</code> in the same private
              file. Restart the development server after making a change.
            </p>
          </li>
        </ol>
      </section>

      <section className="notice" aria-labelledby="deploy-setup">
        <h2 id="deploy-setup">Deploying to Vercel</h2>
        <p>
          Add the same three values in Project Settings → Environment Variables,
          then redeploy the app. Keep the key private and never collect it from
          visitors in the browser.
        </p>
      </section>

      <aside className="notice" aria-labelledby="why-private">
        <h2 id="why-private">Why the key stays private</h2>
        <p>
          A browser is public territory: visitors can inspect what it sends and
          receives. This app will use the key only in server-side code, where it
          can call the model without exposing your credential.
        </p>
      </aside>

      {modelSetupUrl.startsWith("https://") && (
        <p className="setup-reference">
          Need provider-specific help? Read the repository&apos;s{" "}
          <a href={modelSetupUrl}>MODEL-SETUP.md guide</a>.
        </p>
      )}
    </article>
  );
}
