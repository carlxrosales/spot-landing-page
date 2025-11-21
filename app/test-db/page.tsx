"use client";

import { useState } from "react";

export default function TestDB() {
  const [result, setResult] = useState<any>(null);

  return (
    <div className="min-h-screen bg-neon-green p-8">
      <div className="max-w-4xl mx-auto bg-white/90 rounded-3xl p-8 shadow-lg">
        <h1 className="text-3xl font-bold mb-6">Database Test</h1>

        <div className="space-y-4">
          <p className="text-lg text-gray-700">
            Supabase has been removed from this project. City data is now static and configured in the codebase.
          </p>
        </div>
      </div>
    </div>
  );
}

