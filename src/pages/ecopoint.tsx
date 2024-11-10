import { useState, useEffect } from "react";
import "./ecopoint.css";
import { axiosInstance } from "@/lib/axiosInstance";
import { get } from "http";
const EcoPoints = () => {
  const [currentPoints, setCurrentPoints] = useState(2800); // Dummy starting points
  const [score, setscore] = useState("");

  interface Voucher {
    id: number;
    name: string;
    cost: number;
    category: string;
    description: string;
    validity: string;
    additional: string;
    image: string;
    badge: string;
    badgeSymbol: string;
  }

  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [view, setView] = useState("currentVouchers"); // Default view
  const [myVouchers, setMyVouchers] = useState<Voucher[]>([]);
  const [EcoPoints, setEcoPoints] = useState("");

  useEffect(() => {
    // Set dummy vouchers
    const dummyVouchers = [
      {
        id: 1,
        name: "BigBasket",
        cost: 500,
        category: "Groceries",
        description: "₹200 off on organic fruits & vegetables",
        validity: "Valid for 14 days",
        additional: "Min. spend: ₹1,000",
        image: "./bigbasket.png",
        badge: "Trending",
        badgeSymbol: "🌟",
        // Badge symbol
      },
      {
        id: 2,
        name: "FabIndia",
        cost: 1500,
        category: "Fashion",
        description: "₹750 off on sustainable fashion and home products",
        validity: "Valid for 60 days",
        additional: "Min. spend: ₹3,000",
        image: "./fabindia5090.jpg",
        badge: "Limited Time",
        badgeSymbol: "⏳", // Badge symbol
      },
      {
        id: 3,
        name: "Mother Earth",
        cost: 800,
        category: "Home Decor",
        description: "₹400 off on sustainable home decor",
        validity: "Valid for 30 days",
        additional: "Min. spend: ₹1,500",
        image: "./motherearth.png",
        badge: "Member's Choice",
        badgeSymbol: "🏆", // Badge symbol
      },
      {
        id: 4,
        name: "24 Seven",
        cost: 300,
        category: "Personal Care",
        description: "₹150 off on bamboo toiletries and eco-friendly cleaners",
        validity: "Valid for 21 days",
        additional: "Min. spend: ₹800",
        image: "./24seven.png",
        badge: "Quick Redeem",
        badgeSymbol: "⚡", // Badge symbol
      },
      {
        id: 5,
        name: "Metro Cash & Carry",
        cost: 1500,
        category: "Wholesale",
        description: "₹1000 off on bulk grocery shopping",
        validity: "Valid for 45 days",
        additional: "Min. spend: ₹5,000",
        image: "./metro_cashandcarry.jpg",
        badge: "Best Value",
        badgeSymbol: "💎", // Badge symbol
      },
      {
        id: 6,
        name: "The Body Shop",
        cost: 400,
        category: "Personal Care",
        description: "₹200 off on eco-friendly skincare and beauty products",
        validity: "Valid for 45 days",
        additional: "Min. spend: ₹1,000",
        image: "./thebodyshop.webp",
        badge: "Exclusive",
        badgeSymbol: "✨", // Badge symbol
      },
      {
        id: 7,
        name: "Greenwear",
        cost: 1200,
        category: "Fashion",
        description: "₹600 off on eco-friendly and organic cotton clothing",
        validity: "Valid for 30 days",
        additional: "Min. spend: ₹2,500",
        image: "./greenware-logo.png",
        badge: "New Arrival",
        badgeSymbol: "🆕", // Badge symbol
      },
      {
        id: 8,
        name: "Spar",
        cost: 600,
        category: "Groceries",
        description: "₹300 off on plant-based groceries and snacks",
        validity: "Valid for 14 days",
        additional: "Min. spend: ₹1,500",
        image: "./spar.png",
        badge: "Flash Deal",
        badgeSymbol: "⚡", // Badge symbol
      },
      {
        id: 9,
        name: "Forest Essentials",
        cost: 800,
        category: "Personal Care",
        description: "₹400 off on natural and organic beauty products",
        validity: "Valid for 30 days",
        additional: "Min. spend: ₹1,500",
        image: "./Forest-Essentials-Logo.png",
        badge: "Trending",
        badgeSymbol: "🌟", // Badge symbol
      },
      {
        id: 10,
        name: "Chumbak",
        cost: 900,
        category: "Home Decor",
        description: "₹450 off on eco-conscious home products",
        validity: "Valid for 60 days",
        additional: "Min. spend: ₹2,500",
        image: "./chumbak-logo.png",
        badge: "Limited Edition",
        badgeSymbol: "🔒", // Badge symbol
      },
      {
        id: 11,
        name: "Wildcraft",
        cost: 1500,
        category: "Sports & Outdoors",
        description: "₹750 off on eco-friendly outdoor gear and apparel",
        validity: "Valid for 45 days",
        additional: "Min. spend: ₹3,000",
        image: "./wildcraft-logo.png",
        badge: "Best Seller",
        badgeSymbol: "🏅", // Badge symbol
      },
      {
        id: 12,
        name: "Amway",
        cost: 400,
        category: "Personal Care",
        description:
          "₹200 off on eco-friendly cleaning and personal care products",
        validity: "Valid for 21 days",
        additional: "Min. spend: ₹800",
        image: "./amyway-logo.png",
        badge: "Hot Deal",
        badgeSymbol: "🔥", // Badge symbol
      },
      {
        id: 13,
        name: "Zara Home",
        cost: 1300,
        category: "Home Decor",
        description: "₹700 off on sustainable and stylish home accessories",
        validity: "Valid for 60 days",
        additional: "Min. spend: ₹2,500",
        image: "./Zara-Home-logo.png",
        badge: "Eco-Luxe",
        badgeSymbol: "💎", // Badge symbol
      },
    ];
    setVouchers(dummyVouchers);
  }, []);

  interface RedeemVoucherProps {
    voucherId: number;
  }

  const redeemVoucher = ({ voucherId }: RedeemVoucherProps) => {
    const [averageUnits, setaverageUnits] = useState(second);
    const voucher = vouchers.find((v) => v.id === voucherId);
    if (!voucher) return;

    if (currentPoints >= voucher.cost) {
      setCurrentPoints((prev) => prev - voucher.cost);
      setMyVouchers((prev) => [...prev, voucher]);
      alert(`Successfully redeemed ${voucher.name}`);
    } else {
      alert("Not enough points to redeem this voucher.");
    }
  };
  const getEcoScore = async () => {
    await axiosInstance.get("scan/ecoScore").then((data) => {
      // console.log(data);
      const val = parseFloat(`${data.data.ecoScore || 0}`);
      setEcoPoints(val.toFixed(2));
    });
  };

  useEffect(() => {
    getEcoScore();
  }, []);

  return (
    <div className="eco-points-container">
      <header>
        {/* <h1>Eco Points</h1> */}
        <div className="points-display">Points: {EcoPoints}</div>
      </header>
      <div className="nav-buttons">
        <button onClick={() => setView("currentVouchers")}>
          Current Vouchers
        </button>
        <button onClick={() => setView("myVouchers")}>My Vouchers</button>
      </div>
      <div className="voucher-section">
        {view === "currentVouchers" &&
          vouchers.map((voucher) => (
            <div key={voucher.id} className="voucher-card">
              <div className="voucher-header">
                {voucher.badge && (
                  <span
                    className={`badge ${voucher.badge
                      .toLowerCase()
                      .replace(" ", "-")}`}
                  >
                    <span className="badge-icon">{voucher.badgeSymbol}</span>
                    {voucher.badge}
                  </span>
                )}
              </div>
              <img
                src={voucher.image}
                alt={voucher.name}
                className="voucher-image"
              />
              <div className="voucher-content">
                <span className="category">{voucher.category}</span>
                <h3>{voucher.name}</h3>
                <p>{voucher.description}</p>
                <p>📅 {voucher.validity}</p>
                <p>📈 {voucher.additional}</p>
                <div className="voucher-footer">
                  <span className="points-cost">🌱 {voucher.cost} Points</span>
                  <button
                    disabled={currentPoints < voucher.cost}
                    onClick={() => redeemVoucher({ voucherId: voucher.id })}
                    className="redeem-button"
                  >
                    Redeem Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        {view === "myVouchers" &&
          (myVouchers.length > 0 ? (
            myVouchers.map((voucher) => (
              <div key={voucher.id} className="voucher-card">
                <div className="voucher-header">
                  {voucher.badge && (
                    <span
                      className={`badge ${voucher.badge
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      <span className="badge-icon">{voucher.badgeSymbol}</span>
                      {voucher.badge}
                    </span>
                  )}
                </div>
                <img
                  src={voucher.image}
                  alt={voucher.name}
                  className="voucher-image"
                />
                <div className="voucher-content">
                  <span className="category">{voucher.category}</span>
                  <h3>{voucher.name}</h3>
                  <p>{voucher.description}</p>
                  <p>📅 {voucher.validity}</p>
                  <p>📈 {voucher.additional}</p>
                  <div className="voucher-footer">
                    <span className="points-cost">
                      🌱 {voucher.cost} Points
                    </span>
                    <span className="redeemed-label">Redeemed</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No vouchers redeemed yet.</p>
          ))}
      </div>
    </div>
  );
};

export default EcoPoints;
