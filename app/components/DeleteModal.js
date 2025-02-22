import React from "react";

const ConfirmDeleteModal = ({ isVisible, onConfirm, onCancel }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h3 className="text-xl font-semibold text-gray-800">Konfirmasi Hapus</h3>
        <p className="mt-2 text-gray-600">Apakah Anda yakin ingin menghapus pekerjaan ini?</p>
        <div className="flex justify-end mt-4">
        <button
            onClick={onConfirm}
            className="bg-red-500 text-white px-4 py-2 mr-2 rounded-lg hover:bg-red-600"
          >
            Hapus
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-400 px-4 py-2 rounded-lg hover:bg-gray-500"
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
