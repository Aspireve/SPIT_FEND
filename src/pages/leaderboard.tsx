import Footer from "@/components/footer";
import { IoArrowBack } from "react-icons/io5";
import { FaCamera } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LeaderBoard = () => {
  const [currentActive, setCurrentActive] = useState(0);
  const [leaderboard, setleaderboard] = useState([]);
  const navigate = useNavigate();
  return (
    <div className="h-full w-full bg-[#f2f3f7]">
      <section className="flex justify-between px-5 py-4 pb-3">
        <IoArrowBack size={24} color="#177d54" onClick={() => navigate(-1)} />
        <FaCamera size={24} color="#177d54" />
      </section>
      <section className="w-11/12 m-auto mb-20">
        <h1 className="text-xl font-semibold text-left text-black">
          Leaderboard
        </h1>
        <div className="flex mt-5 bg-white shadow-md justify-evenly">
          <div
            onClick={() => setCurrentActive(0)}
            className={`transition-all duration-300 w-full h-full py-2 text-center ${
              currentActive === 0 &&
              "shadow-2xl border-t-2 border-[#0f8951] text-[#0f8951] font-semibold  "
            }`}
          >
            <p>Region</p>
          </div>
          <div
            onClick={() => setCurrentActive(1)}
            className={`transition-all duration-300 w-full h-full py-2 text-center ${
              currentActive === 1 &&
              "shadow-2xl border-t-2 border-[#0f8951] text-[#0f8951] font-semibold  "
            }`}
          >
            <p>National</p>
          </div>
          <div
            onClick={() => setCurrentActive(2)}
            className={`transition-all duration-300 w-full h-full py-2 text-center ${
              currentActive === 2 &&
              "shadow-2xl border-t-2 border-[#0f8951] text-[#0f8951] font-semibold  "
            }`}
          >
            <p>Global</p>
          </div>
        </div>
        <section className="h-[35vh] w-full flex">
          {/* Second */}
          <div
            className="flex flex-col items-center justify-between flex-1 py-5 mt-auto bg-white shadow-lg h-3/4 rounded-s-2xl"
            key={`lol-${0}`}
          >
            <p className="font-bold text-lg text-[#277d5f]">2</p>
            <img
              src="./nft1.png"
              className="w-10 h-10 rounded-full border-2 border-[#42ba90]"
            />
            <p className="text-lg font-bold">Sahil</p>
            <p className="text-sm font-semibold text-[#124d31]">2139 Points</p>
          </div>
          {/* First */}
          <div
            className="flex-1  h-full mt-auto flex justify-between py-5 items-center flex-col bg-gradient-to-t from-[#ffeddf] to-transparent"
            key={`lol-${1}`}
          >
            <div className="relative">
              <img
                src="./crown.webp"
                className="absolute top-0 h-10 translate-x-1/2 right-1/2"
              />
              <img
                src="./nft1.png"
                className="w-16 h-16 rounded-full border-2 border-[#ff6f05] mt-8"
              />
            </div>
            <p className="text-lg font-bold text-center">Chirag</p>
            <p className="text-sm font-semibold text-[#ff6f05]">2200 Points</p>
            <p className="text-sm text-center">Activist of the month</p>
          </div>
          {/* Third */}
          <div
            className="flex flex-col items-center justify-between flex-1 py-5 mt-auto bg-white shadow-lg h-3/4 rounded-e-2xl"
            key={`lol-${2}`}
          >
            <p className="font-bold text-lg text-[#fb6969]">3</p>
            <img
              src="./nft1.png"
              className="w-10 h-10 rounded-full border-2 border-[#fb6969]"
            />
            <p className="text-lg font-bold text-center">Unnati</p>
            <p className="text-sm font-semibold text-[#fb6969]">2050 Points</p>
          </div>
        </section>

        <section className="w-full mt-6 overflow-hidden bg-white rounded-3xl">
          {Array.from({ length: 6 }).map((_, i) => (
            <section
              key={i}
              className={`flex justify-between items-center px-4 py-2 border-b-2 ${
                i === 5 && "border-b-0"
              } bg-white`}
            >
              <div className="flex items-center gap-3">
                <p className="text-lg font-bold">{i + 4}</p>
                <div className="flex items-center gap-5">
                  <img src="./nft1.png" className="w-10 h-10 rounded-full" />
                  <p>John Doe</p>
                </div>
              </div>
              <p className="font-semibold text-base text-[#124d31]">
                2130 Points
              </p>
            </section>
          ))}
        </section>
      </section>
      LeaderBoard
      <Footer />
    </div>
  );
};

export default LeaderBoard;
