import Footer from "@/components/footer";
import { IoArrowBack } from "react-icons/io5";
import { FaCamera } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [currentActive, setCurrentActive] = useState(0);

  const navigate = useNavigate();
  return (
    <div className="h-full w-full bg-[#f2f3f7]">
      <section className="flex justify-between px-5 py-4 pb-3">
        <IoArrowBack size={24} color="#177d54" onClick={() => navigate(-1)} />
        <FaCamera size={24} color="#177d54" />
      </section>
      Profile
      <Footer />
    </div>
  );
};

export default Profile;
