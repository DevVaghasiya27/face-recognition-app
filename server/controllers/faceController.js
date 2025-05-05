// face-recognition/server/controllers/faceController.js
const axios = require('axios');

exports.processFace = async (req, res) => {
  try {
    // After face recognition, extract employeeId
    const employeeId = "123"; // Replace with actual logic
    
    // Call EMS backend API
    await axios.post('http://localhost:5000/api/employees/update-attendance', {
      employeeId
    });

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update attendance' });
  }
};