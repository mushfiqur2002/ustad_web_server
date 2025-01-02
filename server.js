require('dotenv').config();
// module.exports = app;
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(cors());

const port = process.env.PORT || 5500;
const mongoURI = process.env.MONGO_URI;

// MongoDB connection
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });

// Define schema and model
const membersSchema = new mongoose.Schema({
    name: String,
    designation: String,
    affiliation: {
        current: {
            institution: String,
            department: String,
            role: String,
        },
    },
    education: [
        {
            degree: String,
            field: String,
            institution: String,
            status: String,
            scholarship: String,
        },
    ],
    research_areas: [String], // Array of strings
    social_links: {
        twitter: String,
        linkedin: String,
        facebook: String,
    },
    photo: String,
    company_role: String,
});


const Members = mongoose.model('members', membersSchema, 'members');


// Serve static files
app.use(express.static(__dirname));

// Serve homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); // Serve the HTML file
});

// API endpoint to fetch members
app.get('/members', async (req, res) => {
    try {
        console.log('Fetching members...');
        const membersList = await Members.find({}); // Fetch all members from MongoDB
        console.log('Fetched members:', membersList); // Log the result
        res.json(membersList); // Send the data as JSON
    } catch (error) {
        console.error('Error fetching members:', error);
        res.status(500).send('Server Error');
    }
});


// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
