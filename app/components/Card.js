// components/JobCard.js
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faClock,
  faSackDollar,
} from "@fortawesome/free-solid-svg-icons";

const JobCard = ({ job, openModal }) => {
  const imageUrl = job.image.startsWith("http")
    ? job.image
    : `http://127.0.0.1:8000/${job.image}`;

  return (
    <div
      onClick={() => openModal("jobDetails", job)}
      className="cursor-pointer bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 border hover:border-blue-300"
    >
      {job.image && (
        <img
          src={imageUrl}
          alt={job.title}
          className="h-40 w-full object-cover rounded-t-2xl"
        />
      )}

      <div className="p-5 space-y-3">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-800">{job.title}</h3>
          <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-md">
            {job.category}
          </span>
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          <span className="flex items-center gap-1">
            <FontAwesomeIcon icon={faClock} />
            {job.type}
          </span>
          <span className="flex items-center gap-1">
            <FontAwesomeIcon icon={faSackDollar} />
            {job.salary}
          </span>
          <span className="flex items-center gap-1">
            <FontAwesomeIcon icon={faLocationDot} />
            {job.location}
          </span>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
