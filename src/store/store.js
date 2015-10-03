import $ from 'jquery'
import { connect } from 'react-redux';
import { createStore } from 'redux';
import Immutable from 'immutable'
import {deepClone} from '../utils'

function reduce(state = init(), payload ) {
    switch(payload.type ) {

        case 'addTiles':
            return addTiles(state, payload.data );
        case 'setFullTile':
            return setFullTile(state, payload.data );
        case 'closeFullTile':
            return closeFullTile(state, payload.data );
        case 'redrawPage':
            return redrawPage(state, payload.data );
        default:
            return state;
    }
}

function addTiles(state, tiles) {
    let _state = deepClone(state);
    tiles.forEach( (tile) => {
        let existingTile = _state.tiles.find( t => tile.id === t.id );
        if (existingTile) {
            Object.assign(existingTile, tile);
        }
        else {
            _state.tiles.push(tile);
        }
    });
    return _state;
}

function setFullTile(state, tile) {
    let _state = deepClone(state);
    _state.tiles.forEach( (t) =>  t.fullScreen = (t.id === tile.id) );
    return _state;
}

function closeFullTile(state, data) {
    let _state = deepClone(state);
    _state.tiles.forEach( t => t.fullScreen = false );
    return _state;
}

function redrawPage(state, data) {
    let _state = deepClone(state);
    _state.redraw_page = _state.redraw_page+1;
    return _state;
}


function init() {
    let tiles = [];

    tiles.push(
        {
            id: 'welcome',
            type: 'info',
            title: 'Welcome Back',
            content: '',
            fullScreen: false
        },
        {
            id: 'your_bill',
            type: 'your_bill',
            fullScreen: false
        }
    );

    for(let i=1; i<= 4; i++ ) {
        tiles.push(
            {
                id: `s_${i}`,
                type: "series",
                channel: "skyOne",
                size: "medium",
                name: "",
                fullScreen: false
            }
        )
    }

    for(let i=1; i<= 10; i++ ) {
        tiles.push(
            {
                id: `n_${i}`,
                type: "news",
                title: "",
                fullScreen: false
            }
        )
    }

    return { tiles, redraw_page: 0 };
}


export default createStore(reduce);
