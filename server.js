'use strict';

let Seneca = require('seneca');
let Express = require('express');
let Web = require('seneca-web');

let Routes = [{
    prefix: '/api',
    pin: 'role:api,cmd:*',
    map: {
        home: {GET: true}
    }
}];
let seneca = Seneca();

let config = {
    routes: Routes,
    adapter: require('seneca-web-adapter-express'),
    context: Express()
};

seneca.client()
    .use(Web, config)
    .ready(() => {
        let server = seneca.export('web/context')();
        server.listen('4000', () => {
            console.log('server started on: 4000')
        })
    });

seneca.add({role: 'api', cmd: 'home'}, function (args, done) {
    done(null, {response: "hey"});
});
