const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();

// Enhanced CORS configuration
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['POST', 'GET', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));

// File upload handling
const upload = multer({
  storage: multer.memoryStorage(), // Store in memory instead of disk
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Fixed endpoint with proper error handling
app.post('/api/recognize', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ recognized: false, error: "No image received" });
    }
    
    // Simulate processing delay
    setTimeout(() => {
      const isRecognized = Math.random() > 0.5;
      res.json({ recognized: isRecognized });
    }, 1000);
    
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ recognized: false, error: "Processing failed" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));