var express = require('express'),
router = express.Router(),
mongoose = require('mongoose'),
webshot = require('webshot'),
path = require('path'),
fs = require('fs');

import Generator from '../lib/generator';

module.exports = function (app) {
  app.use('/', router);
};

/**
* Renders the html to an image and passes the filename to the callback
* @param  Generator() generator
* @param  Array       args      - .size .hex .text .output (HTML string)
* @param  Function    callback  - (filename)
* @return void
*/
function generateOutput(generator, args, callback) {
  // Generate filename
  let filename = generator.getFilename();
  // Get output path
  let filepath = generator.getFilepath();
  // node_webshot
  webshot(args.output, filepath, {
    siteType: 'html',
    windowSize: {
      width: generator.width,
      height: generator.height
    }
  }, (err) => {
    callback(filepath);
  });
}

/**
 * Returns a random number between 1 and the limite
 * @param  int limit
 * @return int
 */
function randomNumber(limit = 999) {
  return Math.ceil(Math.random()*limit);
}

/**
 * Returns a random hexidecimal colour code
 * @return string
 */
function randomHex() {
  return Math.floor(Math.random()*16777215).toString(16);
}

/**
 * Debug function for testing that it works
 * @return String
 */
function generateRandomURL() {
  let size = randomNumber() + 'x' + randomNumber();
  let colour = randomHex();
  let text = 'Test';
  return [size, colour, text].join('/');
}

/**
 * Test everything works
 */
router.get('/', (req, res, next) => {
  let args = [];
  args.url = generateRandomURL();
  res.render('index', args);
});

/**
 * Specify size, hexidecimal color and text
 */
router.get('/:size/:hex/:text', (req, res, next) => {
  let args = req.params;
  let generator = new Generator(args.size, args.hex, args.text);
  res.render('placeholder', generator, (err, placeholder) => {
    args.output = placeholder;
    generateOutput(generator, args, (filepath) => {
      var img = fs.readFileSync(filepath);
      res.writeHead(200, {'Content-Type': 'image/gif' });
      res.end(img, 'binary');
    });
  });
});

/**
 * Specify size and hexidecimal colour
 */
router.get('/:size/:hex', (req, res, next) => {
  let args = req.params;
  let generator = new Generator(args.size, args.hex);
  res.render('placeholder', generator, (err, placeholder) => {
    args.output = placeholder;
    generateOutput(generator, args, (filepath) => {
      var img = fs.readFileSync(filepath);
      res.writeHead(200, {'Content-Type': 'image/gif' });
      res.end(img, 'binary');
    });
  });
});

/**
 * Only specify size
 */
router.get('/:size', (req, res, next) => {
  let args = req.params;
  let generator = new Generator(args.size);
  res.render('placeholder', generator, (err, placeholder) => {
    args.output = placeholder;
    generateOutput(generator, args, (filepath) => {
      var img = fs.readFileSync(filepath);
      res.writeHead(200, {'Content-Type': 'image/gif' });
      res.end(img, 'binary');
    });
  });
});
