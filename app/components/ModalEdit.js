import { useState } from "react";

const JobEditModal = ({ closeModal, job, updateJob, token }) => {
  const [editedJob, setEditedJob] = useState({ ...job });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedJob((prevJob) => ({
      ...prevJob,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateJob(job.id, editedJob, token).then(() => {
      closeModal();
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-3/4 md:w-1/2">
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-blue-500">
              Edit Lowongan
            </h2>
          </div>
          <div className="my-4">
            <label className="block text-gray-700">Judul Pekerjaan</label>
            <input
              type="text"
              name="title"
              value={editedJob.title}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="my-4">
            <label className="block text-gray-700">Deskripsi</label>
            <textarea
              name="description"
              value={editedJob.description}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="my-4">
            <label className="block text-gray-700">Gaji</label>
            <input
              type="text"
              name="salary"
              value={editedJob.salary}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="my-4">
            <label className="block text-gray-700">Lokasi</label>
            <input
              type="text"
              name="location"
              value={editedJob.location}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-700"
            >
              Simpan Perubahan
            </button>
            <button
              type="button"
              onClick={closeModal}
              className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-700 ml-2"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobEditModal;
