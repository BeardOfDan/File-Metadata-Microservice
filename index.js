const express = require('express');
const app = express();
const path = require('path');

const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

const PORT = process.env.PORT || 5000;

app.get('/', (req, res, next) => {
  const filePath = path.join(__dirname + '/public/index.html');
  res.sendFile(filePath)
});

app.post('/get-file-size', upload.single('file'), function (req, res, next) {
  const { originalname, size } = req.file;

  // TODO: use req.filename || req.path to delete the newly saved file
  // This will stop me from running out of space

  // TODO: make a 'formattedSize' field
  // This will use MB || KB to display the file size in an easily readable way

  return res.json({ 'File name': originalname, size });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
