'use strict';

const path = require('path');

const koa = require('koa');
const config = require('./config/config');


const app = koa();
app.keys = ['study koa'];


const compress = require('koa-compress');
app.use(compress());


const onerror = require('koa-onerror');
onerror(app);


const less = require('koa-less');
app.use(less(path.join(config.staticDir, 'src')));


const staticCache = require('koa-static-cache');
app.use(staticCache(path.join(config.staticDir, 'dist')));
app.use(staticCache(path.join(config.staticDir, 'src'), {
    dynamic: true,
}));


const session = require('koa-generic-session');
app.use(session(app));


const bodyParser = require('koa-bodyparser');
app.use(bodyParser());


const react = require('koa-react-view');
react(app, {
    views: config.viewDir,
});


const register = require('babel-register');
register({
    only: [
        config.viewDir,
        config.commonDir,
        config.staticDir,
    ],
    presets: [
        'es2015',
        'react',
    ],
    extensions: [
        '.jsx',
        '.js',
    ],
});


const csrf = require('koa-csrf');
csrf(app);
app.use(csrf.middleware);


const router = require('koa-router')();

const indexRouter = require('./router/index');
router.use('/', indexRouter.routes());
const userRouter = require('./router/user');
router.use('/user', userRouter.routes());

app.use(router.routes());


app.listen(config.port);
