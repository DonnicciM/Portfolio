const express = require('express');
const path = require('path');
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

// API endpoint for contact form submissions (dynamic feature)
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;
    
    // Validate input
    if (!name || !email || !message) {
        return res.status(400).json({ 
            success: false, 
            error: 'All fields are required' 
        });
    }
    
    // Log the submission (in production, you'd save to database or send email)
    console.log('Contact Form Submission:', {
        name,
        email,
        message,
        timestamp: new Date().toISOString()
    });
    
    // Send success response
    res.json({ 
        success: true, 
        message: 'Thank you for your message! I will get back to you soon.' 
    });
});

// API endpoint to get visitor count (dynamic feature)
let visitorCount = 0;
app.get('/api/visitor-count', (req, res) => {
    visitorCount++;
    res.json({ count: visitorCount });
});

// Health check endpoint for Cloud Run
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'healthy' });
});

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Cloud Run will set PORT environment variable
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
