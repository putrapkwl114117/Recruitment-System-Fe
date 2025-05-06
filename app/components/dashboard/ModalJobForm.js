export default function ModalJobForm({ closeModal }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-xl shadow-xl">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Form Tambah Lowongan
        </h3>
        {/* Form input (buat lebih lengkap sesuai kebutuhan) */}
        <form>
          <div className="mb-3">
            <label className="block text-sm font-medium">Judul Pekerjaan</label>
            <input type="text" className="w-full p-2 border rounded" />
          </div>
          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={closeModal}
              className="mr-2 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
