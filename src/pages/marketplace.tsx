import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import Webcam from "react-webcam";
import Footer from "@/components/footer";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "@/lib/axiosInstance";

interface Item {
  objectName: string;
  units: number | string;
  price: number | string;
  image: string | null;
}

const Marketplace: React.FC = () => {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [objectName, setObjectName] = useState("");
  const [units, setUnits] = useState<number | string>("");
  const [price, setPrice] = useState<number | string>("");
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [uploadResponse, setUploadResponse] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const [responseData, setResponseData] = useState()

  const handleAddItemClick = () => {
    setIsCameraOpen(true);
  };



  const base64ToBlob = (base64, mimeType = "image/png") => {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: mimeType });
  };

  const handleCapture = async () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      console.log(imageSrc);
      const formData = new FormData();
      const base64Data = imageSrc.replace(/^data:image\/\w+;base64,/, "");

      // Convert Base64 string to a Blob
      const blob = base64ToBlob(base64Data, "image/png");
      formData.append("image", blob, 'image.png');
      await axiosInstance
        .post("marketplace/isRecycleable", formData)
        .then((data) => {
          console.log(data);
          setResponseData(data.response)
          console.log(data.data.response.itemDescription)
          setObjectName(`${data.data.response.itemDescription}`);
          setPrice(`${data.data.response.price}`);
          setCapturedImage(imageSrc);
          setIsCameraOpen(false);
          setIsModalOpen(true);
        });
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setObjectName("");
    setUnits("");
    setPrice("");
    setCapturedImage(null);
  };

  const handleSubmit = () => {
    const newItem: Item = {
      objectName,
      units,
      price,
      image: capturedImage,
    };
    setItems([...items, newItem]);
    handleModalClose();
  };

  // Function to handle image upload to the backend
  const handleImageUpload = async () => {
    if (!capturedImage) {
      alert("Please capture an image first.");
      return;
    }

    const formData = new FormData();
    const blob = await fetch(capturedImage).then((res) => res.blob());
    formData.append("image", blob, "captured.jpg");

    try {
      const res = await axiosInstance.post(
        "marketplace/isRecycleable",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      console.log(res.data);
      setUploadResponse(res.data);
      setUploadError(null);
    } catch (error) {
      setUploadError(error.response?.data || "Failed to upload image");
      setUploadResponse(null);
    }
  };

  const webcamRef = React.useRef<Webcam>(null);
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-br from-[#04894a] to-[#0f8951] min-h-screen">
      <div className="flex items-center gap-4 px-5 py-4 text-white">
        <IoIosArrowBack color="#fff" size={20} onClick={() => navigate(-1)} />
        <h1 className="text-lg font-semibold text-left text-white">
          Marketplace
        </h1>
      </div>
      <div className="bg-[#f2f3f7] w-full min-h-screen rounded-ss-2xl rounded-se-2xl text-center py-5">
        {isCameraOpen && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              marginBottom: "20px",
              margin: "20px",
            }}
          >
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width="100%"
              videoConstraints={{ facingMode: "environment" }}
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

        {/* List of Items */}
        <div>
          {items.map((item, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "20px",
                textAlign: "left",
                width: "80%",
                maxWidth: "600px",
                backgroundColor: "#fff",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                margin: "auto",
                marginTop: "20px",
                borderRadius: "10px",
                overflow: "hidden",
                padding: "10px",
              }}
            >
              {item.image && (
                <img
                  src={item.image}
                  alt="Captured"
                  style={{
                    width: "65px",
                    height: "65px",
                    objectFit: "cover",
                    marginRight: "20px",
                    borderRadius: "5px",
                  }}
                />
              )}
              <div>
                <p>
                  <strong className="text-lg">{item.objectName}</strong>
                </p>
                <p className="text-sm">Units: {item.units}</p>
                <p className="text-sm">Price: Rs{item.price}</p>
              </div>
            </div>
          ))}
        </div>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddItemClick}
          disabled={isCameraOpen}
          sx={{
            width: "80%",
            backgroundColor: "#0d8a50",
            color: "#fff",
            fontWeight: "bold",
            marginTop: "20px",
          }}
        >
          Add Item
        </Button>

        {/* Upload Image Button */}
        <Button
          variant="contained"
          onClick={handleImageUpload}
          disabled={isCameraOpen || items.length === 0}
          sx={{
            width: "80%",
            backgroundColor: "#0d8a50",
            color: "#fff",
            fontWeight: "bold",
            marginTop: "10px",
          }}
        >
          Upload Electric Bill
        </Button>

        {uploadResponse && (
          <div>
            <h3>Upload Response:</h3>
            <pre>{JSON.stringify(uploadResponse, null, 2)}</pre>
          </div>
        )}
        {uploadError && (
          <div style={{ color: "red" }}>
            <h3>Upload Error:</h3>
            <pre>{JSON.stringify(uploadError, null, 2)}</pre>
          </div>
        )}
        <div className="w-[90%] ml-auto mt-5">
          <h5 className="text-lg text-left font-semibold ">
            Select your recycling partner
          </h5>
          <div className="flex overflow-scroll gap-5 mt-5">
            <div className="w-[300vw] flex gap-5">
              <div className="h-48 w-48 bg-[url('./SKScrap.jpg')] rounded-md z-0 p-5 justify-end flex flex-col">
                <p className="text-left text-white z-10 font-bold">
                  S.K Scrap Traders
                </p>
                <p className="text-left text-[#fff] z-10 text-sm">
                  Address: Rd No. 12, M.I.D.C, Andheri (E)
                </p>
              </div>
              <div className="h-48 w-48 bg-[url('./Battery-Scrap.jpg')] rounded-md z-0 p-5 justify-end flex flex-col">
                <p className="text-left text-white z-10 font-bold">
                  Khan Scrap Dealer
                </p>
                <p className="text-left text-[#fff] z-10 text-sm">
                  Address: Rd Number 11, Chakala Industrial Area (MIDC)
                </p>
              </div>
              <div className="h-48 w-48 bg-[url('./KhanScrap.jpg')] rounded-md z-0 p-5 justify-end flex flex-col">
                <p className="text-left text-white z-10 font-bold">
                  S.K V EWaste Traders
                </p>
                <p className="text-left text-[#fff] z-10 text-sm">
                  Address: A-103 SHIV SHAKTI,CHS 1ST FLOOR,ANDHERI
                </p>
              </div>
              <div className="h-48 w-48 bg-[url('./BangarBecho.png')] rounded-md z-0 p-5 justify-end flex flex-col">
                <p className="text-left text-white z-10 font-bold">
                  Bhangar Becho
                </p>
                <p className="text-left text-[#fff] z-10 text-sm">
                  Address: Mumbai, MH, India
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Dialog
        open={isModalOpen}
        onClose={handleModalClose}
        fullWidth
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: "10px",
            position: "absolute",
            bottom: 0,
          },
        }}
      >
        <DialogTitle>Add Item Details</DialogTitle>
        <DialogContent>
          <TextField
            label="Item Name"
            value={objectName}
            onChange={(e) => setObjectName(e.target.value)}
            fullWidth
            margin="dense"
          />
          {capturedImage && (
            <img
              src={capturedImage}
              alt="Captured"
              style={{ width: "100%", marginBottom: "10px" }}
            />
          )}
          <TextField
            label="Number of units"
            type="number"
            value={units}
            onChange={(e) => setUnits(e.target.value)}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Price per unit in Rs"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            fullWidth
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      <Footer />
    </div>
  );
};

export default Marketplace;
