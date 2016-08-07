import {FrameworkProvider} from 'volvox-core'
import hapi from 'hapi';

/**
 * Hapi.js provider for microphone.js Microservice framework
 */
export default class HapiProvider extends FrameworkProvider {

    /**
     * c`tor
     * @param configuration
     * @param logger
     */
    constructor(configuration, logger) {
        super();
        this._configuration = configuration;
        this._logger = logger;
    }

    /**
     *
     * @param server
     * @param serviceName
     * @param version
     * @returns {Promise}
     */
    start(server, serviceName, version) {

        const app = server || new hapi.Server();
        var port = this._configuration.getPort() || 3000;
        let uri = `http://localhost:${port}`;
        app.connection({ port: port, host: 'localhost' });

        return new Promise((resolve, reject) => {

            app.route({
                method: 'GET',
                path: '/status',
                handler: (request, reply) => {
                    reply('ok');
                }
            });

            app.start((err) => {
                if (err) return reject(err);

                this._logger.info(`Example app listening on port ${port}!`);
                resolve({ serverInstance: app, uri: uri });
            });
        })
    }
}
