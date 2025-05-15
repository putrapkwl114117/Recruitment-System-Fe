export default function JobItem({ job, onDelete, onEdit }) {
  return (
    <tr className="border-t">
      <td className="py-3 px-4">{job.title}</td>
      <td className="py-3 px-4">{job.description}</td>
      <td className="py-3 px-4">{job.salary}</td>
      <td className="py-3 px-4">{job.category}</td>
      <td className="py-3 px-4">{job.location}</td>
      <td className="py-3 px-4">{job.type}</td>
      <td className="py-3 px-4">{job.experience_level}</td>
      <td className="py-3 px-4">{job.skills}</td>
      <td className="py-3 px-4">
        {job.image && (
          <img
            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${job.image}`}
            alt={job.title}
            className="w-16 h-16 object-cover rounded-full"
          />
        )}
      </td>
      <button
        onClick={() => onEdit(job)}
        className="text-blue-500 hover:text-blue-700 text-sm"
      >
        Edit
      </button>
      <td className="py-3 px-4 text-center">
        <button
          onClick={() => onDelete(job.id)}
          className="text-red-500 hover:text-red-700 text-sm"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
