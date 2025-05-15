import { useState } from "react";

export default function JobForm({
  form,
  setForm,
  onSubmit,
  loading,
  isEditing,
}) {
  const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
  const [isImageValid, setIsImageValid] = useState(true);

  const handleInput = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      const file = files ? files[0] : null;

      if (file && file.size > MAX_FILE_SIZE) {
        alert("Ukuran gambar terlalu besar. Maksimal 2MB.");
        setIsImageValid(false);
        setForm({ ...form, [name]: null });
        e.target.value = null;
        return;
      }

      setIsImageValid(true);
      setForm({ ...form, [name]: file });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-4 mb-4 max-w-4xl w-full mx-auto bg-gray-50 p-4 rounded-xl shadow"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          name="title"
          value={form.title}
          onChange={handleInput}
          placeholder="Job Title"
          required
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          name="salary"
          type="number"
          value={form.salary}
          onChange={handleInput}
          placeholder="Salary"
          required
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          name="category"
          value={form.category}
          onChange={handleInput}
          placeholder="Category"
          required
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          name="location"
          value={form.location}
          onChange={handleInput}
          placeholder="Location"
          required
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          name="type"
          value={form.type}
          onChange={handleInput}
          placeholder="Type (e.g. Full-time)"
          required
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          name="experience_level"
          value={form.experience_level}
          onChange={handleInput}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Junior">Junior</option>
          <option value="Middle">Middle</option>
          <option value="Senior">Senior</option>
        </select>
      </div>

      <textarea
        name="description"
        value={form.description}
        onChange={handleInput}
        placeholder="Description"
        required
        rows={3}
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        name="skills"
        value={form.skills}
        onChange={handleInput}
        placeholder="Skills (e.g. React, Node.js)"
        required
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={handleInput}
        className={`w-full p-2 border ${
          isImageValid ? "border-gray-300" : "border-red-500"
        } rounded-lg bg-white`}
      />
      {!isImageValid && (
        <p className="text-red-600 text-sm">
          Ukuran gambar maksimal 2MB. Silakan pilih ulang.
        </p>
      )}

      <button
        type="submit"
        disabled={loading || !isImageValid}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
      >
        {loading ? "Saving..." : isEditing ? "Update Job" : "Add Job"}
      </button>
    </form>
  );
}
