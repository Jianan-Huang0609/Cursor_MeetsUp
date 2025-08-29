import React from 'react';

type Props = { title?: string; children: React.ReactNode };

export function CardShell({ title, children }: Props) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
      {title && (
        <div className="border-b border-gray-100 px-6 py-4 text-lg font-semibold">
          {title}
        </div>
      )}
      <div className="px-6 py-4">
        {children}
      </div>
    </div>
  );
}
