'use strict';

const path = require('path');
const local = require('./local');


let config = {

    title: 'Study Koa',
    env: 'production',
    appName: 'Study Koa',
    port: 18080,
    viewDir: path.join(__dirname, '..', 'view'),
    controllerDir: path.join(__dirname, '..', 'controller'),
    commonDir: path.join(__dirname, '..', 'common'),
    logDir: path.join(__dirname, '..', 'log'),
    staticDir: path.join(__dirname, '..', 'static'),
    avatarDir: path.join(__dirname, '..', 'static/src/avatar'),

};


if (process.env.NODE_ENV === 'local' || process.env.NODE_ENV === 'development') {

    Object.assign(config, local);

}


module.exports = config;
