require('babel-polyfill');
import storage from '../util/storage';
import React from 'react';
import routes from '../common/routes.jsx';
import reducers from '../common/reducers.jsx';
import ReactDOMServer from 'react-dom/server';
import {
    createStore,
    combineReducers,
} from 'redux';
import {
    Provider,
} from 'react-redux';
import {
    match,
    RouterContext,
} from 'react-router';

module.exports = {
    index: function *() {
        const users = yield storage.getUsers();

        const options = {
            routes,
            location: this.request.url,
        };

        const that = this;

        match(options, (error, redirectLocation, renderProps) => {

            if (renderProps) {

                const state = {
                    users,
                    prizes: require('../data/prizes'),
                };

                const store = createStore(combineReducers(reducers), state);
                const html = ReactDOMServer.renderToString(
                    <Provider store={store}>
                        <RouterContext {...renderProps} />
                    </Provider>
                );

                that.render('index', {
                    title: 'React Lottery',
                    html: html,
                    state: state,
                    csrf: this.csrf,
                });

            }

        });
    },

};
