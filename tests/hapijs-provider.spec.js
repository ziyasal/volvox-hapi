import chai from "chai";
import sinon from "sinon";

import request from 'request';
import HapiProvider from "../src/hapi-provider";

import hapi from 'hapi';

chai.should();

describe("HapiProvider:", () => {
    let hapiProvider,
        configuration = {
            getPort: function () {
            }
        }
        , logger = {
            info: function (msg) {
            }
        },
        configurationMock, loggerMock;

    beforeEach(() => {

        configurationMock = sinon.mock(configuration);
        loggerMock = sinon.mock(logger);

        hapiProvider = new HapiProvider(configuration, logger);

    });

    describe("#ctor", () => {

        it("should create instance.", ()=> {
            (!!hapiProvider).should.be.equal(true);
        });
    });

    describe("#start", () => {
        it("should start new hapi server and register status handler", async (done)=> {
            await startTest(null, done);
        });


        it("should attach existing hapi server and register status handler", async (done)=> {
            let app = new hapi.Server();
            await startTest(app, done);
        });

        async function startTest(server, done) {
            let port = 3000, statusResponse = 'ok';

            configurationMock.expects("getPort").returns(port).once();
            loggerMock.expects("info").withArgs(`Example app listening on port ${port}!`).once();

            let result = await hapiProvider.start(server, "test-svc", "v1");

            request(`http://localhost:${port}/status`, (error, response, body)=> {

                (!!error).should.be.equal(false);

                body.should.be.equal(statusResponse);

                result.serverInstance.stop(()=> {
                    done();
                });
            });
        }
    });

    afterEach(()=> {
        configurationMock.verify();
        loggerMock.verify();
    })
});