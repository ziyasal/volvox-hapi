'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _volvoxCore = require('volvox-core');

var _hapi = require('hapi');

var _hapi2 = _interopRequireDefault(_hapi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Hapi.js provider for microphone.js Microservice framework
 */
var HapiProvider = function (_FrameworkProvider) {
    _inherits(HapiProvider, _FrameworkProvider);

    /**
     * c`tor
     * @param configuration
     * @param logger
     */
    function HapiProvider(configuration, logger) {
        _classCallCheck(this, HapiProvider);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(HapiProvider).call(this));

        _this._configuration = configuration;
        _this._logger = logger;
        return _this;
    }

    /**
     *
     * @param server
     * @param serviceName
     * @param version
     * @returns {Promise}
     */


    _createClass(HapiProvider, [{
        key: 'start',
        value: function start(server, serviceName, version) {
            var _this2 = this;

            var app = server || new _hapi2.default.Server();
            var port = this._configuration.getPort() || 3000;
            var uri = 'http://localhost:' + port;
            app.connection({ port: port, host: 'localhost' });

            return new Promise(function (resolve, reject) {

                app.route({
                    method: 'GET',
                    path: '/status',
                    handler: function handler(request, reply) {
                        reply('ok');
                    }
                });

                app.start(function (err) {
                    if (err) return reject(err);

                    _this2._logger.info('Example app listening on port ' + port + '!');
                    resolve({ serverInstance: app, uri: uri });
                });
            });
        }
    }]);

    return HapiProvider;
}(_volvoxCore.FrameworkProvider);

exports.default = HapiProvider;