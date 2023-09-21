import { useNavigate } from "react-router-dom";
import { useState } from "react";

function useModal() {
    const [modalTitle, setModalTitle] = useState("");
    const [btnColor,setBtnColor]=useState();
    const navigate = useNavigate();
  
    const handleModal = (title,color) => {
      setModalTitle(title);
      setBtnColor(color)
      navigate(`/modal/${title.toLowerCase()}`);
    };

    const closeModal = () => {
        setModalTitle("");
        navigate("/"); 
      };
  
    return { modalTitle, btnColor, handleModal, closeModal };
}

export default useModal;
  