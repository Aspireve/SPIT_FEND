import { FaHome } from "react-icons/fa";
import { FaStore } from "react-icons/fa";
import { PiRankingBold } from "react-icons/pi";
import { FaUserCircle } from "react-icons/fa";
import { FaCamera } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <nav className="fixed bottom-0 flex justify-between w-full px-5 py-2 pt-3 bg-white">
      <div className=" absolute -top-1/2 right-1/2 translate-x-1/2 w-16 bg-gradient-to-b from-transparent to-[#f2f3f7] rounded-ee-full rounded-es-full h-16 flex items-center justify-center">
        <div className="flex items-center justify-center rounded-full border-4 border-white shadow-lg flex-col bg-[#177d54] p-3 ">
          <FaCamera size={20} color="#fff" className="shadow-md" />
        </div>
      </div>
      <div
        onClick={() => navigate("/home")}
        className={`flex flex-1 items-center flex-col ${
          window.location.pathname === "/home" && "text-[#177d54]"
        }`}
      >
        <FaHome
          size={20}
          color={window.location.pathname === "/home" ? "#177d54" : "#000"}
        />
        <p className="text-sm">Home</p>
      </div>
      <div
        onClick={() => navigate("/leaderboard")}
        className={`flex flex-1 items-center flex-col ${
          window.location.pathname === "/leaderboard" && "text-[#177d54]"
        }`}
      >
        <PiRankingBold
          size={20}
          color={
            window.location.pathname === "/leaderboard" ? "#177d54" : "#000"
          }
        />
        <p className="text-sm">Rank</p>
      </div>
      <div className="flex-[0.5]"></div>
      <div
        onClick={() => navigate("/marketplace")}
        className={`flex flex-1 items-center flex-col ${
          window.location.pathname === "/marketplace" && "text-[#177d54]"
        }`}
      >
        <FaStore
          size={20}
          color={
            window.location.pathname === "/marketplace" ? "#177d54" : "#000"
          }
        />
        <p className="text-sm">Market</p>
      </div>
      <div
        onClick={() => navigate("/profile")}
        className={`flex flex-col items-center flex-1 ${
          window.location.pathname === "/profile" && "text-[#177d54]"
        }`}
      >
        <FaUserCircle
          size={20}
          color={window.location.pathname === "/profile" ? "#177d54" : "#000"}
        />
        <p className="text-sm">Profile</p>
      </div>
    </nav>
  );
};

export default Footer;
