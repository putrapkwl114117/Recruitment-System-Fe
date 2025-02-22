// components/ModalCardHome.js
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faClock, faSackDollar } from "@fortawesome/free-solid-svg-icons";

const Modal = ({ closeModal, job }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-3/4 md:w-1/2">
        {job ? (
          <>
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-blue-500">{job.title}</h2>
              <span className="flex text-center text-gray-600 bg-gray-100 p-2 rounded-lg">{job.category}</span>
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
          <p className="text-gray-600">Tidak ada informasi pekerjaan yang tersedia.</p>
        )}
        <div className="w-full bg-gray-100 h-[3px] my-4"></div>
        <button
          onClick={closeModal}
          className="bg-blue-300 text-white px-4 py-2 rounded-full hover:bg-blue-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
