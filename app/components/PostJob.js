// components/PostJobButton.js
const PostJobButton = ({ openModal }) => {
  return (
    <button
      onClick={() => openModal("postJob")}
      className="border-2 border-blue-500 shadow-lg text-blue-500 bg-transparent mt-5 px-6 py-4 rounded-full hover:bg-blue-500 hover:text-white transition-all"
    >
      POSTING PEKERJAAN 🚀
    </button>
  );
};

export default PostJobButton;
