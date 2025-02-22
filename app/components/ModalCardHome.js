import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faClock, faSackDollar } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link"; 

const Modal = ({ closeModal, job, type }) => {
  const checkLoginStatus = () => {
    const token = localStorage.getItem("token"); 
    return token;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-3/4 md:w-1/2">
        {type === "jobDetails" && job ? (
          <>
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-blue-500">
                {job.title}
              </h2>
              <span className="flex text-center text-gray-600 bg-gray-100 p-2 rounded-lg">
                {job.category}
              </span>
            </div>
            <div className="text-gray-500 text-sm flex items-center py-2">
              <span className="flex items-center">
                <FontAwesomeIcon icon={faClock} className="mr-2" />
                {job.type}
              </span>
              <span className="flex items-center ms-5">
                <FontAwesomeIcon icon={faSackDollar} className="mr-2" />
                {job.salary}
              </span>
              <span className="flex items-center ms-5">
                <FontAwesomeIcon icon={faLocationDot} className="mr-2" />
                {job.location}
              </span>
            </div>
            <div className="w-full bg-gray-100 h-[3px]"></div>
            <p className="mt-4 text-[#555555] text-justify">
              <span className="font-semibold">DESKRIPSI:</span> <br />
              {job.description}
            </p>
          </>
        ) : (
          <>
            <h2 className="text-xl font-semibold mb-2 text-center text-red-600">
              AKSES DIBATASI!
            </h2>
            <p className="text-gray-600 mb-4 text-center">
              Anda harus login atau daftar terlebih dahulu untuk memposting
              lowongan kerja.
            </p>
          </>
        )}

        <div className="w-full bg-gray-100 h-[3px] my-4"></div>
        <div className="flex justify-between mt-4">
          <button
            onClick={closeModal}
            className="bg-blue-300 text-white px-4 py-2 rounded-full hover:bg-blue-700"
          >
            Close
          </button>
          {checkLoginStatus() ? (
            <Link href="/manage-jobs">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-700">
                Posting Pekerjaan
              </button>
            </Link>
          ) : (
            <Link href="/login">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-700">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
