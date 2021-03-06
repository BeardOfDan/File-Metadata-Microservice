const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const PORT = process.env.PORT || 5000;

app.get('/', (req, res, next) => {
  const filePath = path.join(__dirname + '/public/index.html');
  res.sendFile(filePath);
});

app.post('/get-file-size', upload.single('file'), function (req, res, next) {
  // path is already a variable (the module), so it is renamed
  const { path: filePath, originalname, size } = req.file;

  // Delete the file, it's no longer needed
  fs.unlink(filePath, (err) => {
    if (err) {
      console.log(`ERROR! Failed to delete ${filePath}`)
    }
    // console.log(`successfully deleted ${filePath}`);
  });

  const labels = ['KB', 'MB', 'GB', 'TB'];

  let formattedSize = size;
  let label = 'Bytes';

  for (let i = 0; i < labels.length; i++) {
    if (formattedSize < 1024) {
      break;
    }

    formattedSize /= 1024;
    label = labels[i];
  }

  formattedSize = formattedSize.toFixed(2) + ' ' + label;

  return res.json({ 'File name': originalname, size, formattedSize });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
