import {
    combineReducers,
} from 'redux';

import {
    ActionConstants,
} from './constants';

import storage from '../static/src/js/storage.js';

function selectedPrizeIndex(state = 0, action) {
    if (action.type === ActionConstants.CHANGE_PRIZE) {
        return action.index;
    }
    return state;
}

function displayUserIndex(state = -1, action) {

    if (action.type === ActionConstants.GLANCE ||
            action.type === ActionConstants.RAFFLE) {

        return action.index;

    }

    return state;

}

function query(users, user) {

    return users.findIndex(function (value) {
        if (user.department === value.department &&
                user.name === value.name &&
                user.phone === value.phone) {
            return true;
        }
        return false;
    });

}

function initUsers(users) {
    if (typeof window !== 'object') {
        return users;
    }
    return users.map((user) => {
        return Object.assign({}, storage.get(user), user);
    });
}


function users(state = [], action) {
    if (action.type === ActionConstants.INIT_USERS) {
        return initUsers(state);
    } else if (action.type === ActionConstants.RAFFLE) {
        return [
            ...state.slice(0, action.index),
            Object.assign({}, action.user),
            ...state.slice(action.index + 1)
        ];
    } else if (action.type === ActionConstants.CLEAR_ALL) {
        return window.__INITIAL_STATE__.users;
    } else if (action.type === ActionConstants.REMOVE_RAFFLED) {
        const index = query(state, action.user);

        return [
            ...state.slice(0, index),
            Object.assign({}, action.user),
            ...state.slice(index + 1)
        ];
    }
    return state;
}

function prizes(state = [], action) {
    return state;
}

const reducers = combineReducers({
    prizes,
    selectedPrizeIndex,
    users,
    displayUserIndex,
});

export default reducers;