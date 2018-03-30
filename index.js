const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

const PORT = process.env.PORT || 5000;

app.get('/', (req, res, next) => {
  const filePath = path.join(__dirname + '/public/index.html');
  res.sendFile(filePath)
});

app.post('/get-file-size', upload.single('file'), function (req, res, next) {
  const { originalname, size } = req.file;
  const filePath = req.file.path; // path is already a variable (the module), so not an ES6 declaration

  fs.unlink(filePath, (err) => {
    if (err) {
      console.log(`ERROR! Failed to delete ${filePath}`)
    }
    // console.log(`successfully deleted ${filePath}`);
  });

  // TODO: make a 'formattedSize' field
  // This will use MB || KB to display the file size in an easily readable way

  return res.json({ 'File name': originalname, size });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
