// components/JobCard.js
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faClock,
  faSackDollar,
} from "@fortawesome/free-solid-svg-icons";

const JobCard = ({ job, openModal }) => {
  return (
    <div
      onClick={() => openModal("jobDetails", job)}
      className="p-2 bg-[#F8FAFB] shadow-md rounded-xl hover:bg-gradient-to-br hover:from-[#80d1ff] to-[#80d1ff] transition duration-300"
    >
      <div className="p-6 bg-white rounded-xl">
        <div className="flex justify-between items-center">
          <h3 className="text-blue-500 text-xl font-semibold">{job.title}</h3>
          <span className="flex text-center text-gray-600 bg-gray-100 p-2 rounded-lg">
            {job.category}
          </span>
        </div>
        <div className="w-full bg-gray-100 h-[3px] my-4"></div>
        <div className="flex mt-3 text-gray-500">
          <p className="line-clamp-2">{job.description}</p>
        </div>
      </div>
      <div className="text-gray-500 text-sm flex justify-start items-center p-3">
        <span className="flex items-center">
          <FontAwesomeIcon icon={faClock} className="mr-2" />
          {job.type}
        </span>
        <span className="flex items-center ms-4">
          <FontAwesomeIcon icon={faSackDollar} className="mr-2" />
          {job.salary}
        </span>
      </div>
      <div className="text-gray-500 text-sm flex justify-start items-center px-3">
        <span className="flex items-center justify-center">
          <FontAwesomeIcon icon={faLocationDot} className="mr-2" />
          {job.location}
        </span>
      </div>
    </div>
  );
};

export default JobCard;
