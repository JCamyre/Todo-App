const express = require("express");
const { appendFile } = require("fs");

const PORT = process.env.PORT || 3001;

const app = express();

// api end points
api.get("/api", (req, res) => {
    res.json({ message: "yo" });
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});


