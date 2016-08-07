import HapiProvider from './hapi-provider';
import {Configuration} from 'volvox-core'
import bunyan from 'bunyan'

export default (config, logger) => {
    return new HapiProvider(
        config || new Configuration(),
        logger || bunyan.createLogger({ name: "volvox.js" })
    )
};