// imports
const express = require("express");
const fileUpload = require("express-fileupload");
const path = require("path");
const { appendFile } = require("fs");
const formidable = require('formidable');


const PORT = process.env.PORT || 3001;

const app = express();

// enable middleware
app.use(
    fileUpload()
);

// api end points. app.get() is GET, app.post() is POST
app.get("/api", (req, res) => {
    res.json({ message: "yo" });
});

app.post("/api/upload", (req, res) => {

    if (!req.files) {
        return res.status(400).send('No files were uploaded.');
    }

    const profilePicture = req.files.profilePicture;
    const name = req.files.name;
    const bio = req.files.bio;

    // const extensionName = path.extname(file.name); // fetch the file extension
    // const allowedExtension = ['.png','.jpg','.jpeg'];

    // if(!allowedExtension.includes(extensionName)){
    //     return res.status(422).send("Invalid Image");
    // }

    const path = __dirname + `/files/` + name;

    name.mv(path, (err) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.send({ status: 'success', path: path });
    });

    // automatically add folder and save files to them
    // app.use(
    //     fileUpload({
    //         createParentPath: true,
    //     })
    // )

    // app.use(fileUpload({
    //     limits: {
    //         fileSize: 1024 * 1024 // 1 MB
    //     },
    //     abortOnLimit: true
    //  }));


    // could use events instead of callbackss
    // new formidable.IncomingForm().parse(req)   
    //     .on('fileBegin', (name, file) => {
    //         // changing the file path to our uploads folder
    //         file.path = __dirname + '/uploads/' + file.name
    //     })
    //     .on('field', (name, field) => {
    //         console.log('Field', name, field)
    //     })
    //     .on('file', (name, file) => {
    //         console.log('Uploaded file', name, file)
    //     })
    //     .on('aborted', () => {
    //         console.error('Request aborted by the user')
    //     })
    //     .on('error', (err) => {
    //         console.error('Error', err)
    //         throw err
    //     })
    //     .on('end', () => {
    //         res.end()
    //     });
    // // redirect back to homepage, obv don't want user to go to api/submit-form
    // res.redirect(307, 'http://localhost:3000/');
    });

app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});


