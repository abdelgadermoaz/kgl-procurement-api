const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Path to our local data file
const DATA_FILE = path.join(__dirname, 'data.json');

// --- Helper Functions ---

// Helper to read data safely
async function readData() {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        // If file doesn't exist, return an empty array
        if (error.code === 'ENOENT') {
            return [];
        }
        throw error;
    }
}

// --- Routes ---

// GET Route: Retrieve all procurement records
app.get('/kgl/procurement', async (req, res) => {
    try {
        const records = await readData();
        res.status(200).json(records);
    } catch (error) {
        console.error('Error reading file:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// POST Route: Add a new procurement record
app.post('/kgl/procurement', async (req, res) => {
    try {
        // 1. Validate incoming data
        const newRecord = req.body;
        if (!newRecord || Object.keys(newRecord).length === 0) {
            return res.status(400).json({ error: 'Bad Request: No data provided' });
        }
        
        // 2. Read existing data
        const currentRecords = await readData();

        // 3. Append new record
        currentRecords.push(newRecord);

        // 4. Write updated list back to file
        await fs.writeFile(DATA_FILE, JSON.stringify(currentRecords, null, 2));

        // 5. Return success response
        res.status(201).json({ message: 'Record added successfully', record: newRecord });

    } catch (error) {
        if (error instanceof SyntaxError && 'body' in error) {
             return res.status(400).json({ error: 'Bad Request: Invalid JSON syntax' });
        }
        console.error('Error processing request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});