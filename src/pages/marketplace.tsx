import React, { useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import Webcam from 'react-webcam';

interface Item {
    objectName: string;
    units: number | string;
    price: number | string;
    image: string | null;
}

const Marketplace: React.FC = () => {
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [objectName, setObjectName] = useState('');
    const [units, setUnits] = useState<number | string>('');
    const [price, setPrice] = useState<number | string>('');
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const [items, setItems] = useState<Item[]>([]);

    const handleAddItemClick = () => {
        setIsCameraOpen(true);
    };

    const handleCapture = () => {
        const imageSrc = webcamRef.current?.getScreenshot();
        if (imageSrc) {
            setCapturedImage(imageSrc);
            setIsCameraOpen(false);
            setIsModalOpen(true);
        }
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setObjectName('');
        setUnits('');
        setPrice('');
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

    const webcamRef = React.useRef<Webcam>(null);

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleAddItemClick}
                sx={{ mb: 2 }}
            >
                Add Item
            </Button>

            {isCameraOpen && (
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    marginBottom: '20px'
                }}>
                    <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        width="100%"
                        videoConstraints={{
                            facingMode: 'environment'
                        }}
                    />
                    <Button
                        variant="contained"
                        onClick={handleCapture}
                        sx={{ mt: 2 }}
                    >
                        Capture Image
                    </Button>
                </div>
            )}

            {/* List of Items */}
            <div>
                {items.map((item, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', textAlign: 'left', width: '80%', maxWidth: '600px' }}>
                        {item.image && (
                            <img
                                src={item.image}
                                alt="Captured"
                                style={{
                                    width: '100px',
                                    height: '100px',
                                    objectFit: 'cover',
                                    marginRight: '20px' // Adds space between image and text
                                }}
                            />
                        )}
                        <div>
                            <p><strong>{item.objectName}</strong></p>
                            <p>Units: {item.units}</p>
                            <p>Price per unit: Rs{item.price}</p>
                        </div>
                    </div>
                ))}
            </div>



            <Dialog
                open={isModalOpen}
                onClose={handleModalClose}
                fullWidth
                sx={{
                    '& .MuiDialog-paper': { borderRadius: '10px', position: 'absolute', bottom: 0 },
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
                        <img src={capturedImage} alt="Captured" style={{ width: '100%', marginBottom: '10px' }} />
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
                    <Button variant="contained" onClick={handleSubmit}>Submit</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Marketplace;
