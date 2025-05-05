// import React, { useRef, useState, useEffect } from 'react';
// import Webcam from 'react-webcam';
// import axios from 'axios';
// import './FaceRecognition.css';

// const FaceRecognition = () => {
//   const webcamRef = useRef(null);
//   const [cameraOpen, setCameraOpen] = useState(false);
//   const [result, setResult] = useState(null);
//   const timeoutRef = useRef(null);

//   // Cleanup timeouts on unmount
//   useEffect(() => {
//     return () => {
//       if (timeoutRef.current) clearTimeout(timeoutRef.current);
//     };
//   }, []);

//   const capture = async () => {
//     try {
//       setResult(null); // Reset previous result
      
//       if (!webcamRef.current) {
//         throw new Error('Webcam not initialized');
//       }

//       const imageSrc = webcamRef.current.getScreenshot();
//       if (!imageSrc) {
//         throw new Error('Failed to capture image');
//       }

//       const blob = await fetch(imageSrc).then(res => res.blob());
//       const formData = new FormData();
//       formData.append('image', blob, 'face.jpg');

//       // Fixed API call with error handling
//       const response = await axios.post('http://localhost:5000/api/recognize', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' }
//       });

//       setResult(response.data.recognized);
      
//       // Auto-close popup after 3 seconds
//       timeoutRef.current = setTimeout(() => {
//         setResult(null);
//       }, 3000);

//     } catch (error) {
//       console.error('Recognition error:', error);
//       setResult(false);
//       timeoutRef.current = setTimeout(() => {
//         setResult(null);
//       }, 3000);
//     }
//   };

//   return (
//     <div className="container">
//       <h1>Face Recognition System</h1>
//       <div className="button-group">
//         <button 
//           onClick={() => setCameraOpen(!cameraOpen)}
//           className={cameraOpen ? 'active' : ''}
//         >
//           {cameraOpen ? 'Close Camera' : 'Open Camera'}
//         </button>
//         <button 
//           onClick={capture} 
//           disabled={!cameraOpen}
//           className={cameraOpen ? 'active' : ''}
//         >
//           Recognize Face
//         </button>
//       </div>

//       {cameraOpen && (
//         <div className="camera-container">
//           <Webcam
//             ref={webcamRef}
//             screenshotFormat="image/jpeg"
//             mirrored={true}
//             videoConstraints={{
//               width: 640,
//               height: 480,
//               facingMode: "user"
//             }}
//           />
//         </div>
//       )}

//       {result !== null && (
//         <div className={`popup ${result ? 'success' : 'error'}`}>
//           {result ? 'Face Recognized! 🎉' : 'Face Not Recognized 😞'}
//           <button 
//             className="close-btn"
//             onClick={() => setResult(null)}
//           >
//             ×
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FaceRecognition;

import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import './FaceRecognition.css';

const FaceRecognition = () => {
  const webcamRef = useRef(null);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [result, setResult] = useState(null);

  const mockFaceDetection = () => {
    // Simulate detection with 70% success rate
    const isDetected = Math.random() < 0.7;
    setResult(isDetected);
    setTimeout(() => setResult(null), 2000);
  };

  return (
    <div className="container">
      <h1>Basic Face Detection</h1>
      
      <div className="button-group">
        <button 
          onClick={() => setCameraOpen(!cameraOpen)}
          className={cameraOpen ? 'active' : ''}
        >
          {cameraOpen ? 'Close Camera' : 'Open Camera'}
        </button>
        
        <button
          onClick={mockFaceDetection}
          disabled={!cameraOpen}
        >
          Check for Face
        </button>
      </div>

      {cameraOpen && (
        <div className="camera-container">
          <Webcam
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            mirrored={true}
            videoConstraints={{
              width: 640,
              height: 480,
              facingMode: "user"
            }}
          />
        </div>
      )}

      {result !== null && (
        <div className={`popup ${result ? 'success' : 'error'}`}>
          {result ? 'Face Detected! ✅' : 'No Face Detected ❌'}
        </div>
      )}
    </div>
  );
};

export default FaceRecognition;