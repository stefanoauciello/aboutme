import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

function BackButton() {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(-1)}
      className="flex items-center text-blue-300 hover:text-white transition mb-6"
    >
      <FaArrowLeft className="mr-2" /> Back
    </button>
  );
}

export default BackButton;