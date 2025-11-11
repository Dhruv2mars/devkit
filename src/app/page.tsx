import Link from "next/link";

const tools = [
  { href: "/tools/json", title: "JSON Formatter", desc: "Pretty, minify, and validate JSON" },
  { href: "/tools/base64", title: "Base64 Encoder/Decoder", desc: "Unicode-safe base64" },
  { href: "/tools/color", title: "Color Converter", desc: "HEX ↔ RGB" }
];

export default function HomePage() {
  return (
    <div>
      <h2>Tools</h2>
      <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '12px' }}>
        {tools.map((t) => (
          <li key={t.href} style={{ border: '1px solid #eee', borderRadius: 8, padding: 12 }}>
            <Link href={t.href} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{ fontSize: 18, fontWeight: 600 }}>{t.title}</div>
              <div style={{ color: '#666' }}>{t.desc}</div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

