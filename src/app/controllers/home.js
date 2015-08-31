var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  webshot = require('webshot'),
  path = require('path');

import Generator from '../lib/generator';

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', (req, res, next) => {
  res.render('index');
});

/**
 * Renders the html to an image and passes the filename to the callback
 * @param  Generator() generator
 * @param  Array       args      - .size .hex .text .output (HTML string)
 * @param  Function    callback  - (filename)
 * @return void
 */
function generateOutput(generator, args, callback) {
    // Generate filename
    let filename = args.size + '_' + args.hex + '_' + Date.now();
    // Get output path
    let filepath = path.normalize(__dirname + '/../../..') + '/public/img/output/' + filename + '.png';
    // node_webshot
    webshot(args.output, filepath, {
      siteType: 'html',
      windowSize: {
        width: generator.width,
        height: generator.height
      }
     }, (err) => {
       callback(filename);
    });
}

router.get('/:size/:hex/:text', (req, res, next) => {
  let args = req.params;
  let generator = new Generator(args.size, args.hex, args.text);
  res.render('placeholder', generator, (err, placeholder) => {
    args.output = placeholder;
    generateOutput(generator, args, (filename) => {
       res.render('output', { filename: filename });
    });
  });
});

router.get('/:size/:hex', (req, res, next) => {
  let args = req.params;
  let generator = new Generator(args.size, args.hex);
  res.render('placeholder', generator, (err, placeholder) => {
    args.output = placeholder;
    generateOutput(generator, args, (filename) => {
       res.render('output', { filename: filename });
    });
  });
});

router.get('/:size', (req, res, next) => {
  let args = req.params;
  let generator = new Generator(args.size);
  res.render('placeholder', generator, (err, placeholder) => {
    args.output = placeholder;
    generateOutput(generator, args, (filename) => {
       res.render('output', { filename: filename });
    });
  });
});
