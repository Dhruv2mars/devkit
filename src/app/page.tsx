import Link from "next/link";

const tools = [
  { href: "/tools/json", title: "JSON Formatter", desc: "Pretty, minify, and validate JSON" },
  { href: "/tools/base64", title: "Base64 Encoder/Decoder", desc: "Unicode-safe base64" },
  { href: "/tools/color", title: "Color Converter", desc: "HEX ↔ RGB" },
  { href: "/tools/markdown", title: "Markdown Renderer", desc: "MD → sanitized HTML" },
  { href: "/tools/url", title: "URL Utils", desc: "Parse and edit query params" },
  { href: "/tools/cron", title: "Cron Helper", desc: "Humanize + next runs" }
];

export default function HomePage() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl">Tools</h2>
      <ul className="grid gap-3 list-none p-0">
        {tools.map((t) => (
          <li key={t.href} className="rounded-lg border border-gray-200">
            <Link href={t.href} className="block p-3 no-underline">
              <div className="text-lg font-semibold">{t.title}</div>
              <div className="text-gray-600">{t.desc}</div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
