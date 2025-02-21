import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faSackDollar, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import parse from "react-html-parser";

const Deskripsi = ({ htmlContent }) => {
    return <div className="text-black">{parse(htmlContent)}</div>;
};

const JobCardListModal = ({ closeModal, job, htmlContent }) => {
  console.log("Modal Opened with Content:", htmlContent);
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-3/4 md:w-1/2">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-blue-500">{job.title}</h2>
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
          <div className="w-full bg-gray-100 h-[3px] mb-4"></div>
          <Deskripsi htmlContent={job.description} />
          <div className="w-full bg-gray-100 h-[3px] my-4"></div>
          <div className="flex justify-end mt-4">
            <button onClick={closeModal} className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-700">
              Tutup
            </button>
          </div>
      </div>
    </div>
  );
};

export default JobCardListModal;
