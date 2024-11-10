import { PiCoinVerticalFill } from "react-icons/pi";
import { FaRegBell, FaStar, FaRupeeSign } from "react-icons/fa";
import { LineChart } from "@mui/x-charts";
import { useEffect, useRef, useState } from "react";
import { GiNuclearWaste } from "react-icons/gi";
import { FaLeaf, FaBolt, FaTrashAlt, FaSun } from "react-icons/fa"; // Ensure these icons are correctly imported
import Footer from "@/components/footer";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "@/lib/axiosInstance";

const facts = [
  {
    icon: <GiNuclearWaste style={{ fontSize: 40, color: "#FF5733" }} />,
    fact: "India ranks among the world’s top producers of e-waste. Recycling old electronics responsibly prevents environmental pollution and conserves resources.",
    category: "E-waste",
    source: "Rainforest Alliance",
    link: "https://en.wikipedia.org/wiki/Electronic_waste_in_India#:~:text=India%20is%20the%20%22Third%20largest,other%20countries%20around%20the%20world.",
  },
  {
    icon: <FaLeaf style={{ fontSize: 40, color: "green" }} />,
    fact: "The Amazon rainforest produces 20% of Earth's oxygen, yet we lose an area the size of 40 football fields every minute.",
    category: "Forests",
    source: "Rainforest Alliance",
    link: "https://www.nationalgeographic.com/environment/article/why-amazon-doesnt-produce-20-percent-worlds-oxygen",
  },
  {
    icon: <FaBolt style={{ fontSize: 40, color: "purple" }} />,
    fact: "Switching to LED bulbs can save 90% energy compared to traditional bulbs and last 25 times longer.",
    category: "Energy",
    source: "Energy.gov",
    link: "https://www.statesvillenc.net/2024/07/01/7911/switching-to-led-light-bulbs-can-lower-your-energy-bill#:~:text=Residential%20LEDs%20%2D%2D%20especially%20ENERGY,such%20as%20incandescent%20and%20CFL.",
  },
  {
    icon: <FaTrashAlt style={{ fontSize: 40, color: "red" }} />,
    fact: "Every minute, one garbage truck worth of plastic is dumped into our oceans - that's 1,440 trucks daily.",
    category: "Pollution",
    source: "WWF",
    link: "https://www.bambrew.in/post/the-plastic-pandemic#:~:text=Every%20minute%2C%20a%20garbage%20truck%20full%20of,is%20dumped%20into%20our%20oceans.",
  },
  {
    icon: <FaSun style={{ fontSize: 40, color: "yellow" }} />,
    fact: "One hour of sunlight hitting Earth provides enough energy to meet global power needs for an entire year.",
    category: "Solar",
    source: "NASA",
    link: "https://www.freeingenergy.com/the-earth-gets-more-solar-energy-in-one-hour-than-the-entire-world-uses-in-a-year/",
  },
];
const Home = () => {
  const containerRef = useRef<HTMLDivElement>(null); // Reference to the parent container
  const [containerWidth, setContainerWidth] = useState(0); // State to hold the width
  const [ecoScore, setecoScore] = useState("");
  const [avgUnits, setavgUnits] = useState("");

  useEffect(() => {
    // Function to update the width of the container
    const updateWidth = () => {
      if (containerRef.current) {
        // console.log(containerRef?.current?.offsetWidth);
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
  const navigate = useNavigate();

  const [currentFactIndex, setCurrentFactIndex] = useState(0);

  const handleNextFact = () => {
    setCurrentFactIndex((prevIndex: number) => (prevIndex + 1) % facts.length);
  };

  const handlePrevFact = () => {
    setCurrentFactIndex(
      (prevIndex: number) => (prevIndex - 1 + facts.length) % facts.length
    );
  };

  const getEcoScore = async () => {
    await axiosInstance.get("scan/ecoScore").then((data) => {
      // console.log(data);
      const val = parseFloat(`${data.data.ecoScore || 0}`);
      setecoScore(val.toFixed(2));
    });
  };

  const getAverageEcoScore = async () => {
    await axiosInstance.get("scan/avgUnits").then((data) => {
      // console.log(data.data);
      const val = parseFloat(`${data.data.averageUnits || 0}`);
      setavgUnits(val.toFixed(2));
    });
  };

  useEffect(() => {
    getEcoScore();
    getAverageEcoScore();
  }, []);

  return (
    <div className="h-screen w-full bg-[#f2f3f7] bg-gradient-to-br from-[#04894a] to-[#0f8951]">
      <section className="flex justify-between px-5 py-4 pb-3">
        <div
          onClick={() => navigate("/profile")}
          className="flex items-center justify-center gap-2"
        >
          {/* <RiMenu2Line color="#fff" size={20} /> */}
          <img
            src="./profile.jpeg"
            className="w-8 h-8 border-4 border-[#fff6]  rounded-md object-cover"
          />
          <div>
            <p className="text-xs text-white">Afternoon,</p>
            <h1 className="text-base font-semibold leading-5 text-white">
              Tanay
            </h1>
          </div>
        </div>
        <div className="flex items-center justify-center gap-2">
          <div className="bg-[#fff3] flex gap-2 items-center justify-center p-1 px-2">
            <PiCoinVerticalFill size={20} color="#ecc355" />
            <p className="font-semibold text-white">{ecoScore}</p>
          </div>
          <FaRegBell size={20} color="#fff" />
        </div>
      </section>
      <div className="-z-0 fixed bottom-0 h-3/4 w-full bg-[#f2f3f7] rounded-se-[5rem] rounded-ss-[5rem]"></div>
      <section className="relative bg-[#f3f4f9] h-56 w-56 m-auto rounded-lg shadow-lg z-30 mt-9 flex items-center justify-center">
        <div className="p-5 bg-[#000] bg-gradient-to-tr from-[#80c678] to-[#3fb36a] rounded-full h-fit w-fit shadow-lg">
          <div
            className="flex items-center justify-center p-8 bg-white rounded-full shadow-lg h-fit w-fit"
            onClick={() => navigate("/ecolevelsystem")}
          >
            <img src="./bio-energy.png" className="w-20 h-20" />
          </div>
        </div>
      </section>
      <section className="relative w-11/12 pb-10 m-auto mt-5 text-black">
        <h2 className="text-lg font-semibold w-[100vw] text-center">
          Your Statistics
        </h2>
        <div className="grid grid-cols-2 grid-rows-2 gap-4 mt-5">
          <div
            ref={containerRef}
            className="relative flex flex-col items-center col-span-1 row-span-2 bg-white shadow-2xl rounded-xl"
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
            <p className="absolute inline top-5">Energy</p>
            <h1 className="absolute inline text-4xl font-bold text-black bottom-2">
              {avgUnits}
            </h1>
          </div>
          <div className="flex flex-col col-span-1 row-span-1 p-4 bg-white shadow-2xl rounded-xl">
            <div className="flex gap-1">
              <FaRupeeSign size={20} color="#ecc355" />
              <p>Rewards</p>
            </div>
            <div className="flex items-end gap-2">
              <h1 className="inline text-4xl font-bold text-black">421</h1>
              <p className="inline">rupees</p>
            </div>
          </div>
          <div
            className="flex flex-col col-span-1 row-span-1 p-4 bg-white shadow-2xl rounded-xl"
            onClick={() => navigate("/ecopoint")}
          >
            <div className="flex gap-1">
              <FaStar size={20} color="#ecc355" />
              <p>Eco Points </p>
            </div>
            <div className="flex items-end gap-2">
              <h1 className="inline text-4xl font-bold text-black">
                {ecoScore}
              </h1>
              <p className="inline">points</p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative w-11/12 m-auto text-black pb-28">
        <h2 className="text-lg font-semibold w-[100vw] text-center">
          Did You Know?
        </h2>
        <div className="flex items-center justify-center p-4 mt-4 bg-white shadow-2xl rounded-xl">
          <button
            onClick={handlePrevFact}
            className="p-2 mr-4 bg-gray-300 rounded-full"
          >
            &lt;
          </button>
          <div className="flex flex-col items-center text-center">
            {facts[currentFactIndex].icon}
            <p className="mt-2">{facts[currentFactIndex].fact}</p>
            <a
              href={facts[currentFactIndex].link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 text-blue-500"
            >
              {facts[currentFactIndex].source}
            </a>
          </div>
          <button
            onClick={handleNextFact}
            className="p-2 ml-4 bg-gray-300 rounded-full"
          >
            &gt;
          </button>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
