import JobItem from "./JobItem";

export default function JobList({ jobs, onDelete, onEdit }) {
  
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full rounded-lg shadow-md">
        <thead className="bg-gray-200 shadow-lg relative z-10">
          <tr>
            <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">
              No
            </th>
            <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">
              Title
            </th>
            <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">
              Description
            </th>
            <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">
              Salary
            </th>
            <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">
              Category
            </th>
            <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">
              Location
            </th>
            <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">
              Type
            </th>
            <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">
              Experience Level
            </th>
            <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">
              Skills
            </th>
            <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">
              Image
            </th>
            <th className="py-2 px-4 text-center text-sm font-semibold text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="text-sm font-medium">
          {jobs.map((job, index) => (
            <tr
              key={job.id}
              className={`border-t hover:bg-gray-100 ${
                index % 2 === 0 ? "bg-white" : "bg-gray-50"
              }`}
            >
              <td className="py-3 px-4 text-slate-700">{index + 1}</td>
              <td className="py-3 px-4 text-slate-700">{job.title}</td>
              <td className="py-3 px-4 text-slate-700">{job.description}</td>
              <td className="py-3 px-4 text-slate-700">{job.salary}</td>
              <td className="py-3 px-4 text-slate-700">{job.category}</td>
              <td className="py-3 px-4 text-slate-700">{job.location}</td>
              <td className="py-3 px-4 text-slate-700">{job.type}</td>
              <td className="py-3 px-4 text-slate-700">
                {job.experience_level}
              </td>
              <td className="py-3 px-4 text-slate-700">{job.skills}</td>
              <td className="py-3 px-4 text-slate-700">
                {job.image && (
                  <img
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${job.image}`}
                    alt={job.title}
                    className="w-16 h-16 object-cover rounded-full"
                  />
                )}
              </td>
              <td className="py-3 px-4 text-center">
                <button
                  onClick={() => onEdit(job)}
                  className="text-blue-500 hover:text-blue-700 text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(job.id)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
