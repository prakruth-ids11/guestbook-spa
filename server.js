const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs'); // to save messages

const app = express();
const PORT = process.env.PORT || 3000;

// parse JSON and URL-encoded data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// serve static files (your HTML, CSS, JS)
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});
// save messages to a JSON file
app.post('/submit', (req, res) => {
    const { name, message } = req.body;
    if (!name || !message) return res.status(400).send('Name or message missing!');

    let data = [];
    if (fs.existsSync('messages.json')) {
        data = JSON.parse(fs.readFileSync('messages.json'));
    }

    data.push({ name, message });
    fs.writeFileSync('messages.json', JSON.stringify(data, null, 2));

    res.send('Success');
});
app.get('/messages', (req, res) => {
    if (fs.existsSync('messages.json')) {
        const data = JSON.parse(fs.readFileSync('messages.json'));
        res.json(data);
    } else {
        res.json([]);
    }
});

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});
app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});
