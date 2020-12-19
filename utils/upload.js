const mongoose = require('mongoose');
const path = require("path");
const multer = require("multer");
// const fs = require("fs");
const crypto = require('crypto');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');

const mongoURI = require('../config/keys').mongoURI;

// Create mongo connection
const conn = mongoose.createConnection(mongoURI);

conn.once('open', () => {
  // Initialize stream
  let gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

// Create storage engine
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          console.log('errorrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr')
          return reject(err);
        }

        console.log('nooooooooooerrorrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr')
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename,
          bucketName: 'uploads',
        };

        resolve(fileInfo);
      });
    });
  }
});

const upload = multer({ storage });

module.exports = upload;