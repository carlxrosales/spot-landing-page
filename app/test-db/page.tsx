"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function TestDB() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [tableName, setTableName] = useState("places");
  const [columnName, setColumnName] = useState("address");
  const [testCity, setTestCity] = useState("Manila");

  const testConnection = async () => {
    if (!supabase) {
      setResult({ error: "Supabase not configured" });
      return;
    }

    setLoading(true);
    try {
      // Test 1: Get sample data
      const { data, error } = await supabase
        .from(tableName)
        .select("*")
        .limit(5);

      if (error) {
        setResult({
          error: error.message,
          details: error.details,
          hint: error.hint,
        });
      } else {
        setResult({
          success: true,
          sampleData: data,
          totalFetched: data?.length || 0,
          tableName,
          columnName,
        });
      }
    } catch (err: any) {
      setResult({ error: err.message });
    } finally {
      setLoading(false);
    }
  };

  const testCityCount = async () => {
    if (!supabase) {
      setResult({ error: "Supabase not configured" });
      return;
    }

    setLoading(true);
    try {
      // Get all data and count
      const { data, error } = await supabase
        .from(tableName)
        .select(columnName);

      if (error) {
        setResult({
          error: error.message,
          details: error.details,
          hint: error.hint,
        });
      } else {
        // Count places in the test city by checking if address contains city name
        const count = data?.filter((place: any) => {
          const address = (place[columnName] || "").toLowerCase();
          return address.includes(testCity.toLowerCase());
        }).length || 0;

        // Get unique city values
        const uniqueCities = [
          ...new Set(data?.map((p: any) => p[columnName]).filter(Boolean)),
        ];

        setResult({
          success: true,
          testCity,
          count,
          totalPlaces: data?.length || 0,
          uniqueCities: uniqueCities.slice(0, 20), // Show first 20 unique cities
          sampleData: data?.slice(0, 5),
        });
      }
    } catch (err: any) {
      setResult({ error: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neon-green p-8">
      <div className="max-w-4xl mx-auto bg-white/90 rounded-3xl p-8 shadow-lg">
        <h1 className="text-3xl font-bold mb-6">Supabase Database Test</h1>

        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Table Name:
            </label>
            <input
              type="text"
              value={tableName}
              onChange={(e) => setTableName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="places"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Address Column Name:
            </label>
            <input
              type="text"
              value={columnName}
              onChange={(e) => setColumnName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="address"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Test City Name:
            </label>
            <input
              type="text"
              value={testCity}
              onChange={(e) => setTestCity(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Manila"
            />
          </div>
        </div>

        <div className="flex gap-4 mb-6">
          <button
            onClick={testConnection}
            disabled={loading}
            className="bg-black text-white px-6 py-2 rounded-lg hover:bg-neon-green hover:text-black transition-colors disabled:opacity-50"
          >
            {loading ? "Loading..." : "Test Connection"}
          </button>
          <button
            onClick={testCityCount}
            disabled={loading}
            className="bg-neon-green text-black px-6 py-2 rounded-lg hover:bg-black hover:text-white transition-colors disabled:opacity-50"
          >
            {loading ? "Loading..." : `Count Places in ${testCity}`}
          </button>
        </div>

        {result && (
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-4">Result:</h2>
            <pre className="bg-gray-100 p-4 rounded-lg overflow-auto max-h-96 text-sm">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

