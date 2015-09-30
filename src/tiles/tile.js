import React from 'react'
import $ from 'jquery'
import store from '../store/store'

export default function tile(target) {

    target.prototype.open = function(e) {
        e.preventDefault();
        store.dispatch({type: "setFullTile", data: this.props.tile});
    };

    target.prototype.render = function() {
        return this.content();
    }
}