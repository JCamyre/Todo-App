const express = require("express");
const { appendFile } = require("fs");

const PORT = process.env.PORT || 3001;

const app = express();

// api end points
app.get("/api", (req, res) => {
    res.json({ message: "yo" });
});

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});


