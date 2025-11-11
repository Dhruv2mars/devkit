"use client";

import React from "react";

type ToolCardProps = {
  title: string;
  children: React.ReactNode;
  description?: string;
};

export default function ToolCard({ title, description, children }: ToolCardProps) {
  return (
    <section className="rounded-lg border border-gray-200 p-4">
      <header className="mb-2">
        <h3 className="m-0 text-lg">{title}</h3>
        {description ? <p className="m-0 mt-1 text-sm text-gray-600">{description}</p> : null}
      </header>
      <div className="space-y-2">{children}</div>
    </section>
  );
}
