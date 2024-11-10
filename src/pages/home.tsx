import { RiMenu2Line } from "react-icons/ri";
import { PiCoinVerticalFill } from "react-icons/pi";
import { FaRegBell } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { FaRupeeSign } from "react-icons/fa";
import { LineChart } from "@mui/x-charts";
import { useEffect, useRef, useState } from "react";
import Footer from "@/components/footer";
import { useNavigate } from "react-router-dom";


const Home = () => {
  const containerRef = useRef<HTMLDivElement>(null); // Reference to the parent container
  const [containerWidth, setContainerWidth] = useState(0); // State to hold the width

  useEffect(() => {
    // Function to update the width of the container
    const updateWidth = () => {
      if (containerRef.current) {
        console.log(containerRef?.current?.offsetWidth);
        setContainerWidth(containerRef?.current?.offsetWidth + 95);
      }
    };

    // Set width on component mount and window resize
    updateWidth();
    window.addEventListener("resize", updateWidth);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, []);
  const navigate = useNavigate()
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
      <div className="-z-0 fixed bottom-0 h-3/4 w-full bg-[#f2f3f7] rounded-se-[5rem] rounded-ss-[5rem]"></div>
      <section className="relative bg-[#f3f4f9] h-56 w-56 m-auto rounded-lg shadow-lg z-30 mt-9 flex items-center justify-center">
        <div className="p-5 bg-[#000] bg-gradient-to-tr from-[#80c678] to-[#3fb36a] rounded-full h-fit w-fit shadow-lg">
          <div className=" rounded-full bg-white flex items-center justify-center h-fit w-fit p-8 shadow-lg" onClick={() => navigate("/ecolevelsystem")}>
            <img src="./bio-energy.png" className="h-20 w-20" />
          </div>
        </div>
      </section>
      <section className="text-black relative w-11/12 m-auto mt-5 pb-28">
        <h2 className="font-semibold text-lg">Your Statistics</h2>
        <div className="grid grid-cols-2 grid-rows-2 gap-4 mt-5">
          <div
            ref={containerRef}
            className="relative col-span-1 row-span-2 flex flex-col items-center bg-white shadow-2xl rounded-xl"
          >
            <LineChart
              xAxis={[{ data: [1, 2, 3, 5, 8, 10, 11, 12, 13, 15, 18, 20] }]}
              series={[
                {
                  data: [2, 5.5, 2, 8.5, 1.5, 5, 2, 5.5, 2, 8.5, 1.5, 5],
                  area: true,
                  color: "#0f8951", // Use gradient ID
                },
              ]}
              yAxis={[
                {
                  colorMap: {
                    type: "continuous",
                    min: 0,
                    max: 10,
                    color: ["transparent", "#a6d590"],
                  },
                },
              ]}
              leftAxis={null}
              bottomAxis={null}
              height={200}
              width={containerWidth}
              className="flex w-full min-w-full "
            >
              <svg width="0" height="0">
                <defs>
                  <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4A90E2" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#4A90E2" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </LineChart>
            <p className="absolute top-5 inline">Energy</p>
            <h1 className="absolute font-bold text-4xl inline bottom-2 text-black">421</h1>
          </div>
          <div className="col-span-1 row-span-1 flex flex-col bg-white shadow-2xl p-4 rounded-xl">
            <div className="flex gap-1">
              <FaRupeeSign size={20} color="#ecc355" />
              <p>Rewards</p>
            </div>
            <div className="flex items-end gap-2">
              <h1 className="font-bold text-4xl inline text-black">421</h1>
              <p className="inline">rupees</p>
            </div>
          </div>
          <div className="col-span-1 row-span-1 flex flex-col bg-white shadow-2xl rounded-xl p-4" onClick={() => navigate("/ecolevelsystem")}>
            <div className="flex gap-1">
              <FaStar size={20} color="#ecc355" />
              <p>Eco Points</p>
            </div>
            <div className="flex items-end gap-2">
              <h1 className="font-bold text-4xl inline text-black">61</h1>
              <p className="inline">points</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
