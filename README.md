# microphone-hapi
![](https://avatars3.githubusercontent.com/u/16361502?v=3&s=200)  ![](http://svgporn.com/logos/hapi.svg)  

Hapi.js provider for volvox.js Microservice framework

[![Build Status](https://travis-ci.org/volvoxjs/volvox-hapi.svg?branch=master)](https://travis-ci.org/volvoxjs/volvox-hapi) [![Coverage Status](https://coveralls.io/repos/github/volvoxjs/volvox-hapi/badge.svg?branch=master)](https://coveralls.io/github/volvoxjs/volvox-hapi?branch=master)

Preview
=================

**Sample code using `Consul`**

```js
import Volvox from 'volvox-core';
import vconsul from 'volvox-consul';
import vhapi from 'volvox-hapi';

import hapi from 'hapi'

async function main() {
    let server = new hapi.Server();

    server.route({method: 'GET', path: '/customers', handler: (req, reply) {
        reply({
            customerName: "Test customer",
            customerId: 666
        });
    }});

    let volvox = new Volvox(vconsul(), vhapi());
    await volvox.bootstrap(server, "customers", "v1");
}

main();
```
