import { FaUserEdit } from "react-icons/fa";

const ProfileCard = () => {
  return (
    <div className="w-[330px] bg-white rounded-xl shadow-md p-6 mt-0">
      {/* Profile Section */}
      <div className="flex flex-col items-center mb-4">
        {" "}
        <img
          src="/images/y-4.jpg"
          alt="Profile"
          className="w-24 h-24 rounded-full border-2 border-blue-400 mb-2"
        />
        <h2 className="text-xl font-bold">Username</h2>
        <button className="text-blue-500 hover:text-blue-700 mt-1">
          {" "}
          <FaUserEdit Edit className="inline mr-1" />
          Edit
        </button>
      </div>

      {/* Job Information Cards */}
      <div className="space-y-4">
        <div className="bg-gray-100 p-4 rounded-lg shadow">
          <h3 className="font-semibold">UI/UX Designer</h3>
          <p className="text-gray-600">Deskripsi singkat lowongan 1.</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow">
          <h3 className="font-semibold">Fullstack Developer</h3>
          <p className="text-gray-600">Deskripsi singkat lowongan 2.</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow">
          <h3 className="font-semibold">Backend Developer</h3>
          <p className="text-gray-600">Deskripsi singkat lowongan 3.</p>
        </div>
      </div>
      <div className="mt-4">
        <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
          Lihat Semua
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;