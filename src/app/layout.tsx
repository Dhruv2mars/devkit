export const metadata = {
  title: "DevKit",
  description: "A suite of developer utilities"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial' }}>
        <header style={{ padding: '1rem', borderBottom: '1px solid #eee' }}>
          <h1 style={{ margin: 0 }}>DevKit</h1>
        </header>
        <main style={{ padding: '1rem', maxWidth: 960, margin: '0 auto' }}>{children}</main>
      </body>
    </html>
  );
}

