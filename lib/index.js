'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _hapiProvider = require('./hapi-provider');

var _hapiProvider2 = _interopRequireDefault(_hapiProvider);

var _volvoxCore = require('volvox-core');

var _bunyan = require('bunyan');

var _bunyan2 = _interopRequireDefault(_bunyan);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (config, logger) {
    return new _hapiProvider2.default(config || new _volvoxCore.Configuration(), logger || _bunyan2.default.createLogger({ name: "volvox.js" }));
};