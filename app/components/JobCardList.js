import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faClock, faSackDollar, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import parse from "react-html-parser";
import { deleteJob } from "../services/job";

const Deskripsi = ({ htmlContent }) => <div>{parse(htmlContent)}</div>;

const JobCardList = ({ job, openModal, htmlContent, userId, triggerRefresh, formType }) => {
  const handleClick = () => {
    openModal("jobDetails", job, htmlContent);
  };

  const handleEditClick = (e) => {
    e.stopPropagation(); 
    openModal("edit", job); 
  };  

  const handleDelete = async (jobId) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus pekerjaan ini?")) {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Token tidak ditemukan. Silakan login ulang.");
        return;
      }

      try {
        await deleteJob(jobId, token); 
        alert("Pekerjaan berhasil dihapus!");
        if (triggerRefresh) triggerRefresh();
      } catch (error) {
        console.error("Error deleting job:", error);
        alert("Terjadi kesalahan saat menghapus pekerjaan.");
      }
    }
  };

  return (
    <div 
      onClick={handleClick}
      className="p-2 bg-[#F8FAFB] shadow-md rounded-xl hover:bg-gradient-to-br hover:from-[#80d1ff] to-[#80d1ff] transition duration-300"
    >
      <div className="p-6 bg-white rounded-xl">
        <div className="flex justify-between items-center">
          <h3 className="text-blue-500 text-xl font-semibold">{job.title}</h3>

          {userId ? (
            <div className="flex space-x-2">
              <button 
                onClick={handleEditClick}
                className="bg-yellow-500 text-white px-2 py-1 rounded-md hover:bg-yellow-600"
              >
                <FontAwesomeIcon icon={faEdit} />
              </button>
              <button 
                onClick={(e) => { 
                  e.stopPropagation(); 
                  handleDelete(job.id);
                }}
                className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          ) : (
            <span className="text-gray-600 bg-gray-100 p-2 rounded-lg">{job.category}</span>
          )}
        </div>

        {!userId && <div className="w-full bg-gray-100 h-[3px] my-4"></div>}

        {!userId && (
          <div className="flex mt-3 text-black line-clamp-2">
            <Deskripsi htmlContent={htmlContent} />
          </div>
        )}
      </div>

      <div className="text-gray-500 text-sm flex justify-start items-center p-3 space-x-4">
        <span className="flex items-center">
          <FontAwesomeIcon icon={faClock} className="mr-2" />
          {job.type}
        </span>
        <span className="flex items-center">
          <FontAwesomeIcon icon={faSackDollar} className="mr-2" />
          {job.salary}
        </span>
      </div>
      <div className="text-gray-500 text-sm flex justify-start items-center px-3">
        <span className="flex items-center">
          <FontAwesomeIcon icon={faLocationDot} className="mr-2" />
          {job.location}
        </span>
      </div>
    </div>
  );
};

export default JobCardList;
