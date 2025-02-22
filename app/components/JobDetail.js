import React, { useState } from "react";
import {
  FaMoneyBill,
  FaBuilding,
  FaBriefcase,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaTags,
} from "react-icons/fa";

const JobDetail = ({ job, onClose }) => {
  if (!job) return null;

  const [isExpanded, setIsExpanded] = useState(false);
  const words = job.description.split(" ");
  const shortDescription =
    words.slice(0, 50).join(" ") + (words.length > 50 ? "..." : "");

  return (
    <div className="absolute inset-0 flex items-end justify-center bg-gray-200 transition-transform transform translate-y-96">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl transition-all duration-300 relative overflow-x-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-red-500 text-xl font-bold"
        >
          ?
        </button>
        <h2 className="text-3xl font-extrabold text-gray-800 border-b-2 pb-2 mb-4">
          {job.title}
        </h2>

        <div
          className="description-container"
          style={{ maxHeight: "200px", overflowY: "auto" }}
        >
          <p className="mt-2 text-gray-600">
            {isExpanded ? job.description : shortDescription}
            {words.length > 50 && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-blue-500 ml-2 focus:outline-none"
              >
                {isExpanded ? "Sembunyikan" : "Baca Selengkapnya"}
              </button>
            )}
          </p>
        </div>

        <p className="mt-4 text-gray-500 flex items-center">
          <FaMapMarkerAlt className="mr-2" />
          <strong>Location:</strong> {job.location}
        </p>
        <p className="mt-2 text-gray-500 flex items-center">
          <FaCalendarAlt className="mr-2" />
          <strong>Posted On:</strong>{" "}
          {new Date(job.created_at).toLocaleDateString()}
        </p>
        <div className="flex justify-between mt-4">
          <div>
            <p className="text-gray-500 flex items-center">
              <FaMoneyBill className="mr-2" />
              <strong>Salary:</strong> {job.salary}
            </p>
            <p className="text-gray-500 flex items-center">
              <FaTags className="mr-2" />
              <strong>Category:</strong> {job.category}
            </p>
          </div>
          <div>
            <p className="text-gray-500 flex items-center">
              <FaBuilding className="mr-2" />
              <strong>Company:</strong> {job.company}
            </p>
            <p className="text-gray-500 flex items-center">
              <FaBriefcase className="mr-2" />
              <strong>Type:</strong> {job.type}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
