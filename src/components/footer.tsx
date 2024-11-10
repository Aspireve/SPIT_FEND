import { FaHome } from "react-icons/fa";
import { FaStore } from "react-icons/fa";
import { PiRankingBold } from "react-icons/pi";
import { FaUserCircle } from "react-icons/fa";
import { FaCamera } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import Webcam from "react-webcam";
import { useRef, useState } from "react";

const Footer = () => {
  const navigate = useNavigate();
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleCapture = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setCapturedImage(imageSrc);
      setIsCameraOpen(false);
    }
  };

  const handleAddItemClick = () => {
    setIsCameraOpen(true);
  };

  const webcamRef = useRef<Webcam>(null);
  return (
    <>
      {isCameraOpen && (
        <div
          style={{
            zIndex: 1000,
            position: "fixed",
            top: 0,
            left: 0,
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          {!selectedOption && (
            <div className="z-[1000] fixed top-0 left-0 w-screen h-screen bg-[#000a] bg-gradient-to-t from-[#000] to-transparent flex justify-end flex-col">
              <div className="mx-4 my-2 ">
                <p
                  onClick={() => setSelectedOption("electric")}
                  className="w-full py-2 text-center bg-white rounded-md"
                >
                  Electric Bill
                </p>
              </div>
              <div className="mx-4 my-2 ">
                <p
                  onClick={() => setSelectedOption("water")}
                  className="w-full py-2 text-center bg-white rounded-md"
                >
                  Water Bill
                </p>
              </div>
              <div className="mx-4 my-2 mb-20">
                <p
                  onClick={() => setSelectedOption("organic")}
                  className="w-full py-2 text-center bg-white rounded-md"
                >
                  Organic Bill
                </p>
              </div>
            </div>
          )}
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width="100%"
            videoConstraints={{
              facingMode: "environment",
            }}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          <Button
            variant="contained"
            onClick={handleCapture}
            sx={{
              my: 2,
              width: "100%",
              backgroundColor: "#0d8a50",
              color: "#fff",
              fontWeight: "bold",
            }}
          >
            Capture Image
          </Button>
        </div>
      )}
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
    </>
  );
};

export default Footer;
