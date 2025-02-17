"use client";
export default function Card({ title, description }) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-5">
      <h2 className="text-lg font-bold">{title}</h2>
      <p className="text-gray-600">{description}</p>
      <button className="mt-3 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700">
        Detail
      </button>
    </div>
  );
}
