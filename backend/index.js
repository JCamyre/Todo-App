// imports
const express = require("express");
const { appendFile } = require("fs");
const formidable = require('formidable');

const PORT = process.env.PORT || 3001;

const app = express();

// api end points. app.get() is GET, app.post() is POST
app.get("/api", (req, res) => {
    res.json({ message: "yo" });
});

app.post("/api/submit-form", (req, res) => {
    // could use events instead of callbackss
    new formidable.IncomingForm().parse(req)   
        .on('fileBegin', (name, file) => {
            // changing the file path to our uploads folder
            file.path = __dirname + '/uploads' + file.name
        })
        .on('field', (name, field) => {
            console.log('Field', name, field)
        })
        .on('file', (name, file) => {
            console.log('Uploaded file', name, file)
        })
        .on('aborted', () => {
            console.error('Request aborted by the user')
        })
        .on('error', (err) => {
            console.error('Error', err)
            throw err
        })
        .on('end', () => {
            res.end()
        });
    });

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});


