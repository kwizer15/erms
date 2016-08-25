'use strict';

const consolidate = require('consolidate');
const mustache = require('mustache');

consolidate.requires.mustache = mustache.configure();

module.exports = consolidate;
