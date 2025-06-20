const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;
const DATA_FILE = path.join(__dirname, 'entries.json');

app.use(cors());
app.use(bodyParser.json());

// Initialize entries file if doesn't exist
if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([]));
}

app.get('/entries', (req, res) => {
    const data = JSON.parse(fs.readFileSync(DATA_FILE));
    res.json(data);
});

app.post('/sync', (req, res) => {
    const newEntry = req.body;
    const data = JSON.parse(fs.readFileSync(DATA_FILE));
    data.unshift(newEntry);
    fs.writeFileSync(DATA_FILE, JSON.stringify(data.slice(0, 1000), null, 2));
    res.json({ status: 'ok' });
});

app.listen(PORT, () => {
    console.log(`Sync Bridge Server running at http://localhost:${PORT}`);
});
