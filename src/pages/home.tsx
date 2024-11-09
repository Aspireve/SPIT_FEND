import { FaHome } from "react-icons/fa";
import { FaStore } from "react-icons/fa";
import { PiRankingBold } from "react-icons/pi";
import { FaUserCircle } from "react-icons/fa";
import { FaCamera } from "react-icons/fa";
import { RiMenu2Line } from "react-icons/ri";
import { PiCoinVerticalFill } from "react-icons/pi";
import { FaRegBell } from "react-icons/fa6";

const Home = () => {
  return (
    <div className="h-screen w-full bg-[#f2f3f7] bg-gradient-to-br from-[#04894a] to-[#0f8951]">
      <section className="px-5 py-4 pb-3 flex justify-between">
        <div className="flex gap-2 items-center justify-center">
          <RiMenu2Line color="#fff" size={20} />
          <img
            src="./profile.jpeg"
            className="w-8 h-8 border-4 border-[#fff6]  rounded-md object-cover"
          />
          <div>
            <p className="text-xs text-white">Afternoon,</p>
            <h1 className="text-base font-semibold text-white leading-5">
              Johnn Doe
            </h1>
          </div>
        </div>
        <div className="flex gap-2 items-center justify-center">
          <div className="bg-[#fff3] flex gap-2 items-center justify-center p-1 px-2">
            <PiCoinVerticalFill size={20} color="#ecc355" />
            <p className="text-white font-semibold">345</p>
          </div>
          <FaRegBell size={20} color="#fff" />
        </div>
      </section>
      <div className="fixed bottom-0 h-5/6 w-full bg-[#f2f3f7] rounded-se-[5rem] rounded-ss-[5rem]"></div>
      <nav className="fixed bottom-0 w-full flex bg-white justify-between px-5 py-2 pt-3">
        <div className=" absolute -top-1/2 right-1/2 translate-x-1/2 w-16 bg-[#f2f3f7] rounded-ee-full rounded-es-full h-16 flex items-center justify-center">
          <div className="flex items-center justify-center rounded-full border-4 border-white shadow-lg flex-col bg-[#177d54] p-3 ">
            <FaCamera size={20} color="#fff" className="shadow-md" />
          </div>
        </div>
        <div className="flex flex-1 items-center flex-col text-[#177d54]">
          <FaHome size={20} color="#177d54" />
          <p className="text-sm">Home</p>
        </div>
        <div className="flex flex-1 items-center flex-col">
          <PiRankingBold size={20} />
          <p className="text-sm">Rank</p>
        </div>
        <div className="flex-[0.5]"></div>
        <div className="flex flex-1 items-center flex-col">
          <FaStore size={20} />
          <p className="text-sm">Market</p>
        </div>
        <div className="flex flex-1 items-center flex-col">
          <FaUserCircle size={20} />
          <p className="text-sm">Profile</p>
        </div>
      </nav>
    </div>
  );
};

export default Home;
