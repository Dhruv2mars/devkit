import "./globals.css";

export const metadata = {
  title: "devkitlibrary",
  description: "A suite of developer utilities"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <header className="border-b border-gray-200">
          <div className="mx-auto max-w-5xl px-4 py-4">
            <h1 className="m-0 text-2xl">devkitlibrary</h1>
          </div>
        </header>
        <main className="mx-auto max-w-5xl px-4 py-6">{children}</main>
      </body>
    </html>
  );
}
