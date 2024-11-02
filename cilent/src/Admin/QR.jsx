import React, { useEffect, useRef, useState } from 'react';
import jsQR from 'jsqr';

const QRCodeScanner = () => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [scanning, setScanning] = useState(false);
    const [result, setResult] = useState('');

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            videoRef.current.srcObject = stream;
            videoRef.current.play();
            requestAnimationFrame(scanQRCode);
        } catch (err) {
            console.error('Lỗi khi truy cập camera:', err);
        }
    };

    const scanQRCode = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const video = videoRef.current;

        if (video.videoWidth > 0 && video.videoHeight > 0) {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            const code = jsQR(imageData.data, canvas.width, canvas.height);

            if (code) {
                setResult(code.data);
                setScanning(false); // Dừng quét khi đã tìm thấy mã
                return;
            }
        }
        requestAnimationFrame(scanQRCode);
    };

    const handleStartScan = () => {
        setScanning(true);
        startCamera();
    };

    return (
        <div>
            <h2>Quét Mã QR</h2>
            <button onClick={handleStartScan} disabled={scanning}>
                {scanning ? 'Đang quét...' : 'Bắt đầu quét'}
            </button>
            <video ref={videoRef} style={{ width: '100%', maxWidth: '400px' }} />
            <canvas ref={canvasRef} style={{ display: 'none' }} />
            {result && <div>Kết quả: {result}</div>}
        </div>
    );
};

export default QRCodeScanner;
