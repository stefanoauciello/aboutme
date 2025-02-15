import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

function BackButton() {
  const navigate = useNavigate();
  return (
    <div className="w-full flex justify-start mb-4">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center text-blue-600 hover:text-blue-900 transition px-4 py-2 rounded-md hover:bg-blue-100 shadow-md"
      >
        <FaArrowLeft className="mr-2" /> Back
      </button>
    </div>
  );
}

export default BackButton;
