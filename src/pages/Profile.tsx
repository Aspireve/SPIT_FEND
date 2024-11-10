import Footer from "@/components/footer";
import { IoArrowBack } from "react-icons/io5";
import { FaCamera } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Card } from "antd";
import EcoPointsPieChart from "@/graphs/EcoPointsPieChart";
import ElectricityTrend from "@/graphs/ElectricityTrend";
import WaterTrend from "@/graphs/WaterTrend";
import GeneralTrend from "@/graphs/GeneralTrend";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/axiosInstance";

const Profile = () => {
  const [electricity, setElectricity] = useState(null);
  // const [water, setWater] = useState(null);
  // const [electricity, setElectricity] = useState(null);
  useEffect(() => {
    axiosInstance
      .get("fetchChart/electric")
      .then((data) => {
        console.log(data);
        setElectricity(data?.data?.units?.map((u) => parseInt(u.units)));
        // setRespData(data.data?.electricData);
        // setCapturedImage(imageSrc);
      })
  }, []);

  const navigate = useNavigate();
  return (
    <div className="h-full w-full bg-[#f2f3f7]">
      <section className="flex justify-between px-5 py-4 pb-3">
        <IoArrowBack size={24} color="#177d54" onClick={() => navigate(-1)} />
        <FaCamera size={24} color="#177d54" />
      </section>
      <div style={{ padding: "24px", paddingBottom: "60px" }}>
        <h1 className="font-bold text-xl text-black">Profile Ananlytics</h1>
        <div style={{ padding: "24px" }}>
          <Card style={{ maxWidth: 800, margin: "0 auto" }}>
            <EcoPointsPieChart />
          </Card>
        </div>
        <div style={{ maxWidth: "800px", margin: "20px auto" }}>
          <div style={{ marginBottom: "1.875rem" }}>
            <ElectricityTrend topData={electricity}/>
          </div>
          <div style={{ marginBottom: "1.875rem" }}>
            <WaterTrend />
          </div>
          <div style={{ marginBottom: "1.875rem" }}>
            <GeneralTrend />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
