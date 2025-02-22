import React from "react";
import { FaHeart, FaEdit, FaTrash, FaClock, FaLayerGroup, FaSearchLocation } from "react-icons/fa";

const JobCard = ({ job, onEdit, onDelete, onClick }) => {
  return (
    <div
      className="relative bg-white shadow-md rounded-lg p-6 w-[310px] cursor-pointer"
      onClick={() => onClick(job)} 
    >
      <button className="absolute top-2 right-2 text-gray-400 hover:text-red-500">
        <FaHeart />
      </button>
      <h2 className="text-xl font-semibold text-gray-800">{job.title}</h2>
      <div className="grid grid-cols-2 mt-2">
        <p className="text-gray-600 flex items-center"><FaClock className="mr-2"/> {job.type}</p>
        <p className="text-gray-600 flex items-center"><FaLayerGroup className="mr-2"/>{job.category}</p>
      </div>
      <p className="text-gray-500 mt-2 flex"><FaSearchLocation className="mr-2"/>{job.location}</p>

      <div className="flex justify-end mt-4 border-t-2 pt-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
          className="flex items-center space-x-1 text-blue-500 hover:text-blue-700"
        >
          <FaEdit />
          <span>Edit</span>
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="flex items-center ml-3 space-x-1 text-red-500 hover:text-red-700"
        >
          <FaTrash />
          <span>Hapus</span>
        </button>
      </div>
    </div>
  );
};

export default JobCard;
