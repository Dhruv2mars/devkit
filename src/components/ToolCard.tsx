"use client";

import React from "react";

type ToolCardProps = {
  title: string;
  children: React.ReactNode;
  description?: string;
};

export default function ToolCard({ title, description, children }: ToolCardProps) {
  return (
    <section style={{ border: '1px solid #e5e7eb', borderRadius: 8, padding: 16 }}>
      <header style={{ marginBottom: 8 }}>
        <h3 style={{ margin: 0 }}>{title}</h3>
        {description ? <p style={{ margin: '4px 0', color: '#6b7280' }}>{description}</p> : null}
      </header>
      <div>{children}</div>
    </section>
  );
}

