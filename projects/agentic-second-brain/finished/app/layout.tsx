import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Agentic Second Brain",
  description: "A private, document-grounded assistant built at Jungli.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <div className="shell">
            <p className="eyebrow">Jungli AI &amp; Agents</p>
            <p className="wordmark">Agentic Second Brain</p>
          </div>
        </header>

        <main className="shell">{children}</main>

        <footer className="site-footer">
          <div className="shell">
            <p>
              Your note files stay in your project, but note contents are sent
              to OpenRouter when you chat. Your key stays on the server.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
