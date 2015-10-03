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
    };

    target.prototype.shouldComponentUpdate = function( nextProps, nextState ) {
        return(JSON.stringify(nextProps) !== JSON.stringify(this.props));
    }

}