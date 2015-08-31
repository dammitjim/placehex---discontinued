var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose');

import Generator from '../lib/generator';

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/:size/:hex/:text', (req, res, next) => {
  let placeholder = new Generator(req.params.size, req.params.hex, req.params.text);
  res.render('placeholder', placeholder);
});

router.get('/:size/:hex', (req, res, next) => {
  let placeholder = new Generator(req.params.size, req.params.hex);
  res.render('index');
});

router.get('/:size', (req, res, next) => {
  let placeholder = new Generator(req.params.size);
  res.render('index');
});
