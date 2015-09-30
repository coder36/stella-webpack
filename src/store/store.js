import $ from 'jquery'
import {isRunningOnClient, hashCode} from '../utils'
import { connect } from 'react-redux';
import { createStore } from 'redux';
import Immutable from 'immutable'
import init from './data_feeds';
import {deepClone} from '../utils'


function reduce(_state = init(), _payload ) {

    let [state, payload] = [deepClone(_state), deepClone(_payload)] ;
    let type = payload.type;
    let data = payload.data;

    if(type == 'addTiles')      addTiles(state, data );
    if(type == 'setFullTile')   setFullTile(state, data );
    if(type == 'closeFullTile') closeFullTile(state, data );
    if(type == 'redrawPage')    redrawPage(state, data );

    return state;
}

function addTiles(state, tiles) {
    tiles.forEach( (tile) => {
        let existingTile = state.tiles.find( t => tile.id === t.id );
        if (existingTile) {
            Object.assign(existingTile, tile);
        }
        else {
            state.tiles.push(tile);
        }
    });
}

function setFullTile(state, tile) {
    state.tiles.forEach( (t) =>  t.fullScreen = (t.id === tile.id) );
}

function closeFullTile(state, data) {
    state.tiles.forEach( t => t.fullScreen = false );
}

function redrawPage(state, data) {
    state.redraw_page = state.redraw_page+1;
}

export default createStore(reduce);
